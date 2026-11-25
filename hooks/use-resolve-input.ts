import { parseSearchInput } from "@/lib/utils/parse-search-input";
import type { Address } from "viem";
import { useMemo } from "react";
import { mainnet } from "viem/chains";
import { useEnsAddress, useEnsName } from "wagmi";

export type ResolveResult =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "resolved"; address: Address; ensName?: string }
  | { status: "not-found"; ensName: string }
  | { status: "error"; error: Error }

export function useResolveInput(input: string): ResolveResult {
  const parsedInput = useMemo(() => parseSearchInput(input), [input]);

  const forward = useEnsAddress({
    name: parsedInput.kind === "ens" ? parsedInput.name : undefined,
    chainId: mainnet.id,
    query: { enabled: parsedInput.kind == "ens" }
  });

  const reverse = useEnsName({
    address: parsedInput.kind === "address" ? parsedInput.address : undefined,
    chainId: mainnet.id,
    query: { enabled: parsedInput.kind == "address" }
  });

  switch (parsedInput.kind) {
    case "empty":
      return { status: "idle" }

    case "invalid":
      return { status: "idle" }

    case "ens":
      if (forward.isLoading) return { status: "loading" };
      if (forward.isError) return { status: "error", error: forward.error };
      if (!forward.data) return { status: "not-found", ensName: parsedInput.name };
      return { status: "resolved", address: forward.data, ensName: parsedInput.name };

    case "address":
      return { status: "resolved", address: parsedInput.address, ensName: reverse.data ?? undefined }
  }
}


