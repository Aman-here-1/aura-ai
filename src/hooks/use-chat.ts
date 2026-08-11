"use client";

import { askAuraAI } from "../lib/api/chat";
import { useAnalysisStore } from "../store/analysis-store";
import { useChatStore } from "../store/chat-store";

export function useChat() {
  const { analysis } = useAnalysisStore();

  const {
    addUserMessage,
    addAssistantMessage,
    setLoading,
  } = useChatStore();

  async function sendQuestion(question: string) {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    if (!analysis) {
      alert("No analysis found. Please upload a dataset first.");
      return;
    }

    addUserMessage(trimmedQuestion);
    setLoading(true);

    try {
      const response = await askAuraAI({
        question: trimmedQuestion,
        headers: analysis.headers,
        preview: analysis.preview,
        intelligence: analysis.intelligence,
      });

      addAssistantMessage({
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
      addAssistantMessage({
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