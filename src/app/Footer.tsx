import { SITE_NAME } from "@/lib/constants";
import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen bg-bgColorLight p-4 text-center">
      <p className="text-lg text-white">
        &copy; 2023 {SITE_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
