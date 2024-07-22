"use client";

import { usePopupStore } from "@/stores/popup";
import { FaTrash } from "react-icons/fa";

export default function DeleteTemplateButton({ id }: { id: string }) {
  const { openPopup } = usePopupStore();

  return (
    <button
      className="text-red-500 active:scale-95"
      onClick={() => openPopup("DELETE_TEMPLATE", { id })}
    >
      <FaTrash />
    </button>
  );
}
