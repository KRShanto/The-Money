import { cn } from "@/lib/cn";
import { getColor } from "@/lib/constants";
import { usePopupStore } from "@/stores/popup";
import { MoneyType, MoneyTypeTYpe } from "@/types/money";
import React from "react";
import { FaInfo } from "react-icons/fa";
import moment from "moment";

export default function MoneyList({ moneyList }: { moneyList: MoneyType[] }) {
  const { openPopup } = usePopupStore();

  function openMoneyDetails(money: MoneyType) {
    openPopup("SHOW_MONEY_DETAILS", { id: money.id });
  }

  return (
    <div className="my-5 flex flex-col items-center gap-3">
      {/* Heading */}
      <div className="flex w-[80%] items-center justify-between border-b  border-slate-700 p-1 px-3 text-lg">
        <div className="h-4 w-4 rounded-full bg-transparent"></div>
        <h3 className="w-[20%] font-bold">User Name</h3>
        <p className="w-[20%] font-bold">Description</p>
        <p className="w-[20%] font-bold">Amount</p>
        <p className="w-[20%] font-bold">Date</p>
        <button className="rounded-full border border-transparent p-1" disabled>
          <FaInfo className="text-transparent" />
        </button>
      </div>

      {/* Money List */}
      {moneyList.map((money, index) => (
        <div
          key={index}
          className="flex w-[80%] items-center justify-between rounded-md border border-slate-700 p-3"
        >
          <div
            className="h-4 w-4 rounded-full"
            style={{ backgroundColor: getColor(money.type) }}
          ></div>

          <h3 className="w-[20%]">{money.oppositeUser.name}</h3>

          <p className="w-[20%]">{money.description}</p>

          {/* Fetch the amount type (dollar/taka/euro) from settings */}
          <p className="w-[20%]">$ {money.amount}</p>

          <p className="w-[20%]">{moment(money.date).format("DD MMMM, yy")}</p>

          <button
            className="rounded-full border p-1"
            onClick={() => openMoneyDetails(money)}
          >
            <FaInfo />
          </button>
        </div>
      ))}
    </div>
  );
}
