"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, ArrowRight } from "lucide-react";

import UploadZone from "./upload-zone";
import FilePreview from "./file-preview";

import { useDatasetStore } from "../../store/dataset-store";
import { useAnalysisStore } from "../../store/analysis-store";
import { generateAIReport } from "../../lib/api/ai";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export default function UploadPageContent() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const {
    setDataset,
    setLoading,
    loading,
    setError,
  } = useDatasetStore();

  const { setAnalysis } = useAnalysisStore();

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a dataset first.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      // Step 1: Dataset upload and analysis
      const { data } = await axios.post(
        `${API_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setDataset(data);

      // Step 2: Generate AI report
      let aiReport = null;

      try {
        aiReport = await generateAIReport({
          headers: data.headers ?? [],
          intelligence: data.intelligence ?? {},
          kpis: data.kpis ?? {},
          preview: data.preview ?? [],
        });
      } catch (err) {
        // Dataset analysis should still open even if AI report fails.
        console.error("AI Report Error:", err);
      }

      // Step 3: Save complete analysis data
      setAnalysis({
        headers: data.headers ?? [],
        preview: data.preview ?? [],
        intelligence: data.intelligence ?? {},
        kpis: data.kpis ?? {},
        charts: data.chart_data ?? {},
        recommendedCharts: data.recommended_charts ?? [],
        aiReport,
      });

      router.push("/analysis");
    } catch (error: any) {
      console.error("Upload failed:", error);

      const message =
        error?.response?.data?.detail ??
        "Failed to analyze dataset. Please try again.";

      setError(message);
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Full-page loader: shown immediately after Analyze Dataset is clicked */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4 backdrop-blur-sm">
          <div className="flex w-full max-w-md flex-col items-center rounded-3xl bg-white p-8 text-center shadow-2xl">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50">
              <Loader2 size={34} className="animate-spin text-blue-600" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-slate-900">
              Analyzing your dataset...
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Uploading your file, calculating KPIs, preparing smart charts,
              and generating AI insights. This may take a moment.
            </p>

            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
            </div>

            <p className="mt-3 text-xs font-medium text-slate-400">
              Please do not close this page.
            </p>
          </div>
        </div>
      )}

      <UploadZone onFileSelect={setFile} />

      {file && (
        <div className="space-y-6">
          <FilePreview file={file} />

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Ready to Analyze
                </h3>

                <p className="mt-2 text-slate-500">
                  Aura AI will generate KPIs, Smart Charts, AI Insights,
                  Executive Summary, Recommendations, Risks, and a Complete
                  Business Report.
                </p>
              </div>

              <button
                type="button"
                onClick={uploadFile}
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Analyzing Dataset...
                  </>
                ) : (
                  <>
                    Analyze Dataset
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}