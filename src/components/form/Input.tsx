import { cn } from "@/lib/cn";
import Label from "./Label";
import Wrapper from "./Wrappar";

export interface Props {
  label: string;
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
}

export default function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required,
  disabled,
  readOnly,
  autoFocus,
  className,
}: Props) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <input
        className={cn("input-styles", className)}
        type={type}
        name={name}
        id={name}
        defaultValue={
          value
            ? value
            : type === "number"
            ? 0
            : type === "date"
            ? new Date().toISOString().slice(0, 10)
            : ""
        }
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
      />
    </Wrapper>
  );
}
