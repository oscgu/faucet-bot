import { Duration } from "luxon";

export const faucets: FaucetMapping = {
    goerli: {
        tokens: {
            link: {
                chainNative: false,
                contractAddress: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB",
                amount: "0.1",
                coolDown: Duration.fromObject({ minutes: 60 })
            },
            eth: {
                chainNative: true,
                amount: "0.001",
                coolDown: Duration.fromObject({ minutes: 60 })
            }
        },
        chainId: 5,
        explorer: "https://goerli.etherscan.io/tx/"
    },
    mumbai: {
        tokens: {
            matic: {
                chainNative: true,
                amount: "0.1",
                coolDown: Duration.fromObject({ minutes: 60 })
            }
        },
        chainId: 80001,
        explorer: "https://mumbai.polygonscan.com/tx/"
    },
    alfajores: {
        tokens: {
            celo: {
                chainNative: true,
                amount: "0.001",
                coolDown: Duration.fromObject({ minutes: 60 })
            }
        },
        chainId: 42220,
        explorer: "https://alfajores.celoscan.io/tx/"
    }
};

export type FaucetMapping = {
    [name: string]: Faucet;
};

export type Faucet = {
    tokens: TokenMapping;
    chainId: number;
    explorer: string;
};

export type TokenMapping = {
    [name: string]: Token;
};

export type Token = {
    chainNative: boolean;
    contractAddress?: string;
    amount: string;
    coolDown: Duration;
};
