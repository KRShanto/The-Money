"use client";

import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";
import { edit } from "./edit";
import { useRouter } from "next/navigation";

export default function SubmitBtn({ id }: { id: string }) {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const res = await edit({
      data,
      id,
    });

    if (res.error) {
      return showError(res.error);
    }

    // At the end, return back to the home page
    router.push("/");
    router.refresh();
  };

  return <Submit formAction={handleSubmit}>Update</Submit>;
}
