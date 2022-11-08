import { ActivityType, Client, PresenceUpdateStatus } from "discord.js";

export default {
    name: "ready",
    once: true,
    async execute(client: Client) {
        if (!client.user || !client.application) {
            return;
        }

        client.user.setActivity("earn web3", { type: ActivityType.Competing });
        client.user.setStatus(PresenceUpdateStatus.Idle);

        console.log(`${client.user.username} is online`);
    }
};
