import { CeloProvider, CeloWallet } from "@celo-tools/celo-ethers-wrapper"
import dotenv from "dotenv"
dotenv.config();

export const getCeloWallet = async () => {
    const provider = new CeloProvider('https://alfajores-forno.celo-testnet.org');
    await provider.ready;
    return new CeloWallet(process.env.PRIVATE_KEY!, provider);
}