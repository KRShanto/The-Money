"use client";

import Lottie from "lottie-react";
import EmailSendingAnimation from "@/../public/animations/email-sending.json";

export default function Loader() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80">
      <Lottie
        animationData={EmailSendingAnimation}
        loop={true}
        autoplay={true}
      />
    </div>
  );
}
