FROM node:latest

WORKDIR /app

COPY [ "package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

USER docker

CMD [ "yarn", "ts-node", "index.ts"]
