"use server";

import { Money } from "@/models/money";
import { User } from "@/models/user";

export async function edit({ id, data }: { id: string; data: FormData }) {
  // get the money
  const money = await Money.findById(id);

  if (!money)
    return {
      error: "Money not found",
    };

  const amount = data.get("amount") as string;
  let oppositeUser = data.get("oppositeUser") as string;
  let description = data.get("description") as string;
  let date = data.get("date") as string;
  let lastDate = data.get("lastDate") as string;

  // Check if required fields are provided
  if (!oppositeUser || !amount) {
    return {
      error: "User and amount are required",
    };
  }

  // Parse the opposite user from string to object
  // Syntax: "type:(id or name)"
  // type: "user" or "custom"
  const oppositeUserArray = (oppositeUser as string).split(":");
  const userType = oppositeUserArray[0];
  const inputUserId = userType === "user" ? oppositeUserArray[1] : null;
  const name = userType === "custom" ? oppositeUserArray[1] : null;

  // Check if the opposite user is provided
  if (!inputUserId && !name) {
    return {
      error: "User is required",
    };
  }

  // Check if the user id is provided
  if (userType === "user" && !inputUserId) {
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

  const userName = inputUserId
    ? (await User.findById(inputUserId))?.name
    : name;

  // Update the money
  money.oppositeUser = {
    type: userType as "custom" | "user",
    id: inputUserId as string,
    name: userName as string,
  };
  money.amount = Number(amount);
  money.description = description;
  money.date = new Date(date);
  money.lastDate = lastDate ? new Date(lastDate) : undefined;

  await money.save();

  return {
    success: true,
    data: {
      id: money._id,
    },
  };
}
