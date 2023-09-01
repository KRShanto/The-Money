"use client";

import AskFriendRequest from "@/app/create/AskFriendRequest";
import { usePopupStore } from "@/stores/popup";

export default function PopupState() {
  const { popup } = usePopupStore();

  return <>{popup === "ASK_FOR_FRIEND_REQUEST" && <AskFriendRequest />}</>;
}
