import { createConfig, http } from "wagmi"
import { mainnet, base, optimism, arbitrum, baseSepolia } from "wagmi/chains"

export const config = createConfig({
  chains: [mainnet, base, optimism, arbitrum, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [baseSepolia.id]: http(),
  }
})
