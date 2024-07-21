import { SITE_NAME } from "@/lib/constants";
import React from "react";

export default function LandingPage() {
  return (
    <h1 className="my-14 text-center text-5xl font-bold">
      Welcome to <span className="text-golden-gradient">{SITE_NAME}</span>
    </h1>
  );
}
