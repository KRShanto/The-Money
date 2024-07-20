"use server";

import { getAuthSession } from "@/lib/auth";
import { Friend } from "@/models/friend";
import { sendNotification } from "./sendNotification";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";

// Send friend request
// NOTE: It doesn't really send any request. Rather this add these two users as friend, sends a notification. And then if any user wants, they can delete their friendship.
export async function sendFriendRequest(to: string) {
  const session = (await getAuthSession()) as any;
  const userId = session.user.id;

  // Get the current user
  const user = await User.findById(userId);

  // Create friend
  const newFriend = new Friend({
    one: to,
    two: userId,
  });

  await newFriend.save();

  // Send notification
  await sendNotification({
    to,
    title: "A user added you as friend",
    links: [
      { title: "View User", href: `/user/${userId}` },
      { title: "View Friends", href: "/friends" },
      { title: "View Chat", href: `/friends?id=${userId}` },
    ],
    body: `${user?.name} has chose you to be his/her friend. You can greet him/her with a message`,
    type: "normal",
  });

  revalidatePath("/friends");

  return {
    success: true,
    data: newFriend,
  };
}
