"use client";

import Label from "./Label";
import Wrappar from "./Wrappar";

export default function Checkbox({
  label,
  name,
  value,
  setValue,
}: {
  label: string;
  name?: string;
  value: boolean;
  setValue: (value: boolean) => void;
}) {
  return (
    <Wrappar className="flex-row items-center gap-3">
      <input
        className="h-5 w-5"
        type="checkbox"
        id={label}
        name={name}
        checked={value}
        onChange={(e) => setValue(e.target.checked)}
      />
      <Label htmlFor={label}>{label}</Label>
    </Wrappar>
  );
}
