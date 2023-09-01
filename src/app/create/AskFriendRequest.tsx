import Popup from "@/components/Popup";
import { usePopupStore } from "@/stores/popup";
import React from "react";

export default function AskFriendRequest() {
  const { closePopup } = usePopupStore();

  return (
    <Popup title="Send a friend request">
      <p className="mb-7 text-xl">
        This user is not your friend. Do you want to send a friend request?
      </p>

      <div className="flex justify-end space-x-3">
        <button className="btn btn-main" onClick={closePopup}>
          Send
        </button>

        <button className="btn bg-slate-700" onClick={closePopup}>
          No thanks
        </button>
      </div>
    </Popup>
  );
}
