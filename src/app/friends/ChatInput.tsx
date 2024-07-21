"use client";

import { BiSend } from "react-icons/bi";
import { createMessage } from "./createMessage";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ChatInput({ id }: { id: string }) {
  const router = useRouter();
  const [text, setText] = useState("");

  async function handleSubmit(data: FormData) {
    if (!text) return;

    const res = await createMessage({ to: id, text });

    if (res.success) {
      router.refresh();
      setText("");
    }
  }

  return (
    <form
      className="flex h-[10%] items-center justify-center gap-2"
      action={handleSubmit}
    >
      <input
        className="w-[40rem] rounded-md border-none bg-[#ffffff1d] p-3 px-5 text-xl outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your message"
      />
      <button>
        {/* TODO: loader */}
        <BiSend className="text-3xl" />
      </button>
    </form>
  );
}
