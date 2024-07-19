import React from "react";
import { createResetToken } from "./createResetToken";
import SentEmail from "./SentEmail";
import ForgotForm from "./ForgotForm";

// Forgot password page
export default async function Page({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  const { email } = searchParams;
  let error;

  if (email) {
    const res = await createResetToken(email);

    if (res.error) {
      error = res.error;
    } else {
      return <SentEmail email={email} />;
    }
  }

  return <ForgotForm error={error} />;
}
