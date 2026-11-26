"use client"

import { getBalances } from "@/lib/balances";
import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";

export function Balances({ address }: { address: Address }) {
  const { data, isLoading, isError, error } = useQuery({ queryKey: ["balances", address], queryFn: () => getBalances(address) });

  if (isLoading) return <>Skeleton</>
  if (isError) return <div>{error.message}</div>

  return data?.map(cb => {
    if (cb.status == "ok") {
      return <div key={cb.chainId}>{cb.chainName} balance: {cb.value}</div>
    }
    if (cb.status == "error") {
      return <div key={cb.chainId}>click to retry</div>
    }
  });
}
