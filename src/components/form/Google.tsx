"use client";

import Image from "next/image";
import GoogleIcon from "/public/google.svg";
import { signIn } from "next-auth/react";

export default function Google() {
  return (
    <button
      type="button"
      className="btn input-provider"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Image src={GoogleIcon} alt="Google icon" width={30} height={30} />
      <span>Sign in with Google</span>
      {/* This div is just for making that span center */}
      <div></div>
    </button>
  );
}
