import { EmbedBuilder } from "discord.js";

export const oofEmbed = (chain: string, token: string) =>
    new EmbedBuilder()
        .setTitle("Testnet fund request ⛔")
        .setColor("Red")
        .setDescription(
            `We are out of \`${token}\` on \`${chain}\`. Try again at a later time! Sorry :(`
        )
        .setTimestamp();
