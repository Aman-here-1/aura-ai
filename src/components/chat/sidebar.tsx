"use client";

import { MessageSquarePlus, Sparkles } from "lucide-react";

import { useChatSessionStore } from "../../store/chat-session-store";

export default function Sidebar() {
  const { sessions, createSession, current, setCurrent } = useChatSessionStore();

  return (
    <aside className="hidden w-80 shrink-0 flex-col border-r border-slate-800 bg-[#0B1120] md:flex">
      <div className="border-b border-slate-800 p-5">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-950/40">
            <Sparkles size={18} className="text-white" />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Aura AI</p>
            <p className="text-xs text-slate-500">Business Analyst</p>
          </div>
        </div>

        <button
          type="button"
          onClick={createSession}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:from-cyan-400 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
        >
          <MessageSquarePlus size={17} />
          New analysis
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          Recent conversations
        </p>

        <div className="space-y-1">
          {sessions.map((chat) => {
            const isActive = current === chat.id;

            return (
              <button
                key={chat.id}
                type="button"
                onClick={() => setCurrent(chat.id)}
                className={`group relative w-full rounded-xl px-3 py-3 text-left transition ${
                  isActive
                    ? "bg-slate-800 text-white shadow-sm"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-100"
                }`}
              >
                {isActive && (
                  <span className="absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-cyan-400" />
                )}

                <span className="block truncate text-sm font-medium">
                  {chat.title}
                </span>

                <span
                  className={`mt-1 block text-xs ${
                    isActive ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  AI business analysis
                </span>
              </button>
            );
          })}
        </div>

        {sessions.length === 0 && (
          <div className="px-3 py-10 text-center">
            <p className="text-sm font-medium text-slate-300">
              No conversations yet
            </p>
            <p className="mt-2 text-xs leading-5 text-slate-500">
              Start a new analysis to explore your dataset.
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          AI services online
        </div>
      </div>
    </aside>
  );
}