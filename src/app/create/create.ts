"use server";

import { getAuthSession } from "@/lib/auth";
import { SITE_NAME, TYPES } from "@/lib/constants";
import { Money } from "@/models/money";
import { Template } from "@/models/template";
import { User } from "@/models/user";
import { MoneyTypeTYpe } from "@/types/money";
import { revalidatePath } from "next/cache";

export async function create({
  data,
  type,
}: {
  data: FormData;
  type: MoneyTypeTYpe;
}) {
  // Get the user id from the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;
  const userId = session?.user?.id;

  const amount = data.get("amount");
  let oppositeUser = data.get("oppositeUser");
  let description = data.get("description");
  let date = data.get("date");
  let lastDate = data.get("lastDate");
  const saveAsTemplate = data.get("save-as-template");

  // If its a deposit, change the inputs
  if (type === "deposit") {
    oppositeUser = `custom:${SITE_NAME} Software`;
    description = "I'm starting using this software by depositing this amount.";
    date = new Date().toDateString();
  }

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
  // Syntax: "type:(id or name)"
  // type: "user" or "custom"
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

  const userName = id ? (await User.findById(id))?.name : name;

  // Create the money
  const money = new Money({
    userId,
    type,
    oppositeUser: {
      type: userType,
      id,
      name: userName,
    },
    amount: Number(amount),
    description,
    date: new Date(date as string),
    lastDate: lastDate ? new Date(lastDate as string) : undefined,
    createdBy: userId,
  });

  await money.save();

  if (saveAsTemplate) {
    const template = new Template({
      userId,
      type,
      oppositeUser: money.oppositeUser,
      amount: Number(amount),
      description,
    });

    await template.save();
  }

  return {
    success: true,
    data: {
      id: money._id,
    },
  };
}
