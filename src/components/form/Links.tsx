import React from "react";

export default function Links({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center text-lg font-semibold text-mainColor max-[1000px]:text-base max-[600px]:text-sm [&>a:hover]:underline [&>button:hover]:underline">
      {children}
    </div>
  );
}
