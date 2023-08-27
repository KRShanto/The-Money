import { cn } from "@/lib/cn";

export default function Wrappar({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("relative my-3 flex flex-col max-[600px]:my-2", className)}
    >
      {children}
    </div>
  );
}
