import { MoneyType } from "@/types/money";
import Link from "next/link";
import Filter from "./Filter";

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
