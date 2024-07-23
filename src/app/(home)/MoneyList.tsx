import { cn } from "@/lib/cn";
import { getColor } from "@/lib/constants";
import { usePopupStore } from "@/stores/popup";
import { MoneyType, MoneyTypeTYpe } from "@/types/money";
import React from "react";
import { FaInfo } from "react-icons/fa";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { getDue } from "@/lib/getDue";
import { MdMoreHoriz } from "react-icons/md";

export default function MoneyList({ moneyList }: { moneyList: MoneyType[] }) {
  const { openPopup } = usePopupStore();
  const searchParams = useSearchParams();

  const highlightedRecord = searchParams.get("record");

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
        <p className="w-[10%] font-bold">Amount</p>
        <p className="w-[10%] font-bold">Due</p>
        <p className="w-[20%] font-bold">Date</p>
        <button className="rounded-full border border-transparent p-1" disabled>
          <FaInfo className="text-transparent" />
        </button>
      </div>

      {/* Money List */}
      <div className="h-[70vh] w-[80%] overflow-y-scroll ">
        {moneyList.map((money, index) => {
          const due = getDue(money);

          return (
            <div
              key={index}
              className={cn(
                "mt-2 flex w-full items-center justify-between rounded-md border border-slate-700 p-3",
                highlightedRecord &&
                  highlightedRecord === money.id &&
                  "border-cyan-300",
              )}
            >
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: getColor(money.type) }}
              ></div>

              <h3 className="w-[20%]">{money.oppositeUser.name}</h3>

              <p className="w-[20%]">{money.description}</p>

              {/* Fetch the amount type (dollar/taka/euro) from settings */}
              <p className="w-[10%]">$ {money.amount.toLocaleString()}</p>

              <p
                className={cn(
                  "w-[10%]",
                  money.type === "borrow" ? "text-red-500" : "text-yellow-400",
                )}
              >
                {due ? `$ ${due.toLocaleString()}` : null}
              </p>

              <p className="w-[20%]">
                {moment(money.date).format("DD MMMM, yy")}
              </p>

              <button
                className="rounded-full p-[.2rem] text-xl transition-colors hover:bg-slate-700"
                onClick={() => openMoneyDetails(money)}
              >
                <MdMoreHoriz />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
