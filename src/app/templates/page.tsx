import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-end gap-5 px-14 py-5">
        <Link
          href="/saved/create"
          className="btn btn-green txt-shadow text-xl shadow-md"
        >
          + Create
        </Link>
      </div>
    </div>
  );
}
