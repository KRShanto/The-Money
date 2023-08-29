"use client"

import { MoneyType } from "@/types/money";
import React, { useState } from "react";
import Header from "./Header";

export default function DisplayMoney({ money }: { money: MoneyType[] }) {
  const [moneyList, setMoneyList] = useState(money);

  return (
    <Header money={money} moneyList={moneyList} setMoneyList={setMoneyList} />
  );
}
