"use server";

import { getAuthSession } from "@/lib/auth";
import { TYPES } from "@/lib/constants";
import { Money } from "@/models/money";

export async function create({ data, type }: { data: FormData; type: string }) {
  // Get the user id from the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;
  const userId = session?.user?.id;

  const { oppositeUser, amount, description, date } = Object.fromEntries(
    data.entries(),
  );

  // Check if required fields are provided
  if (!oppositeUser || !amount) {
    return {
      error: "User and amount are required",
    };
  }

  // Check if the type is valid
  if (!TYPES.includes(type as any)) {
    return {
      error: "Type of money is invalid",
    };
  }

  // Parse the opposite user from string to object
  // Syntax: type:id or name
  // type: user or custom
  const oppositeUserArray = (oppositeUser as string).split(":");
  const userType = oppositeUserArray[0];
  const id = userType === "user" ? oppositeUserArray[1] : null;
  const name = userType === "custom" ? oppositeUserArray[1] : null;

  // Check if the opposite user is provided
  if (!id && !name) {
    return {
      error: "User is required",
    };
  }

  // Check if the user id is provided
  if (userType === "user" && !id) {
    return {
      error: "User `id` is required",
    };
  }

  // Check if the user name is provided
  if (userType === "custom" && !name) {
    return {
      error: "User `name` is required",
    };
  }

  // Check if the amount is a number
  if (isNaN(Number(amount))) {
    return {
      error: "Amount should be a number",
    };
  }

  // Check if the date is valid
  if (isNaN(Date.parse(date as string))) {
    return {
      error: "Date is invalid",
    };
  }

  // Create the money
  const money = new Money({
    userId,
    type,
    oppositeUser: {
      type: userType,
      id,
      name,
    },
    amount: Number(amount),
    description,
    date: new Date(date as string),
    createdBy: userId,
  });

  await money.save();

  return {
    success: true,
    data: {
      _id: money._id,
    },
  };
}
