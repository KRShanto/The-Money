import { getMoneyInfo } from "../../actions/getMoneyInfo";
import Popup from "@/components/Popup";
import UserItem from "@/components/UserItem";
import { getColor } from "@/lib/constants";
import { usePopupStore } from "@/stores/popup";
import { MoneyTypeTYpe } from "@/types/money";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Input from "@/components/form/Input";
import FormError from "@/components/form/FormError";
import { returnMoney } from "./returnMoney";
import { useFormErrorStore } from "@/stores/formError";

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
  const { data, closePopup } = usePopupStore();
  const { id } = data;
  const [info, setInfo] = useState<InfoType | null>();
  const { showError } = useFormErrorStore();

  // NOTE: returnMoney is for both returning and taking money.
  const [returnMoneyUI, setReturnMoneyUI] = useState(false);
  const [returnMoneyAmount, setReturnMoneyAmount] = useState<number>();
  const [returnMoneyDate, setReturnMoneyDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    getDetails();
  }, [id]);

  async function getDetails() {
    const info = await getMoneyInfo(id);
    setInfo(info as InfoType);
    setReturnMoneyAmount(info.amount);
  }

  async function returnMoneySubmit() {
    const res = await returnMoney({
      id,
      amount: returnMoneyAmount!,
      date: new Date(returnMoneyDate),
    });

    if (res.error) {
      showError(res.error);
    } else {
      closePopup();
    }
  }

  return (
    <Popup title="Money Details" crossIcon>
      <div className="w-[40rem]">
        {info && (
          <div>
            <h3 className="text-center text-xl">{info.summury}</h3>

            {returnMoneyUI ? (
              <div>
                <div className="my-5 flex gap-10">
                  <Input
                    label={
                      info.type === "loan"
                        ? "Take Money Amount"
                        : "Return Money Amount"
                    }
                    type="number"
                    autoFocus
                    value={returnMoneyAmount!}
                    onChange={(e: any) => setReturnMoneyAmount(e.target.value)}
                  />
                  <Input
                    label="Date"
                    type="date"
                    value={returnMoneyDate}
                    onChange={(e: any) => setReturnMoneyDate(e.target.value)}
                  />
                </div>

                <FormError />
              </div>
            ) : (
              <div>
                <div className="mt-5">
                  <h3 className="mb-3 text-lg font-semibold">User Name</h3>
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
                        <h3 className="mb-1 text-lg font-semibold">
                          Last Date
                        </h3>
                        <p>{moment(info.lastDate).format("DD MMMM, yy")}</p>
                      </div>

                      <div>
                        <h3 className="mb-1 text-lg font-semibold">
                          Days Left
                        </h3>
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

            {/* Options */}
            <div className="flex items-center justify-end gap-3">
              {returnMoneyUI ? (
                <React.Fragment>
                  <button
                    className="rounded-md border border-green-400 p-5 py-1 text-lg text-green-400 active:scale-95"
                    onClick={returnMoneySubmit}
                  >
                    Save
                  </button>
                  <button
                    className="rounded-md border border-slate-400 p-4 py-1 text-slate-400 active:scale-95"
                    onClick={() => {
                      setReturnMoneyUI(false);
                    }}
                  >
                    Cancel
                  </button>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {(info.type === "borrow" || info.type === "loan") && (
                    <button
                      className="rounded-md border border-green-400 p-4 py-1 text-green-400 active:scale-95"
                      onClick={() => setReturnMoneyUI(true)}
                    >
                      {info.type === "loan" ? "Take" : "Return"}
                    </button>
                  )}

                  <button className="rounded-md border border-blue-400 p-4 py-1 text-blue-400 active:scale-95">
                    Edit
                  </button>

                  <button className="rounded-md border border-red-500 p-4 py-1 text-red-500 active:scale-95">
                    Delete
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        )}
      </div>
    </Popup>
  );
}
