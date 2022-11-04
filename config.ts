export const chainlinkAddress = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";

export const tokenPairs = new Map<string, string[]>([
  ["goerli", ["eth", "link"]],
  ["mumbai", ["matic"]],
  ["alfajores", ["celo"]],
]);

export const chainIds = new Map<string, number>([
  ["goerli", 5],
  ["mumbai", 80001],
  ["alfajores", 42220],
]);

export const baseTokenAmount = new Map<string, string>([
  ["goerli_eth", "0.01"],
  ["goerli_link", "5"],
  ["mumbai_matic", "1"],
  ["alfajores_celo","5"],
]);

export const baseTokenCooldownHours = new Map<string, number>([
  ["goerli_eth", 1],
  ["goerli_link", 2],
  ["mumbai_matic", 5],
  ["alfajores_celo", 8],
]);
