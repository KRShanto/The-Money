"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import Wrappar from "./Wrappar";
import { cn } from "@/lib/cn";

export interface InputProps {
  label: string;
  name?: string;
  defaultSrc?: string;
  defaultFileLocation?: string;
}

// TODO: Style this component
export default function File({
  label,
  name,
  defaultSrc,
  defaultFileLocation,
}: InputProps) {
  const [file, setFile] = useState<any>(null);
  const [active, setActive] = useState(defaultFileLocation ? true : false);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    setActive(true);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    useFsAccessApi: false,
  });

  return (
    <Wrappar
      className={cn(
        "my-4 flex cursor-pointer flex-col items-center gap-4 rounded-md border-[0.2rem] border-dashed border-slate-500 p-4 text-center text-lg font-bold max-[1000px]:text-base max-[600px]:text-sm",
        { "border-mainColor text-mainColor": isDragActive || active },
      )}
    >
      <section>
        <div {...getRootProps()}>
          <input {...getInputProps()} name={name} />
          {file ? (
            // if the file is an image
            file.type.startsWith("image") ? (
              <div className="flex flex-col items-center gap-3">
                <Image
                  src={URL.createObjectURL(file)}
                  alt="File"
                  width="200"
                  height="200"
                />
                <p>{file.name}</p>
                <p>{Math.round(file.size / 1000000)} MB</p>
              </div>
            ) : (
              <div>
                <p>{file.name}</p>
                <p>{Math.round(file.size / 1000000)} MB</p>
              </div>
            )
          ) : defaultSrc ? (
            <Image src={defaultSrc} alt="File" width="200" height="200" />
          ) : defaultFileLocation ? (
            <p>A file has been uploaded. Click here to replace it with a new</p>
          ) : (
            <p>
              Drag {label} here, or click to select {label}
            </p>
          )}
        </div>
      </section>
    </Wrappar>
  );
}
