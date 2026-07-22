"use client";

import { useState } from "react";
import axios from "axios";

import UploadZone from "./upload-zone";
import FilePreview from "./file-preview";
import { useDatasetStore } from "../../store/dataset-store";

export default function UploadPageContent() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { setDataset } = useDatasetStore();

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/upload",
        formData,
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );

      // Save API response globally
      setDataset(response.data);

      alert("Dataset analyzed successfully!");

      console.log("Backend Response:", response.data);

      // (Optional) Later we can redirect automatically
      // router.push("/dashboard");

    } catch (error) {
      console.error("Upload Error:", error);
      alert("Failed to analyze dataset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <UploadZone onFileSelect={setFile} />

      {file && (
        <>
          <FilePreview file={file} />

          <button
            onClick={uploadFile}
            disabled={loading}
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Analyzing Dataset..." : "Analyze Dataset"}
          </button>
        </>
      )}
    </div>
  );
}