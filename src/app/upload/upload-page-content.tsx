"use client";

import { useState } from "react";

import UploadZone from '../../components/dashboard/upload-zone';
import FilePreview from '../../components/dashboard/file-preview';
import DataPreview from "./data-preview";

import { readExcel } from '../../lib/excel';
import { validateDataset } from '../../lib/validator';
import type { ValidationResult } from '../../types/dataset';

export default function UploadPageContent() {
  const [file, setFile] = useState<File>();
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [validation, setValidation] =
    useState<ValidationResult | null>(null);

  async function handleFile(file: File) {
    setFile(file);

    const data = await readExcel(file);

    setHeaders(data.headers);
    setRows(data.rows);

    const validationResult = validateDataset(data.rows);
    setValidation(validationResult);
  }

  return (
    <div className="space-y-6">
      <UploadZone onFileSelect={handleFile} />

      {file && <FilePreview file={file} />}

      {rows.length > 0 && (
        <DataPreview
          headers={headers}
          rows={rows}
          validation={validation}
        />
      )}
    </div>
  );
}