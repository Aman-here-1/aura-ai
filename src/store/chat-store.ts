import { create } from "zustand";

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

/* ---------------------------------------
   Business Metrics
--------------------------------------- */

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

/* ---------------------------------------
   Narrative
--------------------------------------- */

export type Narrative = string;

/* ---------------------------------------
   Root Cause
--------------------------------------- */

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

/* ---------------------------------------
   Chat Message
--------------------------------------- */

export interface ChatMessage {

  id: string;

  role: "user" | "assistant";

  content: string;

  sql?: string;

  rows?: Record<string, unknown>[];

  columns?: string[];

  chart?: ChatChart | null;

  insight?: ChatInsight | null;

  executive?: ExecutiveSummary | null;

  business_metrics?: BusinessMetrics | null;

  narrative?: Narrative | null;

  root_cause?: RootCause | null;

  suggestions?: string[];

}

interface ChatState {

  messages: ChatMessage[];

  loading: boolean;

  addUserMessage: (
    message: string,
  ) => void;

  addAssistantMessage: (
    message: ChatMessage,
  ) => void;

  setLoading: (
    loading: boolean,
  ) => void;

  clearChat: () => void;

}

const initialAssistantMessage: ChatMessage = {

  id: crypto.randomUUID(),

  role: "assistant",

  content:
    "👋 Hi! I'm Aura AI.\nAsk me anything about your uploaded dataset.",

  suggestions: [],

};

export const useChatStore = create<ChatState>((set) => ({

  messages: [

    initialAssistantMessage,

  ],

  loading: false,

  addUserMessage: (
    message,
  ) =>

    set((state) => ({

      messages: [

        ...state.messages,

        {

          id: crypto.randomUUID(),

          role: "user",

          content: message,

        },

      ],

    })),

  addAssistantMessage: (
    message,
  ) =>

    set((state) => ({

      messages: [

        ...state.messages,

        message,

      ],

    })),

  setLoading: (
    loading,
  ) =>

    set({

      loading,

    }),

  clearChat: () =>

    set({

      loading: false,

      messages: [

        {

          id: crypto.randomUUID(),

          role: "assistant",

          content:
            "👋 Hi! I'm Aura AI.\nAsk me anything about your uploaded dataset.",

          suggestions: [],

        },

      ],

    }),

}));