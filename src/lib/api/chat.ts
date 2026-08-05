const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://127.0.0.1:8000";

export interface ChatRequest {

  question: string;

  headers: string[];

  preview: Record<string, unknown>[];

  intelligence: Record<string, unknown>;

}

export interface ChatChart {

  type: string;

  x: string;

  y: string;

}

export interface ChatResponse {

  question: string;

  sql: string;

  rows: Record<string, unknown>[];

  columns: string[];

  chart: ChatChart | null;

  explanation: string;

  suggestions: string[];

}

export async function askAuraAI(
  payload: ChatRequest
): Promise<ChatResponse> {

  const response = await fetch(
    `${API_BASE_URL}/api/chat`,
    {

      method: "POST",

      headers: {

        "Content-Type":
          "application/json",

      },

      body: JSON.stringify(
        payload
      ),

    }
  );

  if (!response.ok) {

    let message =
      "Failed to process request.";

    try {

      const error =
        await response.json();

      message =
        error.detail ??
        error.message ??
        message;

    } catch {}

    throw new Error(message);

  }

  return await response.json();

}