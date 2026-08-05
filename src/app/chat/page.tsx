"use client";

import AppShell from "../../components/layout/app-shell";

import ChatWindow from "../../components/chat/chat-window";
import ChatInput from "../../components/chat/chat-input";
import ChatSidebar from "../../components/chat/sidebar";

export default function ChatPage() {

  return (

    <AppShell>

      <div className="flex h-[calc(100vh-96px)] flex-col">

        <div className="mb-6">

          <h1 className="text-4xl font-bold text-slate-900">
            Chat With Aura AI
          </h1>

          <p className="mt-2 text-slate-500">
            Ask questions about your uploaded dataset using natural language.
          </p>

        </div>

        <div className="flex flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white">

          <ChatSidebar />

          <div className="flex min-h-0 flex-1 flex-col">

            <ChatWindow />

            <ChatInput />

          </div>

        </div>

      </div>

    </AppShell>

  );

}