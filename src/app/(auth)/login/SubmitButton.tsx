"use client";

import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SubmitButton() {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handler = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      showError(res.error);
      return;
    }

    router.push("/");
    router.refresh();
  };

  return <Submit formAction={handler}>Submit</Submit>;
}
