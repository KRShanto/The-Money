import React from "react";

export default function Label({
  htmlFor,
  children,
}: {
  htmlFor: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 text-lg font-bold max-[1000px]:text-base max-[600px]:text-sm"
    >
      {children}
    </label>
  );
}
