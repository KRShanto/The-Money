"use server";

import { dbConnect } from "@/lib/dbConnect";
import { Money } from "@/models/money";
import { revalidatePath } from "next/cache";

// Return or Take money
// NOTE: this works for both "loan" and "borrow"
export async function returnMoney({
  id,
  amount,
  date,
}: {
  id: string;
  amount: number;
  date: Date;
}) {
  if (amount < 1) {
    return {
      error: "Amount cannot be negative or zero",
    };
  }

  // TODO: check if the date is previous than actual date

  await dbConnect();

  const money = await Money.findById(id);

  if (!money)
    return {
      error: "Money not found",
    };

  // Check if the amount is greater than the actual amount
  if (amount > money.amount) amount = money.amount;

  console.log("Money: ", money);

  const updatedMoney = await Money.findOneAndUpdate(
    { _id: id },
    {
      $push: { history: { amount, date } },
    },
    { new: true },
  );

  console.log("Updated Money: ", updatedMoney);

  revalidatePath("/");

  return {
    success: true,
  };
}
