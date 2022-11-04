import { SlashCommandBuilder } from "discord.js";
import { ethers } from "ethers";
import {
  baseTokenAmount,
  baseTokenCooldownHours,
  chainlinkAddress,
  tokenPairs,
} from "../config";
import { getWallet } from "../ether/getWallet";
import { DateTime, Duration } from "luxon";
import { upsertLastRequestDate, getLastRequestDate } from "../db/operations";
import { chainlinkAbi } from "../abis/chainlink";
import { parseEther } from "ethers/lib/utils";
import dotenv from "dotenv";
import createTxEmbed from "../embeds/txEmbed";
import createCdEmbed from "../embeds/cdEmbed";
dotenv.config();

export default {
  data: new SlashCommandBuilder()
    .setName("faucet")
    .setDescription("Request testnet funds")
    .addStringOption((option) =>
      option
        .setName("chain")
        .setDescription("Chain you request funds for")
        .setRequired(true)
        .addChoices(
          { name: "Goerli", value: "goerli" },
          { name: "Mumbai", value: "mumbai" },
          { name: "Alfajores", value: "alfajores" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("token")
        .setDescription("Token you want to receive")
        .setRequired(true)
        .addChoices(
          { name: "ETH", value: "eth" },
          { name: "LINK", value: "link" },
          { name: "MATIC", value: "matic" },
          { name: "CELO", value: "celo" }
        )
    ),
  async execute(interaction: any): Promise<void> {
    const chain = interaction.options.getString("chain");
    const token = interaction.options.getString("token");

    const pair = chain + "_" + token;

    if (!validPair(chain, token)) {
      await interaction.reply(
        `We don't support ${token} on ${chain} at the moment! :(`
      );
      return;
    }
    const address = await getAddressFromUser(`${interaction.user.id}`);

    const nextRequest = await milliSecondsTillNextRequest(
      pair,
      interaction.user.id
    );

    const tokenAmount = getTokenAmount(chain, token)!;

    if (nextRequest < 0) {
      upsertLastRequestDate(
        pair,
        interaction.user.id,
        DateTime.utc().toMillis()
      );
      const { tx, value } = await sendFunds(address, chain, token, tokenAmount);
      const txEmbed = createTxEmbed(chain, token, value, tx);

      interaction.reply({ embeds: [txEmbed] });
    } else {
      const cdEmbed = createCdEmbed(
        chain,
        token,
        tokenAmount,
        Duration.fromMillis(nextRequest).toFormat("hh:mm")
      );
      interaction.reply({ embeds: [cdEmbed] });
    }
  },
};

const milliSecondsTillNextRequest = async (
  column: string,
  userId: string
): Promise<number> => {
  const lastReqDateUnix = await getLastRequestDate(column, userId);
  const nowUnix = DateTime.utc().toMillis();

  return Duration.fromMillis(lastReqDateUnix)
    .plus(Duration.fromObject({ hour: baseTokenCooldownHours.get(column) }))
    .minus(Duration.fromMillis(nowUnix))
    .toMillis();
};

const getTokenAmount = (chain: string, token: string) => {
  return baseTokenAmount.get(`${chain + "_" + token}`);
};

const sendFunds = async (
  address: string,
  chain: string,
  token: string,
  tokenAmount: string
): Promise<{ tx: string; value: string }> => {
  const wallet = getWallet(chain);
  const value = parseEther(tokenAmount);

  try {
    if (chain == "goerli" && token == "link") {
      const chainlinkContract = new ethers.Contract(
        chainlinkAddress,
        chainlinkAbi,
        wallet
      );
      const tx = await chainlinkContract.transfer(address, value);
      return { tx: tx.hash, value: tokenAmount! };
    }

    const tx = await wallet.sendTransaction({
      to: address,
      value,
    });

    return { tx: tx.hash, value: tokenAmount! };
  } catch (error) {
      console.log(error);
    return { tx: "Error", value: "0" };
  }
};

const getAddressFromUser = async (userTag: string): Promise<string> => {
  return Promise.resolve(process.env.ADDRESS!);
};

const validPair = (chain: string, token: string): boolean => {
  const pairs = tokenPairs.get(chain)!;
  return pairs.includes(token);
};
