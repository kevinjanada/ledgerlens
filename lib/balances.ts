import { Address, createClient } from "viem";
import { baseSepolia } from "viem/chains";
import { chains, SupportedChainId, SupportedChains, transports } from "./chains";
import { getBalance } from "viem/actions";

const BALANCE_CHAINS = process.env.NODE_ENV === "production"
  ? chains.filter(c => c.id !== baseSepolia.id)
  : chains;
const clients = BALANCE_CHAINS.map(chain => createClient({ chain, transport: transports[chain.id] }))

export type ChainBalance =
  | { chainId: SupportedChainId; chainName: string; status: "ok"; value: bigint; decimals: number; symbol: string }
  | { chainId: SupportedChainId; chainName: string; status: "error"; message: string }

export function toChainBalances(cs: SupportedChains, settled: PromiseSettledResult<bigint>[]): ChainBalance[] {
  const chainBalances: ChainBalance[] = [];
  for (let i = 0; i < settled.length; i++) {
    const result = settled[i];
    if (result.status === "fulfilled") {
      chainBalances.push({
        chainId: cs[i].id,
        chainName: cs[i].name,
        status: "ok",
        value: result.value,
        decimals: cs[i].nativeCurrency.decimals,
        symbol: cs[i].nativeCurrency.symbol,
      });
    }
    if (result.status === "rejected") {
      chainBalances.push({
        chainId: cs[i].id,
        chainName: cs[i].name,
        status: "error",
        message: result.reason instanceof Error ? result.reason.message : String(result.reason),
      });
    }
  }
  return chainBalances;
}

export async function getBalances(address: Address) {
  const balancePromises = clients.map(c => getBalance(c, { address }));
  const settled = await Promise.allSettled(balancePromises)
  return toChainBalances(BALANCE_CHAINS, settled);
}
