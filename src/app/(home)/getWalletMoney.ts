"use server";

import { getAuthSession } from "@/lib/auth";
import { getCorrectType } from "@/lib/getCorrectType";
import { getDue } from "@/lib/getDue";
import { Money } from "@/models/money";
import { User } from "@/models/user";

export async function getWalletMoney() {
  const session = (await getAuthSession()) as any;
  const userId = await session.user.id;

  const money = await Money.find({});

  // TODO: query instead filter
  const moneyForUser = money.filter((money) => {
    if (money.userId == userId || money.oppositeUser.id == userId) {
      return true;
    }
    return false;
  });

  const moneyWithCorrectType = await Promise.all(
    moneyForUser.map(async (money) => {
      if (money.oppositeUser.id == userId) {
        const user = await User.findById(money.userId);
        return {
          ...money,
          oppositeUser: {
            ...money.oppositeUser,
            name: user?.name,
          },
          type: await getCorrectType({
            type: money.type,
            oppositeUserIsSame: true,
          }),
          history: money.history,
          amount: money.amount,
        };
      } else {
        return money;
      }
    }),
  );

  // TODO: document this
  const wallet = moneyWithCorrectType.reduce((value, money) => {
    if (money.type === "profit" || money.type === "deposit") {
      return value + money.amount;
    } else if (money.type === "expense") {
      return value - money.amount;
    } else if (money.type === "loan") {
      const due = getDue(money!)!;
      return value - due;
    } else {
      const due = getDue(money!)!;
      return value + due;
    }
  }, 0);

  return {
    success: true,
    data: wallet,
  };
}
