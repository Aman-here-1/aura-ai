"use client";

import { askAuraAI } from "../lib/api/chat";
import { useAnalysisStore } from "../store/analysis-store";
import { useChatStore } from "../store/chat-store";

export function useChat() {

  const { analysis } =
    useAnalysisStore();

  const {
    addUserMessage,
    addAssistantMessage,
    setLoading,
  } = useChatStore();

  const sendQuestion = async (
    question: string,
  ) => {

    console.log("========== CHAT DEBUG ==========");

    console.log("Question:", question);

    console.log("Analysis:", analysis);

    if (!analysis) {

      console.error("❌ Analysis is NULL");

      alert(
        "No analysis found. Please upload a dataset first.",
      );

      return;

    }

    addUserMessage(question);

    try {

      setLoading(true);

      console.log("🚀 Calling /api/chat...");

      const response =
        await askAuraAI({

          question,

          headers:
            analysis.headers,

          preview:
            analysis.preview,

          intelligence:
            analysis.intelligence,

        });

      console.log("✅ API Response");

      console.log(response);

      addAssistantMessage({

        id: crypto.randomUUID(),

        role: "assistant",

        content:
          response.explanation,

        sql:
          response.sql,

        rows:
          response.rows,

        columns:
          response.columns,

        chart:
          response.chart,

        insight:
          response.insight,

        executive:
          response.executive,

        business_metrics:
          response.business_metrics,

        root_cause:
          response.root_cause,

        suggestions:
          response.suggestions,

      });

      console.log(
        "✅ Assistant Message Added",
      );

    } catch (error) {

      console.error(
        "❌ Chat Error",
      );

      console.error(error);

      addAssistantMessage({

        id: crypto.randomUUID(),

        role: "assistant",

        content:
          error instanceof Error
            ? error.message
            : "Something went wrong.",

      });

    } finally {

      setLoading(false);

      console.log(
        "========== END ==========",
      );

    }

  };

  return {

    sendQuestion,

  };

}