"use client";

import { getColor, TYPES } from "@/lib/constants";
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
          {TYPES.map((type, index) => (
            <div className="flex items-center gap-2" key={index}>
              <div {...getStyle(type)}></div>
              <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-blue text-lg" onClick={() => setShow(!show)}>
        {show ? <FaArrowRight /> : <FaArrowLeft />}
        Show Types
      </button>
    </div>
  );
}
