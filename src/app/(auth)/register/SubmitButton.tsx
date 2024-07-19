"use client";

import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";
import { register } from "./register";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SubmitButton() {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handler = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await register({ name, email, password });

    if (res.error) {
      showError(res.error);
      return;
    }

    const res2 = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res2?.error) {
      showError(res2.error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return <Submit formAction={handler}>Register</Submit>;
}
