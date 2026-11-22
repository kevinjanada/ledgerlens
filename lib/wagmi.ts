import { createConfig, http, fallback } from "wagmi"
import { mainnet, base, optimism, arbitrum, baseSepolia } from "wagmi/chains"

export const config = createConfig({
  chains: [mainnet, base, optimism, arbitrum, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [baseSepolia.id]: fallback([
      http(process.env.NEXT_PUBLIC_BASE_SEPOLIA_RPC_URL),
      http(),
    ]),
  }
})
