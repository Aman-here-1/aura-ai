"use client";

import {
  useState,
  KeyboardEvent,
} from "react";

import { SendHorizonal } from "lucide-react";

import { useChat } from "../../hooks/use-chat";

export default function ChatInput() {

  const [message, setMessage] =
    useState("");

  const {
    sendQuestion,
  } = useChat();

  const sendMessage = async () => {

    if (!message.trim()) {
      return;
    }

    const question = message;

    setMessage("");

    await sendQuestion(question);

  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {

    if (event.key === "Enter") {

      sendMessage();

    }

  };

  return (

    <div className="border-t border-slate-200 bg-white p-5">

      <div className="mx-auto flex max-w-5xl items-center gap-4">

        <input
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask anything about your data..."
          className="flex-1 rounded-2xl border border-slate-300 px-5 py-4 outline-none transition focus:border-blue-500"
        />

        <button
          onClick={sendMessage}
          className="rounded-2xl bg-blue-600 p-4 text-white transition hover:bg-blue-700"
        >

          <SendHorizonal
            size={22}
          />

        </button>

      </div>

    </div>

  );

}