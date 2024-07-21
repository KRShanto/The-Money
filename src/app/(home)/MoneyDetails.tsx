import { getMoneyInfo } from "../../actions/getMoneyInfo";
import Popup from "@/components/Popup";
import UserItem from "@/components/UserItem";
import { getColor } from "@/lib/constants";
import { usePopupStore } from "@/stores/popup";
import { MoneyTypeTYpe } from "@/types/money";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";

interface InfoType {
  type: MoneyTypeTYpe;
  description: string;
  amount: number;
  date: Date;
  lastDate?: Date;
  oppositeUser: {
    id?: string;
    name: string;
    type: "user" | "custom";
    isFriend: boolean;
    image?: string;
  };
  summury: string;
}

export default function MoneyDetails() {
  const { data } = usePopupStore();
  const { id } = data;
  const [info, setInfo] = useState<InfoType | null>();

  async function getDetails() {
    const info = await getMoneyInfo(id);
    setInfo(info as InfoType);
  }

  useEffect(() => {
    getDetails();
  }, [id]);

  return (
    <Popup title="Money Details" crossIcon>
      <div className="w-[40rem]">
        {info && (
          <div>
            <h3 className="text-center text-xl">{info.summury}</h3>

            <div className="mt-5">
              <h3 className="mb-3 text-lg font-semibold">User Name</h3>
              {/* TODO: if its a deposit, then don't use UserItem, use custom */}
              {info.oppositeUser.type === "user" ? (
                <Link href={`/user/${info.oppositeUser.id}`}>
                  <UserItem
                    user={info.oppositeUser as any}
                    className="transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
                  />
                </Link>
              ) : (
                <UserItem user={info.oppositeUser as any} />
              )}
            </div>

            <div className="mt-5">
              <h3 className="mb-1 text-lg font-semibold">Type</h3>
              <div className="flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: getColor(info.type) }}
                ></div>
                <p>{info.type.toLocaleUpperCase()}</p>
              </div>
            </div>

            <div className="mt-5">
              <h3 className="mb-1 text-lg font-semibold">Amount</h3>
              <p>$ {info.amount}</p>
            </div>

            <div className="mt-5">
              <h3 className="mb-1 text-lg font-semibold">Description</h3>
              <p>{info.description}</p>
            </div>

            <div className="mt-5 flex gap-20">
              <div>
                <h3 className="mb-1 text-lg font-semibold">Date</h3>
                <p>{moment(info.date).format("DD MMMM, yy")}</p>
              </div>

              {info.lastDate && (
                <>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Last Date</h3>
                    <p>{moment(info.lastDate).format("DD MMMM, yy")}</p>
                  </div>

                  <div>
                    <h3 className="mb-1 text-lg font-semibold">Days Left</h3>
                    <p>
                      {
                        // TODO:
                        "3 days"
                      }
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
}
