import { SlashCommandBuilder } from "discord.js";
import {
  faucets,
  Token,
} from "../config";
import { DateTime, Duration } from "luxon";
import { upsertLastRequestDate, getLastRequestDate } from "../db/operations";
import dotenv from "dotenv";
import createTxEmbed from "../embeds/txEmbed";
import createCdEmbed from "../embeds/cdEmbed";
import { getAddressOfUser } from "../api/getAddressOfUser";
import { sendFunds } from "../ether/sendFunds";
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
  async execute(interaction: any): Promise<void> {
    const chain = interaction.options.getString("chain") as string;
    const token = interaction.options.getString("token") as string;

    const column = chain + "_" + token;

    if (!validPair(chain, token)) {
      await interaction.reply(
        `We don't supply ${token} on ${chain} at the moment! :(`
      );
      return;
    }
    const address = await getAddressOfUser(`${interaction.user.id}`);
    const faucetToken: Token = faucets[chain].tokens[token];
    const nextRequest = await milliSecondsTillNextRequest(column, interaction.user.id, faucetToken.coolDown);

    if (nextRequest < 0) {
      upsertLastRequestDate(
        column,
        interaction.user.id,
        DateTime.utc().toMillis()
      );

      const { tx, provider } = await sendFunds(address, chain, token);
      if (!tx || !tx.hash) {
        await interaction.reply("An error occured :(");
        return;
      }

      const transaction = await provider?.getTransaction(tx.hash);
      const txEmbed = createTxEmbed(chain, token, faucetToken.amount, tx.hash, "🔄");
      await interaction.reply({ embeds: [txEmbed] });

      await transaction?.wait().then(res => {
        const status = res.status;

        const editedTxEmbed = createTxEmbed(chain, token, faucetToken.amount, res.transactionHash, status == 1 ? "✅" : "❌");
        interaction.editReply({ embeds: [editedTxEmbed] })
      }
      );

    } else {
      const cdEmbed = createCdEmbed(
        chain,
        token,
        faucetToken.amount,
        Duration.fromMillis(nextRequest).toFormat("hh:mm")
      );
      await interaction.reply({ embeds: [cdEmbed] });
    }
  },
};

const milliSecondsTillNextRequest = async (
  column: string,
  userId: string,
  cooldown: Duration
): Promise<number> => {
  const lastReqDateUnix = await getLastRequestDate(column, userId);
  const nowUnix = DateTime.utc().toMillis();

  return Duration.fromMillis(lastReqDateUnix)
    .plus(cooldown)
    .minus(Duration.fromMillis(nowUnix))
    .toMillis();
};

const validPair = (chain: string, token: string): boolean => {
  const pair: Token = faucets[chain].tokens[token];

  return !(pair == undefined);
};
