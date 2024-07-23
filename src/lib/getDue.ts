import { MoneyType } from "@/types/money";

// Get the due of any loan/borrow
export function getDue(money: MoneyType): number | undefined {
  let historyTotal: number | undefined;

  if (money.type === "borrow" || money.type === "loan") {
    historyTotal = money.history
      ? money.history.reduce((sum, current) => sum + current.amount, 0)
      : 0;
  }

  const due =
    historyTotal !== undefined ? money.amount - historyTotal : undefined;

  return due;
}
