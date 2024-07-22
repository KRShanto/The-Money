"use client";

import Submit from "@/components/form/Submit";
import { useFormErrorStore } from "@/stores/formError";
import { editTemplate } from "./editTemplate";
import { useRouter } from "next/navigation";

export default function SubmitBtn({ id }: { id: string }) {
  const { showError } = useFormErrorStore();
  const router = useRouter();

  const handleSubmit = async (data: FormData) => {
    const res = await editTemplate({ id, data });

    if (res.error) {
      return showError(res.error);
    }

    // At the end, return back to the home page
    router.push("/template");
    router.refresh();
  };

  return <Submit formAction={handleSubmit}>Update</Submit>;
}
