"use client";

import {
  Check,
  Clock3,
  MessageSquarePlus,
  MoreHorizontal,
  Pencil,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

import { useChatSessionStore } from "@/src/hooks/chat-session-store";
import { useChatStore } from "../../store/chat-store";

const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });
};

const getPreview = (
  messages: ReturnType<
    typeof useChatStore.getState
  >["messagesBySession"][string],
) => {
  if (!messages?.length) {
    return "Start a new business analysis";
  }

  const lastUserMessage = [...messages]
    .reverse()
    .find((message) => message.role === "user");

  if (lastUserMessage?.content) {
    return lastUserMessage.content;
  }

  return "AI business analysis";
};

export default function Sidebar() {
  const {
    sessions,
    current,
    createSession,
    setCurrent,
    renameSession,
    deleteSession,
  } = useChatSessionStore();

  const messagesBySession = useChatStore(
    (state) => state.messagesBySession,
  );

  const deleteChat = useChatStore((state) => state.deleteChat);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const [menuId, setMenuId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const sortedSessions = useMemo(() => {
    return [...sessions].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() -
        new Date(a.updatedAt).getTime(),
    );
  }, [sessions]);

  const handleNewChat = () => {
    createSession("New analysis");
    setMenuId(null);
  };

  const startRename = (
    id: string,
    title: string,
  ) => {
    setEditingId(id);
    setEditingTitle(title);
    setMenuId(null);
  };

  const saveRename = (id: string) => {
    const title = editingTitle.trim();

    if (title) {
      renameSession(id, title);
    }

    setEditingId(null);
    setEditingTitle("");
  };

  const cancelRename = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDelete = (id: string) => {
    deleteChat(id);
    deleteSession(id);

    setDeleteId(null);
    setMenuId(null);
  };

  const handleSelect = (id: string) => {
    setCurrent(id);
    setMenuId(null);
  };

  return (
    <>
      <aside className="hidden w-80 shrink-0 flex-col border-r border-slate-800/80 bg-[#0B1120] md:flex">
        {/* Header */}
        <div className="border-b border-slate-800/80 p-5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-950/50">
                <Sparkles
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <p className="text-sm font-semibold tracking-tight text-white">
                  Aura AI
                </p>

                <p className="text-[11px] text-slate-500">
                  Business Analyst
                </p>
              </div>
            </div>

            <div className="flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          </div>

          <button
            type="button"
            onClick={handleNewChat}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition-all duration-200 hover:-translate-y-0.5 hover:from-cyan-400 hover:to-blue-500 hover:shadow-cyan-950/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
          >
            <MessageSquarePlus
              size={17}
              className="transition-transform group-hover:scale-110"
            />

            New analysis
          </button>
        </div>

        {/* Conversations */}
        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-3 flex items-center justify-between px-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
              Recent conversations
            </p>

            {sessions.length > 0 && (
              <span className="rounded-full border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {sessions.length}
              </span>
            )}
          </div>

          <div className="space-y-1">
            {sortedSessions.map((chat) => {
              const isActive = current === chat.id;
              const isEditing = editingId === chat.id;
              const isMenuOpen = menuId === chat.id;

              const preview = getPreview(
                messagesBySession[chat.id] ?? [],
              );

              return (
                <div
                  key={chat.id}
                  className={`group relative rounded-xl transition ${
                    isActive
                      ? "bg-slate-800/90 shadow-sm"
                      : "hover:bg-slate-900/80"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-3 left-0 top-3 w-0.5 rounded-r-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
                  )}

                  <button
                    type="button"
                    onClick={() => handleSelect(chat.id)}
                    className="w-full px-3 py-3 pr-11 text-left"
                  >
                    {isEditing ? (
                      <input
                        autoFocus
                        value={editingTitle}
                        onChange={(event) =>
                          setEditingTitle(
                            event.target.value,
                          )
                        }
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault();
                            saveRename(chat.id);
                          }

                          if (event.key === "Escape") {
                            event.preventDefault();
                            cancelRename();
                          }
                        }}
                        onBlur={() =>
                          saveRename(chat.id)
                        }
                        className="w-full rounded-md border border-cyan-500/40 bg-slate-950 px-2 py-1 text-sm font-medium text-white outline-none ring-1 ring-cyan-500/20"
                      />
                    ) : (
                      <>
                        <div className="flex items-center gap-2">
                          <span
                            className={`block min-w-0 flex-1 truncate text-sm font-medium ${
                              isActive
                                ? "text-white"
                                : "text-slate-300"
                            }`}
                          >
                            {chat.title}
                          </span>
                        </div>

                        <span
                          className={`mt-1.5 block truncate text-[11px] leading-4 ${
                            isActive
                              ? "text-slate-400"
                              : "text-slate-600"
                          }`}
                        >
                          {preview}
                        </span>

                        <div className="mt-1.5 flex items-center gap-1.5">
                          <Clock3
                            size={10}
                            className="text-slate-600"
                          />

                          <span className="text-[10px] text-slate-600">
                            {formatRelativeTime(
                              chat.updatedAt,
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </button>

                  {!isEditing && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuId(
                          isMenuOpen ? null : chat.id,
                        );
                      }}
                      className={`absolute right-2 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg transition ${
                        isMenuOpen
                          ? "bg-slate-700 text-white"
                          : "text-slate-600 opacity-0 hover:bg-slate-700 hover:text-slate-200 group-hover:opacity-100"
                      }`}
                      aria-label="Conversation actions"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  )}

                  {isMenuOpen && (
                    <div className="absolute right-2 top-10 z-30 w-36 overflow-hidden rounded-xl border border-slate-700 bg-[#111827] p-1.5 shadow-2xl shadow-black/40">
                      <button
                        type="button"
                        onClick={() =>
                          startRename(
                            chat.id,
                            chat.title,
                          )
                        }
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                      >
                        <Pencil size={13} />
                        Rename
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setDeleteId(chat.id);
                          setMenuId(null);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-medium text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      >
                        <Trash2 size={13} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Empty */}
          {sessions.length === 0 && (
            <div className="px-5 py-14 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/70">
                <Sparkles
                  size={19}
                  className="text-slate-600"
                />
              </div>

              <p className="text-sm font-medium text-slate-300">
                No conversations yet
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                Start a new analysis to explore your
                dataset.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800/80 px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            AI services online
          </div>
        </div>
      </aside>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-[#0F172A] p-5 shadow-2xl shadow-black/50">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">
                  Delete conversation?
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  This will permanently remove the
                  conversation and its analysis history.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() =>
                  handleDelete(deleteId)
                }
                className="flex-1 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}