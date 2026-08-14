"use client";

import { askAuraAI } from "../lib/api/chat";
import { useAnalysisStore } from "../store/analysis-store";
import { useChatStore } from "../store/chat-store";
import { useChatSessionStore } from "../hooks/chat-session-store";

export function useChat() {
  const { analysis } = useAnalysisStore();

  const current = useChatSessionStore((state) => state.current);

  const addUserMessage = useChatStore(
    (state) => state.addUserMessage,
  );

  const addAssistantMessage = useChatStore(
    (state) => state.addAssistantMessage,
  );

  const setLoading = useChatStore(
    (state) => state.setLoading,
  );

  async function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    if (!current) {
      alert("Please start a new analysis first.");
      return;
    }

    if (!analysis) {
      alert("No analysis found. Please upload a dataset first.");
      return;
    }

    // IMPORTANT:
    // Save user message inside CURRENT SESSION
    addUserMessage(current, trimmedQuestion);

    setLoading(true);

    try {
      const response = await askAuraAI({
        question: trimmedQuestion,
        headers: analysis.headers,
        preview: analysis.preview,
        intelligence: analysis.intelligence,
      });

      // IMPORTANT:
      // Save AI response inside SAME SESSION
      addAssistantMessage(current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.explanation,
        sql: response.sql,
        rows: response.rows,
        columns: response.columns,
        chart: response.chart,
        insight: response.insight,
        executive: response.executive,
        business_metrics: response.business_metrics,
        narrative: response.narrative,
        root_cause: response.root_cause,
        suggestions: response.suggestions,
      });
    } catch (error) {
      addAssistantMessage(current, {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error
            ? error.message
            : "Aura could not complete this analysis. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    sendQuestion,
  };
}