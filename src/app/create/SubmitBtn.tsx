"use client";

import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";
import { create } from "./create";
import { usePopupStore } from "@/stores/popup";
import { sendNotification } from "@/actions/sendNotification";
import { useRouter } from "next/navigation";
import { MoneyTypeTYpe } from "@/types/money";

export default function SubmitBtn({
  type,
  userId,
  userName,
}: {
  type: MoneyTypeTYpe;
  userId: string;
  userName: string;
}) {
  const { showError } = useFormErrorStore();
  const { openPopup } = usePopupStore();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const res = await create({
      data,
      type,
    });

    if (res.error) {
      return showError(res.error);
    }

    if (type !== "deposit") {
      // Send notification
      // If the user is the friend of the opposite user, send notification
      // Else, ask to send a friend request, not a notification
      const oppoisiteUser = data.get("oppositeUser") as string;
      // split the user value. syntax: type:id/name. if type == user, then -> user:id:friend/not-friend
      const splittedUser = oppoisiteUser.split(":");

      if (splittedUser[0] === "user") {
        const isFriend = splittedUser[2] === "friend" ? true : false;

        if (!isFriend) {
          openPopup("ASK_FOR_FRIEND_REQUEST", { id: splittedUser[1] });
        } else {
          sendNotification({
            type: "normal",
            title: "A record has been created with you",
            body: `${userName} has created a record with you.`,
            links: [
              {
                href: `/user/${userId}`,
                title: "View user",
              },
              {
                href: `/?record=${res.data?.id}`,
                title: "View record",
              },
            ],

            to: splittedUser[1],
          });
        }
      }
    }

    // At the end, return back to the home page
    router.push("/");
    router.refresh();
  };

  return <Submit formAction={handleSubmit}>Create</Submit>;
}
