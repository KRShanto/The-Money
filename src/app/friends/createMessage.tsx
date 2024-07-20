"use server";

import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Message } from "@/models/message";

export async function createMessage({
  to,
  text,
}: {
  to: string;
  text: string;
}) {
  if (!text || !to) return { error: "Inputs cannnot be empty" };

  await dbConnect();

  // Get the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;

  const newMessage = new Message({
    to,
    text,
    from: session?.user.id,
  });

  await newMessage.save();

  // Send to pusher

  return {
    success: true,
    data: newMessage,
  };
}
