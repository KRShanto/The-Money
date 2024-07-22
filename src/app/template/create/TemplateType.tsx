"use client";

import Label from "@/components/form/Label";
import { useState } from "react";

export default function TemplateType({
  defaultValue = "expense",
}: {
  defaultValue?: "profit" | "expense";
}) {
  const [type, setType] = useState<"profit" | "expense">(defaultValue);

  return (
    <div className="flex gap-10">
      {/* hidden input so that we can pass the type to server. */}
      <input type="hidden" name="type" value={type} />

      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="t"
          id="type-profit"
          className="h-4 w-4"
          checked={type === "profit"}
          onChange={() => setType("profit")}
        />
        <Label htmlFor="type-profit">Profit</Label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="radio"
          name="t"
          id="type-expense"
          className="h-4 w-4"
          checked={type === "expense"}
          onChange={() => setType("expense")}
        />
        <Label htmlFor="type-expense">Expense</Label>
      </div>
    </div>
  );
}
