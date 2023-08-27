import React from "react";

export default function Or() {
  return (
    <div className="my-4 flex items-center justify-center gap-4">
      <div className="h-[1px] w-full bg-themeColorLight"></div>
      <div className="text-xl font-bold max-[1000px]:text-lg max-[600px]:text-base">
        or
      </div>
      <div className="h-[1px] w-full bg-themeColorLight"></div>
    </div>
  );
}
