const API_URL = "http://127.0.0.1:8000";

export async function generateAIReport(data: {
  headers: string[];
  intelligence: Record<string, unknown>;
  kpis: Record<string, unknown>;
  preview: Record<string, unknown>[];
}) {
  const response = await fetch(`${API_URL}/api/ai/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to generate AI report");
  }

  return response.json();
}