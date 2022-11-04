# faucet-bot

## Getting started

run `yarn` to build

Create a `.env` file with the following lines:

```
POSTGRES_HOST=
POSTGRES_USERNAME=
POSTGRES_PASSWORD=
POSTGRES_DB=
PRIVATE_KEY=
ALCHEMY_API_KEY=
BOT_TOKEN=
BOT_ID=
GUILD_ID=
ADDRESS=
```

Register the slash commands with: `yarn ts-node registerCommands.ts`

## Running the bot

`yarn ts-node index.ts`

The bot currently dropes and creates tables again after every restart (can be disabled in index.ts@21 by setting force to false)

## Commands

`/faucet <chain> <token>`

## Replies

![txEmbed](https://user-images.githubusercontent.com/94227101/200073344-f98452d2-8536-4ba8-926b-1b8a65d5867f.png)

![cdEmbed](https://user-images.githubusercontent.com/94227101/200073867-2b002175-c1e4-41e2-bc8b-fbba02867314.png)
