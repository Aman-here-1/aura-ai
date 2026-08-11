"use client";

import {
  Plus,
} from "lucide-react";

import {
  useChatSessionStore,
} from "../../store/chat-session-store";

export default function Sidebar() {

  const {

    sessions,

    createSession,

    current,

    setCurrent,

  } =
    useChatSessionStore();

  return (

    <div className="w-72 border-r bg-white">

      <button
        onClick={
          createSession
        }
        className="m-4 flex w-[calc(100%-2rem)] items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-white"
      >

        <Plus size={18} />

        New Chat

      </button>

      <div>

        {sessions.map(
          (chat) => (

            <button
              key={chat.id}
              onClick={() =>
                setCurrent(
                  chat.id,
                )
              }
              className={`block w-full px-5 py-4 text-left ${
                current ===
                chat.id
                  ? "bg-blue-50"
                  : ""
              }`}
            >

              {chat.title}

            </button>

          ),
        )}

      </div>

    </div>

  );

}