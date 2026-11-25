import { describe, expect, it } from "vitest";
import { truncateAddress } from "./truncate-address";


describe("truncate address", () => {
  it("returns truncated address", () => {
    const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const truncated = truncateAddress(address);
    expect(truncated).toBe("0xf39F...2266");
  });

  // TODO: handle other cases
})
