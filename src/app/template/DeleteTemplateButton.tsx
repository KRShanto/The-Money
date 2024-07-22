"use client";

import { usePopupStore } from "@/stores/popup";
import { FaTrash } from "react-icons/fa";

export default function DeleteTemplateButton({ id }: { id: string }) {
  const { openPopup } = usePopupStore();

  return (
    <button
      className="rounded-full p-2 text-red-500 transition-colors hover:bg-slate-800 active:scale-95"
      onClick={() => openPopup("DELETE_TEMPLATE", { id })}
    >
      <FaTrash />
    </button>
  );
}
