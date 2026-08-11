"use client";

import AppShell from "../../components/layout/app-shell";
import ChatInput from "../../components/chat/chat-input";
import ChatSidebar from "../../components/chat/sidebar";
import ChatWindow from "../../components/chat/chat-window";

export default function ChatPage() {
  return (
    <AppShell>
      <main className="min-h-[calc(100vh-96px)] py-6 lg:py-8">
        <section className="flex min-h-[calc(100vh-144px)] overflow-hidden rounded-[28px] border border-slate-800 bg-[#0B1120] shadow-2xl shadow-slate-950/20">
          <ChatSidebar />

          <div className="flex min-w-0 flex-1 flex-col bg-[#0F172A]">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 lg:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  Aura AI Analyst
                </p>
                <h1 className="mt-1 text-lg font-semibold text-white">
                  Business intelligence workspace
                </h1>
              </div>

              <div className="hidden items-center gap-2 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-sm text-slate-400">Analysis ready</span>
              </div>
            </div>

            <ChatWindow />
            <ChatInput />
          </div>
        </section>
      </main>
    </AppShell>
  );
}