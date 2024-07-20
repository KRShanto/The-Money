"use server";

import { getAuthSession } from "@/lib/auth";
import { dbConnect } from "@/lib/dbConnect";
import { Friend } from "@/models/friend";
import { Money } from "@/models/money";
import { User } from "@/models/user";
import { MoneyTypeTYpe } from "@/types/money";

function getSummury({
  type,
  oppositeUserType,
  oppositeUserIsSame,
  oppositeUserName,
}: {
  type: MoneyTypeTYpe;
  oppositeUserType: "user" | "custom";
  oppositeUserIsSame: boolean;
  oppositeUserName: string;
}) {
  let summury;

  // TODO: highlight the names using <>{name}<>
  switch (type) {
    case "income":
      if (oppositeUserType !== "custom") {
        summury = oppositeUserIsSame
          ? `You bought/payed money to ${oppositeUserName}`
          : `You earned money from ${oppositeUserName}`;
      } else {
        summury = `You earned money from ${oppositeUserName}`;
      }
      break;

    case "expense":
      if (oppositeUserType !== "custom") {
        summury = oppositeUserIsSame
          ? `You earned money from ${oppositeUserName}`
          : `You bought/payed money to ${oppositeUserName}`;
      } else {
        summury = `You bought/payed money to ${oppositeUserName}`;
      }
      break;

    case "borrow":
      if (oppositeUserType !== "custom") {
        summury = oppositeUserIsSame
          ? `You gave loan to ${oppositeUserName}`
          : `You took money (borrowed) from ${oppositeUserName}`;
      } else {
        summury = `You took money (borrowed) from ${oppositeUserName}`;
      }
      break;

    case "loan":
      if (oppositeUserType !== "custom") {
        summury = oppositeUserIsSame
          ? `You took money (borrowed) from ${oppositeUserName}`
          : `You gave loan to ${oppositeUserName}`;
      } else {
        summury = `You gave loan to ${oppositeUserName}`;
      }
      break;
  }

  return summury;
}

export async function getCorrectType({
  type,
  oppositeUserIsSame,
}: {
  type: MoneyTypeTYpe;
  oppositeUserIsSame: boolean;
}) {
  let correctType: MoneyTypeTYpe;

  switch (type) {
    case "income":
      correctType = oppositeUserIsSame ? "expense" : "income";
      break;

    case "expense":
      correctType = oppositeUserIsSame ? "income" : "expense";
      break;

    case "borrow":
      correctType = oppositeUserIsSame ? "loan" : "borrow";
      break;

    case "loan":
      correctType = oppositeUserIsSame ? "borrow" : "loan";
      break;
  }

  return correctType;
}

export async function getMoneyInfo(id: string) {
  await dbConnect();

  const session = (await getAuthSession()) as { user: { id: string } } | null;

  // Get the money model
  const money = await Money.findById(id);

  let oppositeUser;

  if (money?.oppositeUser.id) {
    if (money?.oppositeUser.id != session?.user.id) {
      const user = await User.findById(money.oppositeUser.id);
      oppositeUser = {
        id: user?._id,
        name: user?.name,
        image: user?.image,
        type: "user",
      };
    } else {
      const user = await User.findById(money.createdBy);
      oppositeUser = {
        id: user?.id,
        name: user?.name,
        image: user?.image,
        type: "user",
      };
    }
  } else {
    oppositeUser = { type: "custom", name: money?.oppositeUser.name };
  }

  let isFriend = false;

  // Check if user is friend or not
  if (oppositeUser.type === "user") {
    const friend = await Friend.findOne({
      $or: [
        { one: session?.user?.id, two: oppositeUser.id },
        { one: oppositeUser.id, two: session?.user?.id },
      ],
    });

    isFriend = !!friend;
  }

  console.log("ID: ", session?.user.id);

  return {
    type: await getCorrectType({
      type: money?.type!,
      oppositeUserIsSame:
        money?.oppositeUser.id === session?.user.id.toString(),
    }),
    description: money?.description,
    amount: money?.amount,
    date: money?.date,
    lastDate: money?.lastDate,
    oppositeUser: {
      isFriend,
      name: oppositeUser.name,
      type: oppositeUser.type,
      id: oppositeUser.id,
      image: oppositeUser.image,
    },
    summury: getSummury({
      type: money?.type!,
      oppositeUserType: oppositeUser.type as "user" | "custom",
      oppositeUserIsSame:
        money?.oppositeUser.id === session?.user.id.toString(),
      oppositeUserName: oppositeUser.name!,
    }),
  };
}
