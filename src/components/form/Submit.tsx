"use client";

import { useFormErrorStore } from "@/stores/formError";
import { MAIN_COLOR } from "@/lib/constants";
import { useFileUploadProgressStore } from "@/stores/fileUploadProgress";
import Progress from "./Progress";
import { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";

export default function Submit({
  onClick,
  formAction,
  // whether to show the loader on submit
  showLoader = true,
  showProgress = true,
  tag,
  children,
}: {
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  formAction?: (formData: FormData) => void;
  showLoader?: boolean;
  showProgress?: boolean;
  tag?: string;
  children: React.ReactNode;
}) {
  const { clearError } = useFormErrorStore();
  const { progress, resetProgress, submitTag } = useFileUploadProgressStore();
  // Local spinner
  const [loading, setLoading] = useState(false);

  // reset on unmount
  useEffect(() => {
    return () => {
      resetProgress();
      clearError();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      {loading || (progress > 0 && tag === submitTag) ? (
        <>
          {showProgress && progress > 0 && <Progress />}
          {showLoader && loading && (
            <FadeLoader className="spinner" color={MAIN_COLOR} loading />
          )}
        </>
      ) : (
        <button
          onClick={async (e) => {
            clearError();
            resetProgress();

            if (onClick) {
              setLoading(true);
              // `await` is needed here to wait for the onClick handler to finish
              await onClick(e);
              setLoading(false);
            }
          }}
          formAction={async (formData: FormData) => {
            clearError();
            resetProgress();

            if (formAction) {
              setLoading(true);
              // `await` is needed here to wait for the formAction handler to finish
              await formAction(formData);
              setLoading(false);
            }
          }}
          className="btn btn-main mt-4 w-40 py-2 text-lg max-[1000px]:text-base max-[600px]:text-sm"
        >
          {children}
        </button>
      )}
    </div>
  );
}
