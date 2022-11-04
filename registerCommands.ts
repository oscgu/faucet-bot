import { REST } from "@discordjs/rest";
import { Routes } from 'discord-api-types/v9';
import faucet from "./commands/faucet";
import dotenv from "dotenv";
dotenv.config();

const commands: any = [];
commands.push(faucet.data);

const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN!);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(process.env.BOT_ID!, process.env.GUILD_ID!),
			{ body: commands },
		);
        console.log("done")
	} catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error)
                }
	}
})();