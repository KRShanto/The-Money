import { MoneyType } from "@/types/money";
import { BiFilter } from "react-icons/bi";

export default function Filter({
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
    <button className="btn txt-shadow bg-slate-700 text-2xl shadow-md dark:bg-slate-700">
      <BiFilter />
      Filter
    </button>
  );
}
