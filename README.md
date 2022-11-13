# faucet-bot

A small bot which you can use for your discord to send out testnet funds.  
You can set a time restriction for each token in `src/config.ts`.  

Currently only **chain native** and **erc20** tokens are supported.  

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

![loading](https://user-images.githubusercontent.com/94227101/201547166-84810978-3750-4835-8610-189155a5cb91.png)

Finished Transaction:

![finished](https://user-images.githubusercontent.com/94227101/201547171-423fa0cd-5d8e-42e2-a0d1-4faa0a3a8e14.png)

Cooldown:

![cd](https://user-images.githubusercontent.com/94227101/201547212-1497756e-cd25-4bdd-bce8-5c95fcb2552d.png)

Out of funds:

![oof](https://user-images.githubusercontent.com/94227101/201547217-28f03424-4960-496c-b477-cc9cf17bdd3c.png)

Unsupported Token:

![ut](https://user-images.githubusercontent.com/94227101/201547219-01c479d2-7708-4ce7-b284-a455e5400012.png)

Error:

![err](https://user-images.githubusercontent.com/94227101/201547225-2511e90a-c432-4b3b-b6bb-49597b47b698.png)
