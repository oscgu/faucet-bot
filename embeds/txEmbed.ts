import { EmbedBuilder } from "@discordjs/builders";

const createTxEmbed = (chain: string, token: string, amount: string, tx: string) =>
  new EmbedBuilder()
    .setColor([46, 139, 192])
    .setTitle(`Testnet fund request ⌛`)
    .addFields(
      { name: `⛓️ Chain:`, value: `${chain}` },
      { name: `🪙 Token:`, value: `${token}` },
      { name: `🏷️ Amount:`, value: `\`${amount}\`` },
      { name: `⚙️ Tx:`, value: `${getTransactionApi(chain, tx)}` }
    )
    .setTimestamp();

export default createTxEmbed;

const getTransactionApi = (chain: string, tx: string): string => {
    let api;
    switch (chain) {
        case "goerli":
            api = "https://goerli.etherscan.io/tx/";
            break;
        case "mumbai":
            api = "https://mumbai.polygonscan.com/tx/";
            break;
        case "alfajores":
            api = "https://alfajores.celoscan.io/tx/"
            break;
    }

    return `[${tx}](${api}${tx})`;
}