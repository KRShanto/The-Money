import { MoneyType } from "@/types/money";
import Link from "next/link";
import Filter from "./Filter";
import ShowTypes from "./ShowTypes";

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
  return (
    <div className="flex items-center justify-end gap-5 px-14 py-5">
      <ShowTypes />
      <Filter money={money} moneyList={moneyList} setMoneyList={setMoneyList} />

      <Link
        href="/create"
        className="btn btn-green txt-shadow text-2xl shadow-md"
      >
        + Create
      </Link>
    </div>
  );
}
