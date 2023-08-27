import React from "react";

export default function SentEmail({ email }: { email: string }) {
  return (
    <div className="my-40">
      <h1 className="text-center text-4xl font-bold text-green-500">
        Reset link sent
      </h1>
      <p className="mt-8 text-center text-2xl font-semibold">
        We have sent a reset link to <b>{email}</b>. Please check your inbox.
      </p>
    </div>
  );
}
