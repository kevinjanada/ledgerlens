import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRecentSearches } from "./use-recent-searches";

describe("use recent searches", () => {
  it("add prepends to results", () => {
    const { result } = renderHook(() => useRecentSearches())
    act(() => result.current.add({ address: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266', searchedAt: 1 }))
    expect(result.current.recents.length).toBe(1);
  });
});

// TODO: handle other cases
