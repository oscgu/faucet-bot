import { Token, faucets } from "../config";

export const validPair = (chain: string, token: string): boolean => {
  const pair: Token = faucets[chain].tokens[token];

  return !(pair == undefined);
};