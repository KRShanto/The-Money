import { addFriend } from "@/actions/addFriend";
import Popup from "@/components/Popup";
import { usePopupStore } from "@/stores/popup";
import React from "react";

export default function AskFriendRequest() {
  const { data, closePopup } = usePopupStore();
  const { id } = data;

  return (
    <Popup title="Send a friend request">
      <p className="mb-7 text-xl">
        This user is not your friend. Do you want to send a friend request?
      </p>

      <div className="flex justify-end space-x-3">
        <button className="btn bg-slate-700" onClick={closePopup}>
          No thanks
        </button>

        <button
          className="btn btn-main"
          onClick={async () => {
            await addFriend(id);
            closePopup();
          }}
        >
          Send
        </button>
      </div>
    </Popup>
  );
}
