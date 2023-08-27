import Label from "./Label";
import Wrappar from "./Wrappar";

export default function Checkbox({
  label,
  name,
}: {
  label: string;
  name?: string;
}) {
  return (
    <Wrappar className="flex-row items-center gap-3">
      <input className="h-5 w-5" type="checkbox" id={label} name={name} />
      <Label htmlFor={label}>{label}</Label>
    </Wrappar>
  );
}
