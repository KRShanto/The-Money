"use client";

// @ts-ignore - Throws weird error. But works.
import { generate } from "generate-password";
import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import Label from "./Label";
import Wrappar from "./Wrappar";
import { cn } from "@/lib/cn";

interface Props {
  label: string;
  name?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  generator?: boolean;
}

export default function Password({
  label,
  name,
  className,
  placeholder,
  disabled,
  readOnly,
  autoFocus,
  generator = true,
}: Props) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function generatePassword() {
    setValue(
      generate({
        length: 15,
        lowercase: true,
        numbers: true,
        strict: true,
        symbols: true,
        uppercase: true,
      }),
    );
  }

  return (
    <Wrappar>
      <Label htmlFor={name}>{label}</Label>
      <div className="relative flex items-center">
        <input
          className={cn("input-styles", className)}
          value={value}
          type={showPassword ? "text" : "password"}
          name={name}
          id={name}
          placeholder={placeholder}
          required={true}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="absolute right-3 flex items-center gap-4">
          <button
            className="text-xl"
            type="button"
            title={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
          </button>

          {generator && (
            <button
              type="button"
              title="Generate strong password"
              onClick={generatePassword}
            >
              <FaKey />
            </button>
          )}
        </div>
      </div>
    </Wrappar>
  );
}
