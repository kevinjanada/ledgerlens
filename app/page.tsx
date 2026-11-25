import Image from "next/image";
import { ChainCheck } from "@/components/chain-check";
import { SearchBox } from "@/components/search-box";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background text-foreground">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1>Ledgerlens</h1>
        <SearchBox />
        <ChainCheck />
      </main>
    </div>
  );
}
