import { Balances } from "@/components/balances";
import { getAddress } from "viem";

export default async function AddressPage({ params }: PageProps<"/address/[address]">) {
  const { address } = await params;

  try {
    const validAddress = getAddress(address);
    return (
      <div className="flex flex-col flex-1 items-center justify-center font-sans bg-background text-foreground">
        <main className="flex flex-1 flex-col w-full max-w-3xl py-32 px-16 sm:items-start">
          <Balances address={validAddress} />
        </main>
      </div>
    )
  } catch (err) {
    return <>Invalid Address</>
  }
}
