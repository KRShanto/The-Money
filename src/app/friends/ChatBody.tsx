import { MessageType } from "@/types/message";
import React from "react";

export default function ChatBody({
  userId,
  oppositeUserId,
  messages,
}: {
  userId: string;
  oppositeUserId: string;
  messages: MessageType[];
}) {
  return (
    <div className="h-[75%] overflow-y-scroll p-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${
            message.from == userId ? "flex-row-reverse" : "flex-row"
          } flex w-full items-center  p-2`}
        >
          <div
            className={`${
              message.from == oppositeUserId ? "bg-blue-600" : "bg-orange-600"
            } p-3 ${
              message.from == userId ? "rounded-br-none" : "rounded-bl-none"
            } rounded-full text-white`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
