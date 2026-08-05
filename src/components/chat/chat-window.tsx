"use client";

import { useEffect, useRef } from "react";

import ChatMessage from "./chat-message";
import Typing from "./typing";

import { useChatStore } from "../../store/chat-store";

export default function ChatWindow() {

  const {
    messages,
    loading,
  } = useChatStore();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages, loading]);

  return (

    <div className="min-h-0 flex-1 overflow-y-auto bg-slate-50 p-6">

      <div className="mx-auto flex max-w-5xl flex-col gap-6">

        {messages.map((message) => (

          <ChatMessage
            key={message.id}
            role={message.role}
            content={message.content}
            sql={message.sql}
            rows={message.rows}
            columns={message.columns}
            chart={message.chart}
          />

        ))}

        {loading && <Typing />}

        <div ref={bottomRef} />

      </div>

    </div>

  );
}