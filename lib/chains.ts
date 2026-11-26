import { http, type Transport, fallback } from "viem";
import { mainnet, base, optimism, arbitrum, baseSepolia } from "viem/chains";

export const chains = [mainnet, base, optimism, arbitrum, baseSepolia] as const;
export type SupportedChains = readonly (typeof chains)[number][];
export type SupportedChainId = (typeof chains)[number]["id"];

export const transports: Record<SupportedChainId, Transport> = {
  [mainnet.id]: http(),
  [base.id]: http(),
  [optimism.id]: http(),
  [arbitrum.id]: http(),
  [baseSepolia.id]: fallback([
    http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
    http(),
  ]),
};
