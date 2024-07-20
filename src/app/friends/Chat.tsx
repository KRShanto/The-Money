import { UserType } from "@/types/user";
import React from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import { Message } from "@/models/message";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Chat({ user }: { user?: UserType }) {
  // Get the session
  const session = (await getAuthSession()) as { user: { id: string } } | null;

  if (!user)
    return (
      <Wrappar>
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-2xl">Select a friend to open chat.</p>
        </div>
      </Wrappar>
    );

  const messages = await Message.find({
    $or: [{ to: session?.user.id }, { from: session?.user.id }],
  });

  return (
    <Wrappar>
      <ChatHeader user={user} />
      <ChatBody
        userId={session?.user.id!}
        oppositeUserId={user.id}
        messages={messages}
      />
      <ChatInput id={user.id} />
    </Wrappar>
  );
}

function Wrappar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-[50%] flex-col items-end">
      <Link href="/friends/add" className="btn btn-green mb-2 w-fit">
        Add Friend
      </Link>

      <div className="h-[75vh] w-full rounded-lg border border-slate-600 p-1 px-5">
        {children}
      </div>
    </div>
  );
}
