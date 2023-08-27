import React from "react";

export default function FailedReset({ error }: { error: string }) {
  return (
    <div>
      <h1>Failed to reset password</h1>
      <p>{error}</p>
    </div>
  );
}
