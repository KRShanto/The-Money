import { cn } from "@/lib/cn";
import React from "react";

export default function Label({
  htmlFor,
  className,
  children,
}: {
  htmlFor: string | undefined;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "mb-1 text-lg font-bold max-[1000px]:text-base max-[600px]:text-sm",
        className,
      )}
    >
      {children}
    </label>
  );
}
