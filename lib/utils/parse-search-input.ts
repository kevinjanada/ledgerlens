import type { Address } from "viem";
import { getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";

export type ParsedInput =
  | { kind: "empty" }
  | { kind: "address"; address: Address }
  | { kind: "ens"; name: string }
  | { kind: "invalid" }

export const parseSearchInput = (v: string): ParsedInput => {
  const q = v.trim();
  if (!q) return { kind: "empty" };

  if (isAddress(q, { strict: false })) {
    try {
      const address = getAddress(q);
      return { kind: "address", address };
    } catch {
      return { kind: "invalid" };
    }
  }

  if (q.includes(".")) {
    try {
      const ens = normalize(q);
      return { kind: "ens", name: ens };
    } catch {
      return { kind: "invalid" }
    }
  }

  return { kind: "invalid" };
}


