"use client";

import { useEffect, useState } from "react";
import { createResetToken } from "./createResetToken";
import SentEmail from "./SentEmail";
import Form from "@/components/form/Form";
import Input from "@/components/form/Input";
import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";

export default function ForgotForm({ error }: { error: string | undefined }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { showError } = useFormErrorStore();

  useEffect(() => {
    if (error) {
      showError(error);
    }
  }, [error]);

  const handler = async (data: FormData) => {
    const email = data.get("email") as string;
    const res = await createResetToken(email);

    if (res.error) {
      showError(res.error);
      return;
    }

    setEmail(email);
    setSent(true);
  };

  if (sent) {
    return <SentEmail email={email} />;
  }

  return (
    <Form title="Forgot password" fullStyle>
      <Input label="Email address" type="email" name="email" required />

      <Submit formAction={handler} showLoader={false}>
        Reset
      </Submit>
    </Form>
  );
}
