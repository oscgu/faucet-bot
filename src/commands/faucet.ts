import { SlashCommandBuilder } from "discord.js";
import { DateTime, Duration } from "luxon";
import { upsertLastRequestDate } from "../db/operations";
import dotenv from "dotenv";
import createTxEmbed from "../embeds/txEmbed";
import createCdEmbed from "../embeds/cdEmbed";
import { getAddressOfUser } from "../backend/getAddressOfUser";
import { sendFunds } from "../ether/sendFunds";
import { validPair } from "../util/validPair";
import { milliSecondsTillNextRequest } from "../util/milliSecondsTillNextRequest";
import { faucets, Token } from "../config";
import { hasEnoughBalance } from "../util/hasEnougBalance";
import { oofEmbed } from "../embeds/oofEmbed";
import { errEmbed } from "../embeds/errEmbed";
import { utEmbed } from "../embeds/utEmbed";
dotenv.config();

export default {
    data: new SlashCommandBuilder()
        .setName("faucet")
        .setDescription("Request testnet funds")
        .addStringOption((option) =>
            option
                .setName("chain")
                .setDescription("Chain you request funds for")
                .setRequired(true)
                .addChoices(
                    { name: "Goerli", value: "goerli" },
                    { name: "Mumbai", value: "mumbai" },
                    { name: "Alfajores", value: "alfajores" }
                )
        )
        .addStringOption((option) =>
            option
                .setName("token")
                .setDescription("Token you want to receive")
                .setRequired(true)
                .addChoices(
                    { name: "ETH", value: "eth" },
                    { name: "LINK", value: "link" },
                    { name: "MATIC", value: "matic" },
                    { name: "CELO", value: "celo" }
                )
        ),
    async execute(interaction: any) {
        const chain = interaction.options.getString("chain") as string;
        const token = interaction.options.getString("token") as string;

        if (!validPair(chain, token)) {
            await interaction.reply({ embeds: [utEmbed(chain, token)] });
            return;
        }

        const faucetToken: Token = faucets[chain].tokens[token];

        if (!(await hasEnoughBalance(chain, token, faucetToken.amount))) {
            await interaction.reply({ embeds: [oofEmbed(chain, token)] });
            return;
        }

        const column = chain + "_" + token;
        const nextRequest = await milliSecondsTillNextRequest(
            column,
            interaction.user.id,
            faucetToken.coolDown
        );

        if (nextRequest < 0) {
            upsertLastRequestDate(
                column,
                interaction.user.id,
                DateTime.utc().toMillis()
            );

            const address = await getAddressOfUser(interaction.user.id);
            const { tx, provider } = await sendFunds(address, chain, token);
            if (!tx || !tx.hash) {
                await interaction.reply({ embeds: [errEmbed(chain, token)] });
                return;
            }

            const transaction = await provider?.getTransaction(tx.hash);
            const txEmbed = createTxEmbed(
                chain,
                token,
                faucetToken.amount,
                tx.hash,
                "🔄",
                [6, 138, 214]
            );
            await interaction.reply({ embeds: [txEmbed] });

            await transaction?.wait().then((res) => {
                const status = res.status;

                const editedTxEmbed = createTxEmbed(
                    chain,
                    token,
                    faucetToken.amount,
                    res.transactionHash,
                    status == 1 ? "✅" : "❌",
                    status == 1 ? [6, 214, 13] : [196, 30, 58]
                );
                interaction.editReply({ embeds: [editedTxEmbed] });
            });
        } else {
            const cdEmbed = createCdEmbed(
                chain,
                token,
                faucetToken.amount,
                Duration.fromMillis(nextRequest).toFormat("hh:mm")
            );
            await interaction.reply({ embeds: [cdEmbed] });
        }
    }
};
