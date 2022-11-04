import { Client } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";
import sqlz from "./db/sqlz";
import dotenv from "dotenv";

dotenv.config();

console.log("Bot is starting");

const client = new Client({
    intents: [
    ]
});

client.login(process.env.BOT_TOKEN);
console.log("Logged in");

(async () => {
    await sqlz.authenticate();
    await sqlz.sync({ force: true });
})()

ready(client);
interactionCreate(client);
