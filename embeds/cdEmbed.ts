import { EmbedBuilder } from "@discordjs/builders";
import { capitalize } from "../util/capitalize";

const createCdEmbed = (
    chain: string,
    token: string,
    amount: string,
    cd: string
) =>
    new EmbedBuilder()
        .setColor([255, 69, 0])
        .setThumbnail(
            "https://avatars.githubusercontent.com/u/95990630?s=200&v=4"
        )
        .setTitle(`Testnet fund request ⌛`)
        .addFields(
            { name: `⛓️ ${capitalize(chain)}`, value: `\u200b`, inline: true },
            { name: `\u200b`, value: `\u200b`, inline: true },
            { name: `🪙 ${capitalize(token)}`, value: `\u200b`, inline: true },
            { name: `🏷️ Amount:`, value: `\`${amount}\`` },
            { name: `⌛ Cooldown:`, value: `\`${cd}h\`` }
        )
        .setTimestamp();

export default createCdEmbed;
