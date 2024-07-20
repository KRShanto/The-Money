import { MoneyType } from "@/types/money";
import Link from "next/link";
import Filter from "./Filter";
import ShowTypes from "./ShowTypes";
import { BiFilter } from "react-icons/bi";
import { useState } from "react";

export default function Header({
  money,
  moneyList,
  setMoneyList,
}: {
  // original list
  money: MoneyType[];
  moneyList: MoneyType[];
  setMoneyList: React.Dispatch<React.SetStateAction<MoneyType[]>>;
}) {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <div className="flex items-center justify-end gap-5 px-14 py-5">
        <ShowTypes />

        <button
          className="btn txt-shadow bg-slate-700 text-xl shadow-md dark:bg-slate-700"
          onClick={() => setShowFilter(!showFilter)}
        >
          <BiFilter />
          Filter
        </button>

        <Link
          href="/create"
          className="btn btn-green txt-shadow text-xl shadow-md"
        >
          + Create
        </Link>
      </div>

      {showFilter && (
        <Filter
          money={money}
          moneyList={moneyList}
          setMoneyList={setMoneyList}
        />
      )}
    </>
  );
}
