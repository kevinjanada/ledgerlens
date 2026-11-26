import { chains, transports } from "./chains";
import { createConfig } from "wagmi";

export const config = createConfig({ chains, transports });
