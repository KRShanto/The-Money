import Label from "./Label";
import Wrappar from "./Wrappar";

export interface Props {
  label: string;
  name?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  height?: string;
  resize?: "none" | "vertical" | "horizontal" | "both";
  children?: React.ReactNode;
}

export default function TextArea({
  label,
  name,
  className,
  placeholder,
  required,
  disabled,
  readOnly,
  autoFocus,
  height = "15rem",
  resize = "none",
  children,
}: Props) {
  return (
    <Wrappar>
      <Label htmlFor={name}>{label}</Label>
      <textarea
        className="input-styles"
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
        style={{
          height,
          resize,
        }}
      />
      {children}
    </Wrappar>
  );
}
