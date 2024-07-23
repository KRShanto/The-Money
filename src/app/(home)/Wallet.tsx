import { useEffect, useState } from "react";
import { getWalletMoney } from "./getWalletMoney";
import { cn } from "@/lib/cn";

export default function Wallet() {
  const [wallet, setWallet] = useState<number>();

  useEffect(() => {
    getWallet();
  }, []);

  async function getWallet() {
    const res = await getWalletMoney();

    setWallet(res.data);
  }

  return (
    <h2 className="text-2xl">
      Wallet:{" "}
      {wallet && (
        <span className={cn(wallet > 0 ? "text-green-500" : "text-red-500")}>
          ${Math.abs(wallet).toLocaleString()}
        </span>
      )}
    </h2>
  );
}
