"use server";

import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Money } from "@/models/money";
import { User } from "@/models/user";

export async function getFriendInfo(id: string) {
  await dbConnect();

  const session = (await getAuthSession()) as {
    user: {
      id: string;
    };
  } | null;

  const friend = await User.findById(id);

  // Now get all the records that both have.
  const money = await Money.find({
    // TODO: make it work
    // $or: [
    //   { userId: session?.user.id, oppositeUser: { id } },
    //   { userId: id, oppositeUser: { id: session?.user.id } },
    // ],
  });

  // filter using javascript
  const newMoney = money.filter((money) => {
    if (
      (money.userId == session?.user.id && money.oppositeUser.id == id) ||
      (money.userId == id && money.oppositeUser.id == session?.user.id)
    ) {
      return true;
    }

    return false;
  });

  return {
    success: true,
    data: {
      friend,
      money: newMoney,
    },
  };
}
