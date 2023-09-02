"use server";

import { dbConnect } from "@/lib/dbConnect";
import { Notification } from "@/models/notification";
import { revalidatePath } from "next/cache";

export async function deleteNotification(notificationId: string) {
  await dbConnect();

  const notification = await Notification.findById(notificationId);

  if (!notification) {
    return { success: false, error: "Notification not found" };
  }

  await notification.deleteOne();

  revalidatePath("/notifications");

  return { success: true };
}
