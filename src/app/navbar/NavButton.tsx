import React, { HTMLProps } from "react";

type NavButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset"; // Specify the valid types for the 'type' prop
} & HTMLProps<HTMLButtonElement>;

export default function NavButton({
  onClick,
  children,
  ...props
}: NavButtonProps) {
  return (
    <button
      className="flex items-center gap-2 text-xl transition-colors duration-300 ease-in-out hover:text-mainColor max-[1450px]:text-lg max-[1250px]:w-full max-[1250px]:px-8 max-[1250px]:py-4 max-[1250px]:pr-20 max-[1250px]:text-2xl"
      onClick={onClick}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
