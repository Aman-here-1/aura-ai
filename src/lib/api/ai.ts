const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export interface GenerateAIReportRequest {
  headers: string[];
  intelligence: Record<string, unknown>;
  kpis: Record<string, unknown>;
  preview: Record<string, unknown>[];
}

export interface AIReport {
  summary: string;
  insights: string[];
  recommendations: string[];
  risks: string[];
  actionPlan: string[];
}

async function request<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = "Something went wrong.";

    try {
      const error = await response.json();

      message =
        error.detail ??
        error.message ??
        message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
}

export async function generateAIReport(
  data: GenerateAIReportRequest
): Promise<AIReport> {
  return request<AIReport>("/api/ai/report", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function healthCheck() {
  return request("/health");
}

export interface UploadResponse {
  rows: number;
  columns: number;
  headers: string[];

  intelligence: {
    date_column: string | null;
    revenue_column: string | null;
    quantity_column: string | null;
    product_column: string | null;
    customer_column: string | null;
    region_column: string | null;
  };

  kpis: Record<string, unknown>;

  recommended_charts: unknown[];

  chart_data: Record<string, unknown>;

  preview: Record<string, unknown>[];
}

export async function uploadExcel(
  file: File
): Promise<UploadResponse> {

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/api/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {

    let message = "Upload failed.";

    try {

      const error = await response.json();

      message =
        error.detail ??
        error.message ??
        message;

    } catch {}

    throw new Error(message);
  }

  return response.json();
}