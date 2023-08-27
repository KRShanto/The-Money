"use client";

import { useRouter } from "next/navigation";

export default function ForgotLink() {
  const router = useRouter();

  const handler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Get the form
    // Get the input[name="email"]
    // Get the value of the input
    const email = e.currentTarget.form?.email.value;

    if (email) {
      router.push(`/forgot?email=${email}`);
    } else {
      router.push("/forgot");
    }
  };

  return (
    <button type="button" onClick={handler}>
      Forgot Password
    </button>
  );
}
