"use client";

import { KeyboardEvent, useState } from "react";
import { SendHorizontal, Sparkles } from "lucide-react";

import { useChat } from "../../hooks/use-chat";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { sendQuestion } = useChat();

  async function sendMessage() {
    const question = message.trim();

    if (!question || isSending) {
      return;
    }

    setMessage("");
    setIsSending(true);

    try {
      await sendQuestion(question);
    } catch {
      setMessage(question);
    } finally {
      setIsSending(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="border-t border-slate-800 bg-[#0B1120]/95 p-4 backdrop-blur sm:p-5">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-lg shadow-slate-950/20 transition focus-within:border-cyan-400/60 focus-within:ring-2 focus-within:ring-cyan-400/10">
          <div className="flex items-end gap-2">
            <div className="flex min-w-0 flex-1 items-start gap-2 px-2 py-1">
              <Sparkles size={18} className="mt-2.5 shrink-0 text-cyan-300" />

              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                disabled={isSending}
                placeholder="Ask Aura about your business data..."
                className="max-h-36 min-h-10 w-full resize-none bg-transparent py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Ask Aura AI a question"
              />
            </div>

            <button
              type="button"
              onClick={() => void sendMessage()}
              disabled={!message.trim() || isSending}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-blue-950/30 transition hover:from-cyan-300 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Send question"
            >
              <SendHorizontal size={18} />
            </button>
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between px-1 text-[11px] text-slate-500">
          <span>AI answers are based on your uploaded dataset.</span>
          <span className="hidden sm:inline">Enter to send · Shift + Enter for a new line</span>
        </div>
      </div>
    </div>
  );
}