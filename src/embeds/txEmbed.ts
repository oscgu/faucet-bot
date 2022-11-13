import { EmbedBuilder, RGBTuple } from "@discordjs/builders";
import { faucets } from "../config";
import { capitalize } from "../util/capitalize";

const createTxEmbed = (
    chain: string,
    token: string,
    amount: string,
    tx: string,
    status: string,
    color: RGBTuple
) =>
    new EmbedBuilder()
        .setColor(color)
        .setTitle(`Testnet fund request 🫡`)
        .addFields(
            { name: `⛓️ ${capitalize(chain)}`, value: `\u200b`, inline: true },
            {
                name: `🪙 \`${amount}\` ${capitalize(token)}`,
                value: `\u200b`,
                inline: true
            },
            { name: `\u200b`, value: `\u200b`, inline: true },
            {
                name: `⚙️ Tx:`,
                value: `${getTransactionLink(chain, tx)} ${status}`
            }
        )
        .setTimestamp();

export default createTxEmbed;

const getTransactionLink = (chain: string, tx: string): string => {
    return `[${tx}](${faucets[chain].explorer}${tx})`;
};
