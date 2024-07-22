"use server";

import { getAuthSession } from "@/lib/auth";
import { Template } from "@/models/template";
import { User } from "@/models/user";

export async function createTemplate(data: FormData) {
  // Get the user id from the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;
  const userId = session?.user?.id;

  const amount = data.get("amount");
  const oppositeUser = data.get("oppositeUser");
  const description = data.get("description");
  const type = data.get("type");

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

  const userName = id ? (await User.findById(id))?.name : name;

  // Create the template
  const template = new Template({
    userId,
    type,
    oppositeUser: {
      type: userType,
      id,
      name: userName,
    },
    amount: Number(amount),
    description,
  });

  await template.save();

  return {
    success: true,
    data: {
      id: template._id,
    },
  };
}
