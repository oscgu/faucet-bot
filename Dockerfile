FROM node:latest

WORKDIR /app

COPY [ "package.json", "yarn.lock", "./"]

RUN yarn install

COPY src/ .

CMD [ "yarn", "ts-node", "index.ts"]
