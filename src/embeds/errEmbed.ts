import { EmbedBuilder } from "discord.js";

export const errEmbed = (chain: string, token: string) =>
    new EmbedBuilder()
        .setTitle("Testnet fund request 💥")
        .setColor("Red")
        .setDescription(
            `An error occured while creating a transaction for: ${chain} ${token}`
        )
        .setTimestamp();
