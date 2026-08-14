import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Session {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatSessionState {
  current: string | null;
  sessions: Session[];

  createSession: (title?: string) => string;
  setCurrent: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  deleteSession: (id: string) => void;
  updateSessionActivity: (id: string) => void;
}

const createId = () => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
};

const normalizeTitle = (title: string) => {
  const cleaned = title.trim();

  if (!cleaned) {
    return "New analysis";
  }

  return cleaned.slice(0, 80);
};

export const useChatSessionStore =
  create<ChatSessionState>()(
    persist(
      (set, get) => ({
        current: null,

        sessions: [],

        createSession: (title = "New analysis") => {
          const id = createId();
          const now = new Date().toISOString();

          const session: Session = {
            id,
            title: normalizeTitle(title),
            createdAt: now,
            updatedAt: now,
          };

          set((state) => ({
            current: id,
            sessions: [
              session,
              ...state.sessions,
            ],
          }));

          return id;
        },

        setCurrent: (id) => {
          const exists = get().sessions.some(
            (session) => session.id === id,
          );

          if (!exists) {
            return;
          }

          set({
            current: id,
          });
        },

        renameSession: (id, title) => {
          const normalizedTitle =
            normalizeTitle(title);

          set((state) => ({
            sessions: state.sessions.map(
              (session) =>
                session.id === id
                  ? {
                      ...session,
                      title: normalizedTitle,
                      updatedAt:
                        new Date().toISOString(),
                    }
                  : session,
            ),
          }));
        },

        deleteSession: (id) => {
          const state = get();

          const remainingSessions =
            state.sessions.filter(
              (session) => session.id !== id,
            );

          let nextCurrent = state.current;

          if (state.current === id) {
            nextCurrent =
              remainingSessions[0]?.id ?? null;
          }

          set({
            sessions: remainingSessions,
            current: nextCurrent,
          });
        },

        updateSessionActivity: (id) => {
          const now =
            new Date().toISOString();

          set((state) => {
            const target =
              state.sessions.find(
                (session) => session.id === id,
              );

            if (!target) {
              return state;
            }

            const updatedSession = {
              ...target,
              updatedAt: now,
            };

            const remaining =
              state.sessions.filter(
                (session) => session.id !== id,
              );

            return {
              sessions: [
                updatedSession,
                ...remaining,
              ],
            };
          });
        },
      }),
      {
        name: "aura-ai-chat-sessions",
      },
    ),
  );