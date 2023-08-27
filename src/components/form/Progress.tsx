import { useFileUploadProgressStore } from "@/stores/fileUploadProgress";
import React from "react";

export default function Progress() {
  const { progress } = useFileUploadProgressStore();

  return (
    <div className="my-8 flex w-full flex-col items-center gap-4">
      <p className="text-xl font-bold max-[1000px]:text-lg max-[600px]:text-base">
        Uploading File{" "}
        <span className="text-mainColor">{Math.round(progress)}%</span>
      </p>

      <div className="relative mx-auto my-2 flex w-[80%] justify-start">
        <div
          className="bg-main-gradient absolute left-0 top-0 z-10 h-3 rounded-md"
          style={{ width: `${progress}%` }}
        ></div>
        <div className="absolute left-0 top-0 h-3 w-full rounded-md bg-slate-600"></div>
      </div>
    </div>
  );
}
