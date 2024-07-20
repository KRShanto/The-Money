import { UserType } from "@/types/user";
import React from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { Message } from "@/models/message";
import { getAuthSession } from "@/lib/auth";

export default async function Chat({ user }: { user?: UserType }) {
  // Get the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;

  if (!user)
    return (
      <div className="h-[75vh] w-[50%] rounded-lg border border-slate-600 p-3">
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-2xl">Select a friend to open chat.</p>
        </div>
      </div>
    );

  const messages = await Message.find({
    $or: [{ to: session?.user.id }, { from: session?.user.id }],
  });

  console.log("Session id: ", session?.user.id);

  return (
    <div className="h-[75vh] w-[50%] rounded-lg border border-slate-600 p-5">
      <ChatHeader user={user} />
      <ChatBody
        userId={session?.user.id!}
        oppositeUserId={user.id}
        messages={messages}
      />
      <ChatInput id={user.id} />
    </div>
  );
}
