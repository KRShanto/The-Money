"use server";

import { Notification } from "@/models/notification";
import { dbConnect } from "@/lib/dbConnect";

export async function markNotificationRead(notificationId: string) {
  await dbConnect();

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return { success: false, error: "Notification not found" };
  }

  notification.read = true;
  await notification.save();

  return { success: true };
}
