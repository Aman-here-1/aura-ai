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
  title?: string;
}

export interface ChatInsight {
  summary: string;
  insights: string[];
  recommendations: string[];
  risks: string[];
  next_actions: string[];
}

export interface ExecutiveKPI {
  title: string;
  value: number;
  display_value: string;
  trend: string;
  change: number;
}

export interface ExecutiveHealth {
  status: string;
  score: number;
  color: string;
  rows: number;
  columns: number;
  missing_values: number;
  duplicate_rows: number;
  message: string;
}

export interface ExecutiveSummary {
  summary: string;
  highlights: string[];
  health: ExecutiveHealth;
  kpis: ExecutiveKPI[];
}

export interface BusinessMetric {
  title: string;
  value: number;
  formatted_value: string;
  unit: string;
  trend: string;
  description: string;
}

export interface BusinessMetrics {
  metrics: BusinessMetric[];
}

export type Narrative = string;

export interface VarianceAnalysis {
  previous_period: number;
  current_period: number;
  change: number;
  change_percent: number;
  direction: string;
}

export interface Contributor {
  name: string;
  value: number;
  percentage: number;
}

export interface ContributionAnalysis {
  total: number;
  top_contributor: Contributor | null;
  bottom_contributor: Contributor | null;
  top_10: Contributor[];
  bottom_10: Contributor[];
}

export interface Driver {
  column: string;
  correlation: number;
  strength: string;
  direction: string;
}

export interface DriverAnalysis {
  summary: string;
  top_driver: Driver | null;
  drivers: Driver[];
}

export interface Statistics {
  mean: number;
  median: number;
  std: number;
  min: number;
  max: number;
  lower_bound: number;
  upper_bound: number;
}

export interface Outlier {
  index: number;
  value: number;
}

export interface AnomalyAnalysis {
  summary: string;
  severity: string;
  count: number;
  outliers: Outlier[];
  statistics: Statistics;
}

export interface RootCause {
  metric: string;
  summary: string;
  variance: VarianceAnalysis | null;
  contribution: ContributionAnalysis | null;
  drivers: DriverAnalysis | null;
  anomalies: AnomalyAnalysis | null;
  recommendations: string[];
}

export interface ChatResponse {
  question: string;
  sql: string | null;
  rows: Record<string, unknown>[];
  columns: string[];
  chart: ChatChart | null;
  explanation: string;
  insight: ChatInsight | null;
  executive: ExecutiveSummary | null;
  business_metrics: BusinessMetrics | null;
  narrative: Narrative | null;
  root_cause: RootCause | null;
  suggestions: string[];
}

export async function askAuraAI(
  payload: ChatRequest,
): Promise<ChatResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(
      "Unable to reach Aura AI. Check that the backend server is running.",
    );
  }

  if (!response.ok) {
    let message = "Aura AI could not process this request.";

    try {
      const errorResponse: unknown = await response.json();

      if (
        typeof errorResponse === "object" &&
        errorResponse !== null
      ) {
        const error = errorResponse as {
          detail?: unknown;
          message?: unknown;
        };

        if (typeof error.detail === "string") {
          message = error.detail;
        } else if (typeof error.message === "string") {
          message = error.message;
        }
      }
    } catch {
      // The backend did not return a JSON error body.
    }

    throw new Error(message);
  }

  try {
    return (await response.json()) as ChatResponse;
  } catch {
    throw new Error("Aura AI returned an invalid response. Please try again.");
  }
}