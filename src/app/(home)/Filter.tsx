import { cn } from "@/lib/cn";
import { getColor, TYPES } from "@/lib/constants";
import { MoneyType, MoneyTypeTYpe } from "@/types/money";
import { useEffect, useState } from "react";
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
  const [selectedName, setSelectedName] = useState("");
  const [selectedType, setSelectedType] = useState<MoneyTypeTYpe | null>(null);

  const users = money.map((m) => m.oppositeUser);

  // Differenciate all the users
  const uniqueUsers = users.filter(
    (user, index, self) =>
      self.findIndex((u) => u.name === user.name) === index,
  );

  // filter money
  useEffect(() => {
    if (selectedName && selectedType) {
      setMoneyList(() =>
        money.filter((money) => {
          if (
            money.oppositeUser.name === selectedName &&
            money.type === selectedType
          )
            return true;
          return false;
        }),
      );
    } else if (selectedName) {
      setMoneyList(() =>
        money.filter((money) => {
          if (money.oppositeUser.name === selectedName) return true;

          return false;
        }),
      );
    } else if (selectedType) {
      setMoneyList(() =>
        money.filter((money) => {
          if (money.type === selectedType) return true;
          return false;
        }),
      );
    } else {
      setMoneyList(money);
    }
  }, [selectedName, selectedType]);

  return (
    <div className="mx-auto w-[80%]">
      <div>
        <h3 className="text-lg font-bold">Filter Users</h3>

        <div className="mt-2 flex flex-wrap gap-3">
          {uniqueUsers.map((user, index) => (
            <button
              key={index}
              className={cn(
                "flex items-center gap-2 rounded-md border p-1 px-3 text-lg transition-colors ",
                selectedName === user.name
                  ? "border-green-500 text-green-500"
                  : "border-slate-600 hover:border-slate-500",
              )}
              onClick={() =>
                setSelectedName(selectedName === user.name ? "" : user.name!)
              }
            >
              <p>{user.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mt-5 text-lg font-bold">Filter Types</h3>

        <div className="mt-2 flex gap-3">
          {TYPES.map((type, index) => (
            <button
              key={index}
              className={cn(
                "flex items-center gap-2 rounded-md border p-1 px-3 text-lg transition-colors",
                selectedType === type
                  ? "border-green-500 text-green-500"
                  : "border-slate-600 hover:border-slate-500",
              )}
              onClick={() =>
                setSelectedType(selectedType === type ? null : type)
              }
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: getColor(type),
                }}
              ></div>
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
