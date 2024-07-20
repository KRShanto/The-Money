"use client";

import { getColor } from "@/lib/constants";
import { MoneyTypeTYpe } from "@/types/money";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function getStyle(type: MoneyTypeTYpe) {
  return {
    className: "w-5 h-5 rounded-full",
    style: {
      backgroundColor: getColor(type),
    },
  };
}

export default function ShowTypes() {
  const [show, setShow] = useState(false);

  // TODO: add animations
  return (
    <div className="flex gap-5">
      {show && (
        <div className="flex gap-5 text-xl">
          <div className="flex items-center gap-2">
            <div {...getStyle("income")}></div>
            <p>Income</p>
          </div>

          <div className="flex items-center gap-2">
            <div {...getStyle("expense")}></div>
            <p>Expense</p>
          </div>

          <div className="flex items-center gap-2">
            <div {...getStyle("borrow")}></div>
            <p>Borrow</p>
          </div>

          <div className="flex items-center gap-2">
            <div {...getStyle("loan")}></div>
            <p>Loan</p>
          </div>
        </div>
      )}

      <button className="btn btn-blue text-lg" onClick={() => setShow(!show)}>
        {show ? <FaArrowRight /> : <FaArrowLeft />}
        Show Types
      </button>
    </div>
  );
}
