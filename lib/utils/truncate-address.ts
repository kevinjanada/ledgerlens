import { Address } from "viem";

export const truncateAddress = (address: Address) => {
  const prefix = address.slice(0, 6);
  const suffix = address.slice(-4);
  return `${prefix}...${suffix}`;
}
