import { cn } from "@/lib/cn";
import { MoneyType, MoneyTypeTYpe } from "@/types/money";
import React from "react";
import { FaInfo } from "react-icons/fa";

// TODO: improve these colors
function getColor(type: MoneyTypeTYpe) {
  switch (type) {
    case "income":
      return "green";

    case "borrow":
      return "yellow";

    case "expense":
      return "red";

    case "gift":
      return "skyblue";

    case "loan":
      return "blue";

    case "sell":
      return "purple";

    default:
      return "yellow";
  }
}

export default function MoneyList({ moneyList }: { moneyList: MoneyType[] }) {
  return (
    <div className="my-5 flex flex-col items-center gap-3">
      {/* name, type, amount, description, date */}
      {moneyList.map((money, index) => (
        <div
          key={index}
          className="flex w-[80%] items-center justify-between rounded-md border border-slate-500 p-3"
        >
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: getColor(money.type) }}
          ></div>

          <h3 className="w-[20%]">{money.oppositeUser.name}</h3>

          <p className="w-[20%]">{money.description}</p>

          {/* Fetch the amount type (dollar/taka/euro) from settings */}
          <p className="w-[20%]">$ {money.amount}</p>

          <p className="w-[20%]">{money.date.toLocaleDateString()}</p>

          <button className="rounded-full border p-1">
            <FaInfo />
          </button>
        </div>
      ))}
    </div>
  );
}
