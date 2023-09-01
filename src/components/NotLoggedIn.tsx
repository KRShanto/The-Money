import Link from "next/link";
import React from "react";

export default function NotLoggedIn({ task }: { task: string }) {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-5">
      <h1 className="text-center text-5xl font-bold text-slate-400">
        You are not logged in
      </h1>

      <p className="text-center text-2xl text-slate-400">
        You need to be logged in to {task}
      </p>

      <Link href="/login" className="btn btn-main text-2xl">
        Login
      </Link>

      <Link href="/register" className="btn btn-main text-2xl">
        Create Account
      </Link>
    </div>
  );
}
