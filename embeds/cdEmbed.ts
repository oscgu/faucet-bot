import { EmbedBuilder } from "@discordjs/builders";

const createCdEmbed = (chain: string, token: string, amount: string, cd: string) =>
  new EmbedBuilder()
    .setColor([255,69,0])
    .setTitle(`Testnet fund request ⌛`)
    .addFields(
      { name: `⛓️ Chain:`, value: `${chain}` },
      { name: `🪙 Token:`, value: `${token}` },
      { name: `🏷️ Amount:`, value: `\`${amount}\`` },
      { name: `⌛ Cooldown:`, value: `\`${cd}h\`` }
    )
    .setTimestamp()

export default createCdEmbed;