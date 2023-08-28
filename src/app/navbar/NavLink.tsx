import { cn } from "@/lib/cn";
import Link from "next/link";
import React, { HTMLProps } from "react";

type NavButtonProps = {
  href: string;
  className?: string;
  children: React.ReactNode;
} & HTMLProps<HTMLAnchorElement>;

export default function NavLink({ href, className, children }: NavButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 text-xl transition-colors duration-300 ease-in-out hover:text-mainColor max-[1450px]:text-lg max-[1250px]:w-full max-[1250px]:px-8 max-[1250px]:py-4 max-[1250px]:pr-20 max-[1250px]:text-2xl",
        className,
      )}
    >
      {children}
    </Link>
  );
}
