"use client";

import {
  Bot,
  User,
} from "lucide-react";

import SQLViewer from "./sql-viewer";
import ResultTable from "./result-table";
import ChartViewer from "./chart-viewer";
import SuggestedQuestions from "./suggested-questions";
import MarkdownMessage from "./markdown-message";

import { useChat } from "../../hooks/use-chat";

interface Props {

  role: string;

  content: string;

  sql?: string;

  rows?: Record<string, unknown>[];

  columns?: string[];

  chart?: {
    type: string;
    x: string;
    y: string;
  } | null;

  suggestions?: string[];

}

export default function ChatMessage({
  role,
  content,
  sql,
  rows,
  columns,
  chart,
  suggestions,
}: Props) {

  const assistant =
    role === "assistant";

  const {
    sendQuestion,
  } = useChat();

  return (

    <div
      className={`flex ${
        assistant
          ? "justify-start"
          : "justify-end"
      }`}
    >

      <div
        className={`flex max-w-5xl gap-4 rounded-3xl p-5 shadow-sm ${
          assistant
            ? "bg-white"
            : "bg-blue-600 text-white"
        }`}
      >

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full ${
            assistant
              ? "bg-indigo-100"
              : "bg-blue-500"
          }`}
        >

          {assistant ? (

            <Bot
              size={20}
              className="text-indigo-600"
            />

          ) : (

            <User
              size={20}
              className="text-white"
            />

          )}

        </div>

        <div className="flex-1">

          <div
            className={`mb-2 text-sm font-semibold ${
              assistant
                ? "text-slate-900"
                : "text-blue-100"
            }`}
          >
            {assistant
              ? "Aura AI"
              : "You"}
          </div>

          <div
            className={`${
              assistant
                ? "text-slate-700"
                : "text-white"
            }`}
          >

            <MarkdownMessage
              content={content}
            />

          </div>

          {assistant && sql && (

            <div className="mt-6">

              <SQLViewer
                sql={sql}
              />

            </div>

          )}

          {assistant &&
            rows &&
            columns && (

              <div className="mt-6">

                <ResultTable
                  rows={rows}
                  columns={columns}
                />

              </div>

            )}

          {assistant &&
            chart &&
            rows && (

              <div className="mt-6">

                <ChartViewer
                  chart={chart}
                  rows={rows}
                />

              </div>

            )}

          {assistant &&
            suggestions &&
            suggestions.length > 0 && (

              <SuggestedQuestions
                suggestions={suggestions}
                onSelect={sendQuestion}
              />

            )}

        </div>

      </div>

    </div>

  );

}