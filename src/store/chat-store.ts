import { create } from "zustand";

export interface ChatChart {
  type: string;
  x: string;
  y: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sql?: string;
  rows?: Record<string, unknown>[];
  columns?: string[];
  chart?: ChatChart | null;
  suggestions?: string[];
}

interface ChatState {
  messages: ChatMessage[];
  loading: boolean;

  addUserMessage: (message: string) => void;
  addAssistantMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
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
  messages: [initialAssistantMessage],

  loading: false,

  addUserMessage: (message) =>
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

  addAssistantMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),

  setLoading: (loading) =>
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