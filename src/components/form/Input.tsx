import { cn } from "@/lib/cn";
import Label from "./Label";
import Wrapper from "./Wrappar";

export interface Props {
  label: string;
  type?: string;
  name?: string;
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  defaultValue?: string | number;
  readOnly?: boolean;
  autoFocus?: boolean;
  className?: string;
  onChange?: any; // TODO
}

export default function Input({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required,
  disabled,
  defaultValue,
  readOnly,
  autoFocus,
  className,
  onChange,
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
          defaultValue
            ? defaultValue
            : value
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
        onChange={onChange}
      />
    </Wrapper>
  );
}
