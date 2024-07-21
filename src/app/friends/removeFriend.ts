"use server";

import { sendNotification } from "@/actions/sendNotification";
import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Friend } from "@/models/friend";
import { Message } from "@/models/message";

export async function removeFriend(id: string) {
  await dbConnect();

  const session = (await getAuthSession()) as any;

  // Remove friend
  await Friend.deleteOne({
    $or: [
      { one: id, two: session.user.id },
      { one: session.user.id, two: id },
    ],
  });

  // Remove all the chats
  await Message.deleteMany({
    $or: [
      { from: id, to: session.user.id },
      { from: session.user.id, to: id },
    ],
  });

  // Send a notification to opposite user
  await sendNotification({
    to: id,
    title: `${session.user.name} unfriend you`,
    body: `${session.user.name} is no longer your friend now. However, you can still see your transactions with ${session.user.name}`,
    type: "danger",
    links: [],
  });

  return { success: true };
}
