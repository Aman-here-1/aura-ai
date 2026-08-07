"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Loader2, ArrowRight } from "lucide-react";

import UploadZone from "./upload-zone";
import FilePreview from "./file-preview";

import { useDatasetStore } from "../../store/dataset-store";
import { useAnalysisStore } from "../../store/analysis-store";
import { generateAIReport } from "../../lib/api/ai";
import DashboardLoadingSkeleton from "../dashboard/dashboard-loading-skeleton";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const loadingMessages = [
  "Uploading your dataset...",
  "Reading your file...",
  "Calculating KPIs...",
  "Preparing charts...",
  "Generating AI insights...",
];

export default function UploadPageContent() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  // Local state: this controls the skeleton screen.
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seconds, setSeconds] = useState(0);

  const { setDataset, setLoading, setError } = useDatasetStore();
  const { setAnalysis } = useAnalysisStore();

  useEffect(() => {
    if (!isAnalyzing) {
      setSeconds(0);
      return;
    }

    const intervalId = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isAnalyzing]);

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a dataset first.");
      return;
    }

    const startTime = Date.now();

    try {
      // Skeleton appears immediately.
      setIsAnalyzing(true);
      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

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

      let aiReport = null;

      try {
        aiReport = await generateAIReport({
          headers: data.headers ?? [],
          intelligence: data.intelligence ?? {},
          kpis: data.kpis ?? {},
          preview: data.preview ?? [],
        });
      } catch (err) {
        console.error("AI Report Error:", err);
      }

      setAnalysis({
        headers: data.headers ?? [],
        preview: data.preview ?? [],
        intelligence: data.intelligence ?? {},
        kpis: data.kpis ?? {},
        charts: data.chart_data ?? {},
        recommendedCharts: data.recommended_charts ?? [],
        aiReport,
      });

      // Keeps skeleton visible briefly if API returns extremely fast.
      const elapsed = Date.now() - startTime;
      const minimumLoaderTime = 800;

      if (elapsed < minimumLoaderTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoaderTime - elapsed)
        );
      }

      router.push("/analysis");
    } catch (error: any) {
      console.error("Upload failed:", error);

      const message =
        error?.response?.data?.detail ??
        "Failed to analyze dataset. Please try again.";

      setError(message);
      alert(message);
    } finally {
      setIsAnalyzing(false);
      setLoading(false);
    }
  };

  const currentMessage =
    loadingMessages[
      Math.min(Math.floor(seconds / 3), loadingMessages.length - 1)
    ];

  return (
    <div className="space-y-8">
{isAnalyzing && (
  <DashboardLoadingSkeleton
    message={currentMessage}
    seconds={seconds}
  />
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
                  Aura AI will generate KPIs, charts, and insights.
                </p>
              </div>

              <button
                type="button"
                onClick={uploadFile}
                disabled={isAnalyzing}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isAnalyzing ? (
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