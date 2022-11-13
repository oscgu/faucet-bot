# faucet-bot

A small bot which you can use for your discord to send out testnet funds.  
You can set a time restriction for each token.  

Currently only chain native and erc20 tokens are supported.  

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

The receiver address is currently hardcoded, but you can plug this into your existing backend by editing  
`backend/getAddresssOfUser.ts`. It passes the discord user id to it.

Register the slash commands with: `yarn ts-node registerCommands.ts`

## Running the bot

With configured-db (requires docker(-compose) and `.env` file):

`docker-compose up`

The bot currently drops and creates tables again after every restart (can be disabled in index.ts@21 by setting force to false)

## Commands

`/faucet <chain> <token>`

## Replies

Pending Transaction:

![followup](https://user-images.githubusercontent.com/94227101/200392158-10be9a55-8de3-4fbd-92e3-d5d314229a08.png)

Finished Transaction:

![followup2](https://user-images.githubusercontent.com/94227101/200392207-081b1ae7-d6eb-420b-a705-92772aa29dc3.png)

Cooldown:

![cdEmbed](https://user-images.githubusercontent.com/94227101/200073867-2b002175-c1e4-41e2-bc8b-fbba02867314.png)
