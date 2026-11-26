import { describe, it, expect } from "vitest";
import { toChainBalances } from "./balances";
import { mainnet, optimism } from "viem/chains";
import { parseEther } from "viem";

describe("getBalances", () => {
  it("converts promises to ChainBalance[] type", () => {
    const settled: PromiseSettledResult<bigint>[] = [
      { status: "fulfilled", value: parseEther("1.5"), },
      { status: "rejected", reason: new Error("boom") },
    ]

    const balances = toChainBalances([mainnet, optimism], settled)
    expect(balances).toEqual([
      { chainId: mainnet.id, chainName: mainnet.name, status: "ok", value: parseEther("1.5"), decimals: mainnet.nativeCurrency.decimals, symbol: mainnet.nativeCurrency.symbol },
      { chainId: optimism.id, chainName: optimism.name, status: "error", message: "boom" },
    ])
  })
})
