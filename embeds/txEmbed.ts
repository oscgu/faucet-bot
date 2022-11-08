import { EmbedBuilder, RGBTuple } from "@discordjs/builders";
import { ColorResolvable } from "discord.js";
import { col } from "sequelize";
import { faucets } from "../config";
import { capitalize } from "../util/capitalize";

const createTxEmbed = (chain: string, token: string, amount: string, tx: string, status: string, color: RGBTuple) =>
  new EmbedBuilder()
    .setThumbnail("https://avatars.githubusercontent.com/u/95990630?s=200&v=4")
    .setColor(color)
    .setTitle(`Testnet fund request ⌛`)
    .addFields(
      { name: `⛓️ ${capitalize(chain)}`, value: `\u200b`, inline: true },
      { name: `\u200b`, value: `\u200b`, inline: true },
      { name: `🪙 ${capitalize(token)}`, value: `\u200b`, inline: true },
      { name: `🏷️ Amount:`, value: `\`${amount}\`` },
      { name: `⚙️ Tx:`, value: `${getTransactionLink(chain, tx)} ${status}` }
    )
    .setTimestamp();

export default createTxEmbed;

const getTransactionLink = (chain: string, tx: string): string => {
    return `[${tx}](${faucets[chain].explorer}${tx})`;
}
