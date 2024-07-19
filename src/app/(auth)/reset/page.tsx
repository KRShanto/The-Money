"use client";

import { useState } from "react";
import { verifyResetToken } from "./verify";
import { useFormErrorStore } from "@/stores/formError";
import { useRouter } from "next/navigation";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import Submit from "@/components/form/Submit";
import { signIn } from "next-auth/react";
import Password from "@/components/form/Password";

export default function Page({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  const { showError } = useFormErrorStore();

  if (!token) {
    return <h1>Invalid token</h1>;
  }

  const handler = async (data: FormData) => {
    const password = data.get("password") as string;
    const passwordConfirmation = data.get("passwordConfirmation") as string;

    if (password !== passwordConfirmation) {
      showError("Passwords do not match");
      return;
    }

    const res = await verifyResetToken(token, password);

    if (res.error) {
      showError(res.error);
      return;
    }

    // login the user
    signIn("credentials", {
      email: res.email,
      password: password,
      callbackUrl: "/",
    });
  };

  return (
    <Form title="Reset password" fullStyle>
      <Password label="Password" name="password" />
      <Password label="Confirm password" name="passwordConfirmation" />

      <Submit formAction={handler}>Reset</Submit>
    </Form>
  );
}
