import { EmbedBuilder } from "@discordjs/builders";
import { faucets } from "../config";

const createTxEmbed = (chain: string, token: string, amount: string, tx: string, status: string) =>
  new EmbedBuilder()
    .setThumbnail("https://avatars.githubusercontent.com/u/95990630?s=200&v=4")
    .setColor([46, 139, 192])
    .setTitle(`Testnet fund request ⌛`)
    .addFields(
      { name: `⛓️ Chain:`, value: `${chain}` },
      { name: `🪙 Token:`, value: `${token}` },
      { name: `🏷️ Amount:`, value: `\`${amount}\`` },
        { name: `⚙️ Tx:`, value: `${getTransactionLink(chain, tx)} ${status}` }
    )
    .setTimestamp();

export default createTxEmbed;

const getTransactionLink = (chain: string, tx: string): string => {
    return `[${tx}](${faucets[chain].explorer}${tx})`;
}
