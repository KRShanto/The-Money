"use client";

import React, { useEffect, useState } from "react";
import { usePopupStore } from "../stores/popup";
import { FaTimes } from "react-icons/fa";
import { cn } from "@/lib/cn";

export default function Popup({
  title,
  crossIcon = false,
  children,
}: {
  title?: string;
  crossIcon?: boolean;
  children: React.ReactNode;
}) {
  const [openNow, setOpenNow] = useState(false);
  const { shouldClose, closePopup, closeActually } = usePopupStore();

  // Open popup after 100ms to show the animation
  useEffect(() => {
    const id = setTimeout(() => {
      setOpenNow(true);
    }, 100);

    return () => clearTimeout(id);
  }, []);

  // Close popup after 400ms to show the animation
  useEffect(() => {
    const id = setTimeout(() => {
      if (shouldClose) closeActually();
    }, 400);

    return () => clearTimeout(id);
  }, [shouldClose]);

  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-screen w-screen bg-[#00000094]">
        <div
          className={cn(
            "absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-[150%] transform flex-col rounded-lg border border-slate-800 bg-bgColorLight px-8 py-4 opacity-0 transition-all duration-300 ease-in-out max-[600px]:w-[80%]",
            {
              "-translate-y-2/3 opacity-100": openNow,
              "-translate-y-[150%] opacity-0": shouldClose,
            },
          )}
        >
          {title && (
            <h1 className="text-main-gradient mb-4 mt-8 text-center text-3xl font-bold max-[1000px]:mb-2 max-[1000px]:mt-4 max-[1000px]:text-2xl">
              {title}
            </h1>
          )}

          {crossIcon && (
            <button
              className="absolute right-3 top-3 flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border-none bg-transparent p-0 text-2xl text-red-400 outline-none transition-colors duration-300 ease-in-out hover:bg-slate-700 max-[1000px]:h-10 max-[1000px]:w-10 max-[1000px]:text-xl"
              onClick={closePopup}
            >
              <FaTimes />
            </button>
          )}

          {children}
        </div>
      </div>
    </>
  );
}
