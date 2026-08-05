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
  console.log("🔥 UPLOAD PAGE COMPONENT LOADED");

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
      console.log("========== START ==========");

      setLoading(true);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      console.log("STEP 1 : Uploading dataset...");

      const { data } = await axios.post(
        `${API_BASE_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("STEP 2 : Upload Success");
      console.log(data);

      setDataset(data);

      console.log("STEP 3 : Calling AI Report API");

      let aiReport = null;

      try {
        aiReport = await generateAIReport({
          headers: data.headers ?? [],
          intelligence: data.intelligence ?? {},
          kpis: data.kpis ?? {},
          preview: data.preview ?? [],
        });

        console.log("STEP 4 : AI Report Success");
        console.log(aiReport);
      } catch (err) {
        console.error("STEP 4 FAILED : AI Report Error");
        console.error(err);
      }

      console.log("STEP 5 : Saving Analysis Store");

      setAnalysis({
        headers: data.headers ?? [],
        preview: data.preview ?? [],
        intelligence: data.intelligence ?? {},
        kpis: data.kpis ?? {},

        charts: data.chart_data ?? {},

        recommendedCharts:
          data.recommended_charts ?? [],

        aiReport,
      });

      console.log("STEP 6 : Redirecting to /analysis");

      router.push("/analysis");

      console.log("========== END ==========");
    } catch (error: any) {
      console.error("UPLOAD FAILED");
      console.error(error);

      const message =
        error?.response?.data?.detail ??
        "Failed to analyze dataset.";

      setError(message);

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
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
                  Aura AI will generate KPIs,
                  Smart Charts,
                  AI Insights,
                  Executive Summary,
                  Recommendations,
                  Risks,
                  and a Complete Business Report.
                </p>
              </div>

              <button
                onClick={uploadFile}
                disabled={loading}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
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