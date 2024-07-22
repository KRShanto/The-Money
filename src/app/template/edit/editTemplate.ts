"use server";

import { getAuthSession } from "@/lib/auth";
import { Template } from "@/models/template";
import { User } from "@/models/user";
import { useId } from "react";

export async function editTemplate({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) {
  const amount = data.get("amount") as string;
  const oppositeUser = data.get("oppositeUser") as string;
  const description = data.get("description") as string;
  const type = data.get("type") as "expense" | "profit";

  // Check if the required fields are provided
  if (!amount || !oppositeUser) {
    return {
      error: "User and amount are required",
    };
  }

  // Parse the opposite user from string to object
  // Syntax: "type:(id or name)"
  // type: "user" or "custom"
  const oppositeUserArray = (oppositeUser as string).split(":");
  const userType = oppositeUserArray[0];
  const userId = userType === "user" ? oppositeUserArray[1] : null;
  const name = userType === "custom" ? oppositeUserArray[1] : null;

  // Check if the opposite user is provided
  if (!userId && !name) {
    return {
      error: "User is required",
    };
  }

  // Check if the user id is provided
  if (userType === "user" && !userId) {
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

  const userName = userId ? (await User.findById(userId))?.name : name;

  const template = await Template.findById(id);

  if (!template)
    return {
      error: "Template not found!",
    };

  template.type = type;
  template.oppositeUser = {
    type: userType as any,
    id: userId as string,
    name: userName as string,
  };
  template.amount = Number(amount);
  template.description = description;

  await template.save();

  return {
    success: true,
    data: {
      id: template._id,
    },
  };
}
