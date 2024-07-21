"use client";

import { getFriendInfo } from "@/actions/getFriendInfo";
import Popup from "@/components/Popup";
import { UserItemType } from "@/components/UserItem";
import { usePopupStore } from "@/stores/popup";
import { MoneyType } from "@/types/money";
import { UserType } from "@/types/user";
import { useEffect, useState } from "react";
import { removeFriend } from "./removeFriend";
import { useRouter } from "next/navigation";

type FriendInfoType = { friend: UserItemType; money: MoneyType[] };

export default function RemoveFriend() {
  const router = useRouter();
  const { data, closePopup } = usePopupStore();
  const { user } = data as { user: UserType };
  const [friendInfo, setFriendInfo] = useState<FriendInfoType>();

  useEffect(() => {
    fetchFriend();
  }, [user]);

  async function fetchFriend() {
    const res = await getFriendInfo(user.id);

    if (res.success) {
      // @ts-ignore
      setFriendInfo(res.data);
    }
  }

  async function handleRemove() {
    const res = await removeFriend(user.id);

    if (res.success) {
      closePopup();
      router.push("/friends");
      router.refresh();
    }
  }

  return (
    <Popup title="Remove a friend">
      <h2 className="text-center text-xl font-bold">
        Are you sure you want to unfriend{" "}
        <span className="text-cyan-500">{user.name}</span>?
      </h2>

      <ul className="mx-auto my-5 flex w-[30rem] list-disc flex-col gap-3 text-lg">
        <li>
          You have {friendInfo?.money.length} transactions with {user.name}.
        </li>
        <li>
          Your transaction records will still be there after removing{" "}
          {user.name} as a friend.
        </li>
        <li>{user.name} will get a notification about this action</li>
      </ul>

      <div className="flex justify-end space-x-3">
        <button className="btn bg-slate-700" onClick={closePopup}>
          Cancel
        </button>
        <button className="btn btn-red" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </Popup>
  );
}
