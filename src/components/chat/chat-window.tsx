"use client";

import { useEffect, useRef } from "react";
import {
  BarChart3,
  Database,
  Sparkles,
} from "lucide-react";

import ChatMessage from "./chat-message";
import Typing from "./typing";

import { useChatStore } from "../../store/chat-store";
import { useChatSessionStore } from "@/src/hooks/chat-session-store";

// IMPORTANT:
// Never use [] directly inside Zustand selector.
// It creates a new reference on every snapshot.
const EMPTY_MESSAGES = [];

export default function ChatWindow() {
  const current = useChatSessionStore(
    (state) => state.current,
  );

  const messages = useChatStore(
    (state) =>
      current
        ? state.messagesBySession[current] ?? EMPTY_MESSAGES
        : EMPTY_MESSAGES,
  );

  const loading = useChatStore(
    (state) => state.loading,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const isEmpty = messages.length === 0;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-[#0F172A] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">

        {/* EMPTY CHAT */}
        {isEmpty && !loading && (
          <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">

            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 ring-1 ring-cyan-400/20">
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 blur-xl" />

              <Sparkles
                size={29}
                className="relative text-cyan-300"
              />
            </div>

            <p className="mt-6 text-2xl font-semibold tracking-tight text-white">
              What would you like to analyse?
            </p>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Ask Aura about revenue, performance trends,
              key drivers, anomalies, opportunities, or
              anything in your uploaded dataset.
            </p>

            <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-2">

              <button
                type="button"
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/30 hover:bg-slate-900"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                  <BarChart3
                    size={19}
                    className="text-cyan-400 transition-transform group-hover:scale-110"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-100">
                  Analyse performance
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  “What are the biggest revenue trends?”
                </p>
              </button>

              <button
                type="button"
                className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-violet-400/30 hover:bg-slate-900"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10">
                  <Database
                    size={19}
                    className="text-violet-400 transition-transform group-hover:scale-110"
                  />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-100">
                  Explore the data
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  “Which segments need attention?”
                </p>
              </button>

            </div>
          </div>
        )}

        {/* CHAT MESSAGES */}
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            sql={message.sql}
            rows={message.rows}
            columns={message.columns}
            chart={message.chart}
            insight={message.insight}
            executive={message.executive}
            business_metrics={message.business_metrics}
            narrative={message.narrative}
            root_cause={message.root_cause}
            suggestions={message.suggestions}
          />
        ))}

        {/* AI TYPING */}
        {loading && <Typing />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}