"use client";

// arrow icon
import { BiSolidDownArrow } from "react-icons/bi";
import Wrappar from "./Wrappar";
import { cn } from "@/lib/cn";
import Label from "./Label";

export default function Select({
  label,
  initialValue,
  values,
  name,
  direction = "column",
  value,
  setValue,
}: {
  label: string;
  initialValue: string;
  values: string[];
  name?: string;
  direction?: "row" | "column";
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <Wrappar
      className={cn({
        "flex-row items-center gap-4": direction === "row",
        "flex-col items-start gap-1": direction === "column",
      })}
    >
      <Label htmlFor={name}>{label}</Label>

      <div className="relative flex items-center">
        <select
          name={name}
          id={name}
          defaultValue={initialValue}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="focus:ring-primary cursor-pointer appearance-none rounded-md bg-bgColorLight px-4 py-3 pr-8 text-xl font-semibold transition-colors duration-300 hover:bg-bgColorLighter focus:bg-bgColorLighter max-[1000px]:text-lg max-[600px]:text-base"
        >
          {values.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>

        <BiSolidDownArrow className="pointer-events-none absolute right-3" />
      </div>
    </Wrappar>
  );
}
