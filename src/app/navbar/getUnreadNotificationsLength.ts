"use server";

import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Notification } from "@/models/notification";
import { UserType } from "@/types/user";

export async function getUnreadNotificationsLength() {
  await dbConnect();

  const session = (await getAuthSession()) as { user: UserType } | null;

  const unreadNotifications = await Notification.find({
    to: session?.user.id,
    read: false,
  });

  return {
    success: true,
    data: unreadNotifications.length,
  };
}
