"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface Props {
  onFileSelect(file: File): void;
}

export default function UploadZone({
  onFileSelect,
}: Props) {
  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length) {
      onFileSelect(accepted[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } =
    useDropzone({
      accept: {
        "text/csv": [".csv"],
        "application/vnd.ms-excel": [".xls"],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
          ".xlsx",
        ],
      },
      multiple: false,
      onDrop,
    });

  return (
    <div
      {...getRootProps()}
      className={`cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition ${
        isDragActive
          ? "border-blue-600 bg-blue-50"
          : "border-slate-300 bg-white"
      }`}
    >
      <input {...getInputProps()} />

      <UploadCloud
        className="mx-auto text-blue-600"
        size={50}
      />

      <h2 className="mt-5 text-2xl font-semibold">
        Drop your file here
      </h2>

      <p className="mt-3 text-slate-500">
        CSV, XLS or XLSX
      </p>
    </div>
  );
}