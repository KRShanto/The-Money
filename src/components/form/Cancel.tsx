import { cn } from "@/lib/cn";
import Link from "next/link";

export default function Cancel({
  prev,
  className,
  children,
}: {
  prev: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Link
        href={prev}
        className={cn(
          "btn mt-4 w-40 bg-slate-700 py-2 text-lg max-[1000px]:text-base max-[600px]:text-sm",
          className,
        )}
      >
        {children}
      </Link>
    </div>
  );
}
