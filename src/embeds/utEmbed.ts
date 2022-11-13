import { EmbedBuilder } from "discord.js";

export const utEmbed = (chain: string, token: string) =>
    new EmbedBuilder()
        .setTitle("Testnet fund request 😅")
        .setColor("Yellow")
        .setDescription(
            `We currently don't supply \`${token}\` on \`${chain}\``
        )
        .setTimestamp();
