"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { debounce } from "@/lib/utils/debounce";
import { useMemo, useState } from "react"
import { useResolveInput } from "@/hooks/use-resolve-input";
import { useRouter } from "next/navigation";
import type { Address } from "viem";

export const SearchBox = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const debouncedSetQuery = useMemo(() => debounce(setDebouncedQuery, 300), []); // only create once
  const resolved = useResolveInput(debouncedQuery);
  const { recents, add, remove } = useRecentSearches();
  const router = useRouter();

  const onValueChange = (v: string) => {
    setQuery(v);
    debouncedSetQuery(v);
  }

  const goToAddress = (address: string) => {
    add({ address: address as Address, searchedAt: Date.now(), ensName: "TODO:" });
    router.push(`/address/${address}`);
  }

  return (
    <Command
      className="max-w-sm rounded-lg border"
      shouldFilter={false} // shouldFilter set to false so it does not fight our own recent search feature
    >
      <CommandInput
        placeholder="Search for ethereum address or ENS name"
        value={query}
        onValueChange={onValueChange}
      />
      {/* debouncedQuery */}
      {/* address */}
      {/* recents.length == 0 && <CommandEmpty>No results found.</CommandEmpty> */}
      <CommandList>
        {query.length > 0 && resolved.status == "resolved" && (
          <CommandGroup>
            <CommandItem
              className="cursor-pointer"
              value={resolved.address}
              onSelect={goToAddress}
            >
              {resolved.address}
            </CommandItem>
          </CommandGroup>
        )}
        {recents.length > 0 &&
          <CommandGroup heading="Recent Searches">
            {recents.map(r => (
              <CommandItem className="cursor-pointer" key={r.address} value={r.address} onSelect={goToAddress}>
                {r.address}
              </CommandItem>
            ))}
          </CommandGroup>
        }
      </CommandList>
    </Command>
  )
}
