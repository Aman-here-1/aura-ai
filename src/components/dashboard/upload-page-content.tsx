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
        },
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

      const elapsed = Date.now() - startTime;
      const minimumLoaderTime = 800;

      if (elapsed < minimumLoaderTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minimumLoaderTime - elapsed),
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
    <div className="flex flex-col gap-7 sm:gap-8 lg:gap-10">
      {/* =========================================================
          ANALYSIS LOADING
      ========================================================== */}

      {isAnalyzing && (
        <DashboardLoadingSkeleton
          message={currentMessage}
          seconds={seconds}
        />
      )}

      {/* =========================================================
          UPLOAD ZONE
      ========================================================== */}

      <section>
        <UploadZone onFileSelect={setFile} />
      </section>

      {/* =========================================================
          FILE PREVIEW + ANALYSIS ACTION
      ========================================================== */}

      {file && (
        <section className="flex flex-col gap-6">
          <FilePreview file={file} />

          <div className="rounded-3xl border border-slate-800 bg-[#0F172A] p-6 shadow-xl shadow-slate-950/20 sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              {/* Information */}

              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-cyan-400/20">
                    <Loader2
                      size={19}
                      className={
                        isAnalyzing
                          ? "animate-spin text-cyan-400"
                          : "text-cyan-400"
                      }
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Ready to Analyze
                    </h3>

                    <p className="text-xs text-slate-500">
                      Dataset prepared for Aura AI
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                  Aura AI will analyze your dataset and generate KPIs,
                  charts, business insights, anomalies and recommendations.
                </p>
              </div>

              {/* Action */}

              <button
                type="button"
                onClick={uploadFile}
                disabled={isAnalyzing}
                className="inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition-all duration-300 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0F172A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 size={19} className="animate-spin" />
                    Analyzing Dataset...
                  </>
                ) : (
                  <>
                    Analyze Dataset
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}