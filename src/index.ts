import { Client, Collection } from "discord.js";
import sqlz from "./db/sqlz";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "path/posix";
dotenv.config();

export interface CommandCollectionClient extends Client {
    commands?: Collection<any, any>;
}

console.log("Bot is starting");

const client: CommandCollectionClient = new Client({
    intents: []
});

client.commands = new Collection();

console.log("Loading commands");
for (const file of fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".ts"))) {
    const cmd = require(`./commands/${file}`);
    console.log(cmd.default.data.name);
    client.commands.set(cmd.default.data.name, cmd.default);
}
console.log("Finished loading commands");

console.log("Loading events");
const listenerPath = path.join(__dirname, "listeners");
for (const listener of fs
    .readdirSync(listenerPath)
    .filter((file) => file.endsWith(".ts"))) {
    const filepath = path.join(listenerPath, listener);
    const { default: event } = require(filepath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
console.log("Finished loading events");

(async () => {
    client.login(process.env.BOT_TOKEN);
    console.log("Logged in to discord");

    await sqlz.authenticate();
    console.log("Connected to db");

    await sqlz.sync({ force: true });
})().catch((err) => {
    if (err instanceof Error) {
        console.log(err.message);
    } else {
        console.log(err);
    }
});
