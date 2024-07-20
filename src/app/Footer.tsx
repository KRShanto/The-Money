import { SITE_NAME } from "@/lib/constants";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen flex-shrink-0 border-slate-600 bg-bgColorLight p-4 text-center dark:border-t">
      <p className="text-lg">&copy; 2023 {SITE_NAME}. All rights reserved.</p>
    </footer>
  );
}
