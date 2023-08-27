"use client";

import { useFormErrorStore } from "@/stores/formError";
import { Josefin_Sans } from "next/font/google";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const josefinSans = Josefin_Sans({ subsets: ["latin"] });

export default function Error({
  elementToScroll,
}: {
  elementToScroll?: string;
}) {
  const { error, clearError } = useFormErrorStore();

  useEffect(() => {
    if (error) {
      // Clear the error after 5 seconds
      setTimeout(() => {
        clearError();
      }, 5000);

      // Scroll to the top of the page
      if (elementToScroll) {
        const element = document.querySelector(elementToScroll);
        if (element) {
          element.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  }, [error]);

  if (!error) return <></>;

  return (
    <div className="my-4 flex w-full items-center justify-between rounded-md border border-red-600 bg-slate-950 px-8 py-4 text-center text-xl font-semibold text-red-600 max-[1000px]:text-lg max-[600px]:text-base">
      <p style={josefinSans.style}>{error}</p>

      <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ease-in-out hover:bg-red-900">
        <FaTimes onClick={clearError} />
      </div>
    </div>
  );
}
