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
    <button className="btn dark-transparent dark:light-transparent txt-shadow text-2xl shadow-md">
      <BiFilter />
      Filter
    </button>
  );
}
