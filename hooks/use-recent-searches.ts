import { useState, useEffect, useSyncExternalStore, useMemo } from "react";
import { isAddressEqual, Address } from 'viem';

// TODO: use zod for validation

type RecentSearch = {
  address: Address;
  ensName?: string;
  searchedAt: number;
}

const KEY = "ledgerlens:recent-searches";
const MAX_LENGTH = 8;
const STORAGE_EVENT = "storage";
const RECENTS_EVENT = "ledgerlens:recent"

const subscribe = (onChange: () => void) => {
  window.addEventListener(STORAGE_EVENT, onChange);
  window.addEventListener(RECENTS_EVENT, onChange);

  return () => {
    window.removeEventListener(STORAGE_EVENT, onChange);
    window.removeEventListener(RECENTS_EVENT, onChange);
  }
}

const getSnapshot = () => localStorage.getItem(KEY);

const getServerSnapshot = () => null;

const write = (results: RecentSearch[]) => {
  localStorage.setItem(KEY, JSON.stringify(results));
  window.dispatchEvent(new Event(RECENTS_EVENT));
}

const prependAndCap = (newItem: RecentSearch, currentItems: RecentSearch[]) => {
  return [newItem, ...currentItems.filter(item => !isAddressEqual(item.address, newItem.address))].slice(0, MAX_LENGTH);
}

const add = (rs: RecentSearch) => {
  let results = parseRecents(localStorage.getItem(KEY));
  results = prependAndCap(rs, results);
  write(results);
};

const remove = (address: Address) => {
  let results = parseRecents(localStorage.getItem(KEY));
  results = results.filter(res => !isAddressEqual(res.address, address));
  write(results);
};

const clear = () => {
  localStorage.setItem(KEY, JSON.stringify([]));
  window.dispatchEvent(new Event(RECENTS_EVENT));
};

const parseRecents = (raw: string | null): Array<RecentSearch> => {
  if (raw == null) return [];
  try {
    const ret = JSON.parse(raw);
    if (!Array.isArray(ret)) return [];
    return ret
  } catch (err) {
    return [];
  }
}

export function useRecentSearches(): { recents: Array<RecentSearch>, add: (rs: RecentSearch) => void, remove: (address: Address) => void, clear: () => void } {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const recents = useMemo(() => parseRecents(raw), [raw]);

  return {
    recents,
    add,
    remove,
    clear,
  }
}
