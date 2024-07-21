"use client";

import MoneyDetails from "@/app/(home)/MoneyDetails";
import AskFriendRequest from "@/app/create/AskFriendRequest";
import RemoveFriend from "@/app/friends/RemoveFriendPopup";
import { usePopupStore } from "@/stores/popup";

export default function PopupState() {
  const { popup } = usePopupStore();

  return (
    <>
      {popup === "ASK_FOR_FRIEND_REQUEST" && <AskFriendRequest />}
      {popup === "SHOW_MONEY_DETAILS" && <MoneyDetails />}
      {popup === "REMOVE_FRIEND" && <RemoveFriend />}
    </>
  );
}
