"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { useRouter } from "next/navigation";

// TODO: improve this.
// TODO: use lottie for animation.
export default function Page() {
  const router = useRouter();

  return (
    <div className="mt-[15rem] flex flex-col items-center justify-center">
      <h2 className="text-5xl font-bold">404</h2>
      <p className="text-2xl">Page not found</p>

      <div className="mt-14 flex flex-col items-center gap-5">
        <button onClick={() => router.back()} className="btn btn-main">
          <FaBackward />
          Go back
        </button>

        <Link href="/" className="btn btn-main">
          <FaHome />
          Go back home
        </Link>
      </div>
    </div>
  );
}
