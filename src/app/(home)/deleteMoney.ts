"use server";

import { Money } from "@/models/money";
import { revalidatePath } from "next/cache";

export async function deleteMoney(id: string) {
  await Money.deleteOne({ _id: id });

  revalidatePath("/");

  return { success: true };
}
