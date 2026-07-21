"use client";

import { useState } from "react";

import UploadZone from "./upload-zone";
import FilePreview from "./file-preview";

export default function UploadPageContent() {
  const [file, setFile] = useState<File>();

  return (
    <div className="space-y-6">
      <UploadZone onFileSelect={setFile} />

      {file && (
        <FilePreview file={file} />
      )}
    </div>
  );
}