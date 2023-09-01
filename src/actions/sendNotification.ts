"use server";

import { dbConnect } from "@/lib/dbConnect";
import { Notification } from "@/models/notification";
import { User } from "@/models/user";

interface Props {
  to: string;
  type: "normal" | "danger" | "warning";
  title: string;
  body: string;
  links: { href: string; title: string }[];
}

export async function sendNotification({
  to,
  type,
  title,
  body,
  links,
}: Props) {
  await dbConnect();

  // Check if user exists
  const user = await User.findOne({ _id: to });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  // Create notification
  const notification = new Notification({
    to,
    type,
    title,
    body,
    links,
  });

  // Save notification
  await notification.save();

  return { success: true, error: null };
}
