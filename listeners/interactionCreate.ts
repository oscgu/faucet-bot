import { Client, Interaction } from "discord.js";
import faucet from "../commands/faucet";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });

    const handleSlashCommand = async (
        client: Client,
        interaction: any
    ): Promise<void> => {
        faucet.execute(interaction);
    };
};
