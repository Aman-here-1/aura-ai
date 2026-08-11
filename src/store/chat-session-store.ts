import { create } from "zustand";

interface Session {
  id: string;
  title: string;
  createdAt: string;
}

interface State {
  current: string | null;
  sessions: Session[];

  createSession: () => string;
  setCurrent: (id: string) => void;
}

export const useChatSessionStore = create<State>((set) => ({
  current: null,
  sessions: [],

  createSession: () => {
    const id = crypto.randomUUID();

    set((state) => ({
      current: id,
      sessions: [
        {
          id,
          title: "New analysis",
          createdAt: new Date().toISOString(),
        },
        ...state.sessions,
      ],
    }));

    return id;
  },

  setCurrent: (id) =>
    set({
      current: id,
    }),
}));