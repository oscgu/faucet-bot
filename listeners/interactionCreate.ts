import { CommandInteraction } from "discord.js";
import { CommandCollectionClient } from "..";

export default {
    name: "interactionCreate",
    once: false,
    async execute(interaction: CommandInteraction) {
        try {
            if (!interaction.isCommand()) return;

            const command = (
                interaction.client as CommandCollectionClient
            ).commands?.get(interaction.commandName);
            if (!command) return;

            await command.execute(interaction);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.stack);
            } else {
                console.log(error);
            }

            await interaction.reply(
                "There was an error executing the command :("
            );
        }
    }
};
