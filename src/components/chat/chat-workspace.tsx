"use client";

import { useState } from "react";
import {
  ArrowUp,
  BarChart3,
  Database,
  MessageSquare,
  Plus,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

import { useDatasetStore } from "../../store/dataset-store";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const suggestions = [
  {
    title: "Analyse performance",
    description: "What are the biggest revenue trends?",
    icon: TrendingUp,
  },
  {
    title: "Explore the data",
    description: "Which regions need attention?",
    icon: Database,
  },
  {
    title: "Find opportunities",
    description: "What should the business focus on?",
    icon: BarChart3,
  },
];

export default function ChatWorkspace() {
  const { dataset } = useDatasetStore();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = (text?: string) => {
    const question = (text ?? input).trim();

    if (!question) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");

    setTimeout(() => {
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: dataset
          ? `I can analyse your uploaded dataset containing ${dataset.rows.toLocaleString()} records and ${dataset.columns} columns. AI-powered answers will be connected to your dataset in the next backend integration step.`
          : "Please upload a dataset first. Once your CSV or Excel file is uploaded, I can analyse its KPIs, trends, regions, products and business performance.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    }, 600);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="flex h-[calc(100dvh-120px)] min-h-[650px] overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl">

      {/* ================================================= */}
      {/* CONVERSATION SIDEBAR */}
      {/* ================================================= */}

      <aside className="hidden w-80 shrink-0 flex-col border-r border-slate-800 bg-[#0D1424] md:flex">

        <div className="border-b border-slate-800 p-5">

          <button
            type="button"
            onClick={clearChat}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:from-cyan-400 hover:to-blue-500"
          >
            <Plus size={18} />
            New analysis
          </button>

        </div>

        <div className="flex-1 overflow-y-auto p-4">

          <p className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
            Recent conversations
          </p>

          <button
            type="button"
            className="w-full rounded-xl border border-cyan-400/10 bg-slate-800/70 p-4 text-left transition hover:bg-slate-800"
          >
            <p className="text-sm font-semibold text-slate-200">
              New analysis
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Ask Aura about your business
            </p>
          </button>

        </div>

        <div className="border-t border-slate-800 p-4">

          <div className="flex items-center gap-2 text-xs text-slate-500">

            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,.6)]" />

            AI services online

          </div>

        </div>

      </aside>

      {/* ================================================= */}
      {/* MAIN CHAT */}
      {/* ================================================= */}

      <section className="flex min-w-0 flex-1 flex-col">

        {/* Header */}

        <header className="border-b border-slate-800 px-5 py-5 sm:px-7">

          <div className="flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-blue-950/30">

                <Sparkles
                  size={21}
                  className="text-white"
                />

              </div>

              <div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  Aura AI Analyst
                </p>

                <h1 className="text-xl font-bold text-white">
                  Business intelligence workspace
                </h1>

              </div>

            </div>

            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:flex">

              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs font-medium text-emerald-300">
                Analysis ready
              </span>

            </div>

          </div>

        </header>

        {/* ================================================= */}
        {/* CHAT BODY */}
        {/* ================================================= */}

        <div className="flex-1 overflow-y-auto">

          {messages.length === 0 ? (

            <div className="flex min-h-full flex-col items-center justify-center px-6 py-12">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/15 to-blue-500/20 ring-1 ring-cyan-400/20">

                <Sparkles
                  size={30}
                  className="text-cyan-300"
                />

              </div>

              <h2 className="mt-6 text-center text-3xl font-bold text-white">
                What would you like to analyse?
              </h2>

              <p className="mt-3 max-w-2xl text-center text-sm leading-6 text-slate-400">
                Ask Aura about revenue, performance trends,
                key drivers, anomalies, opportunities, or
                anything in your uploaded dataset.
              </p>

              {!dataset && (
                <div className="mt-5 rounded-xl border border-amber-400/20 bg-amber-400/5 px-4 py-3 text-center text-xs text-amber-300">
                  Upload a dataset to unlock data-driven analysis.
                </div>
              )}

              <div className="mt-8 grid w-full max-w-2xl gap-4 sm:grid-cols-3">

                {suggestions.map((suggestion) => {
                  const Icon = suggestion.icon;

                  return (
                    <button
                      key={suggestion.title}
                      type="button"
                      onClick={() =>
                        sendMessage(suggestion.description)
                      }
                      className="group rounded-2xl border border-slate-800 bg-[#0D1424] p-5 text-left transition-all duration-200 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-slate-900"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">

                        <Icon
                          size={18}
                          className="text-cyan-300"
                        />

                      </div>

                      <h3 className="mt-4 text-sm font-semibold text-slate-200">
                        {suggestion.title}
                      </h3>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {suggestion.description}
                      </p>

                    </button>
                  );
                })}

              </div>

            </div>

          ) : (

            <div className="mx-auto w-full max-w-4xl space-y-6 px-5 py-8">

              {messages.map((message) => (

                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600">

                      <Sparkles
                        size={17}
                        className="text-white"
                      />

                    </div>
                  )}

                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-7 ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        : "border border-slate-800 bg-[#111827] text-slate-300"
                    }`}
                  >
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-xs font-bold text-cyan-300">
                      AU
                    </div>
                  )}

                </div>

              ))}

            </div>

          )}

        </div>

        {/* ================================================= */}
        {/* INPUT */}
        {/* ================================================= */}

        <div className="border-t border-slate-800 bg-[#0D1424] p-4 sm:p-5">

          <div className="mx-auto max-w-4xl">

            <div className="relative flex items-end rounded-2xl border border-slate-700 bg-[#111827] p-2 transition focus-within:border-cyan-400/40 focus-within:ring-1 focus-within:ring-cyan-400/10">

              <MessageSquare
                size={19}
                className="mb-3 ml-2 shrink-0 text-cyan-400"
              />

              <textarea
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                rows={1}
                placeholder="Ask Aura about your business data..."
                className="max-h-32 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600"
              />

              {input && (
                <button
                  type="button"
                  onClick={() => setInput("")}
                  className="mb-2 mr-1 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-slate-300"
                >
                  <X size={15} />
                </button>
              )}

              <button
                type="button"
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <ArrowUp size={19} />
              </button>

            </div>

            <p className="mt-2 text-[11px] text-slate-600">
              AI answers are based on your uploaded dataset. Enter to send · Shift + Enter for a new line.
            </p>

          </div>

        </div>

      </section>

    </div>
  );
}