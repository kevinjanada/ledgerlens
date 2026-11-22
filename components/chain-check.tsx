'use client';
import { useBlockNumber, useChains } from 'wagmi';

export function ChainCheck() {
  const chains = useChains();
  return (
    <ul>
      {chains.map(c => <ChainRow key={c.id} id={c.id} name={c.name} />)}
    </ul>
  )
}

export function ChainRow({ id, name }: { id: number, name: string }) {
  const { data, error, isPending } = useBlockNumber(({ chainId: id, watch: true }))
  if (isPending) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <li>Chain {name} {id} · block {data?.toString()}</li>;
}

