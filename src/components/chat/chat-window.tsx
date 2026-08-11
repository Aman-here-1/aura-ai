"use client";

import { useEffect, useRef } from "react";
import { BarChart3, Database, Sparkles } from "lucide-react";

import ChatMessage from "./chat-message";
import Typing from "./typing";

import { useChatStore } from "../../store/chat-store";

export default function ChatWindow() {
  const { messages, loading } = useChatStore();

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
        {isEmpty && !loading && (
          <div className="flex min-h-[420px] flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 ring-1 ring-cyan-400/20">
              <Sparkles size={29} className="text-cyan-300" />
            </div>

            <p className="mt-6 text-2xl font-semibold text-white">
              What would you like to analyse?
            </p>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Ask Aura about revenue, performance trends, key drivers, or
              opportunities in your uploaded dataset.
            </p>

            <div className="mt-8 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left">
                <BarChart3 size={19} className="text-cyan-400" />
                <p className="mt-4 text-sm font-medium text-slate-100">
                  Analyse performance
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  “What are the biggest revenue trends?”
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 text-left">
                <Database size={19} className="text-violet-400" />
                <p className="mt-4 text-sm font-medium text-slate-100">
                  Explore the data
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  “Which segments need attention?”
                </p>
              </div>
            </div>
          </div>
        )}

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
            suggestions={message.suggestions}
          />
        ))}

        {loading && <Typing />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}