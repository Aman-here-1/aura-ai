import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ----------------------------------------------------
// Request Interceptor
// ----------------------------------------------------

api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("aura_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ----------------------------------------------------
// Response Interceptor
// ----------------------------------------------------

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      typeof window !== "undefined"
    ) {
      localStorage.removeItem("aura_token");
      localStorage.removeItem("aura_user");

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ----------------------------------------------------
// Upload Dataset
// ----------------------------------------------------

export async function uploadDataset(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post(
    "/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
}

// ----------------------------------------------------
// AI Report
// ----------------------------------------------------

export async function generateAIReport(payload: any) {
  const response = await api.post(
    "/api/ai/report",
    payload
  );

  return response.data;
}

// ----------------------------------------------------
// Chat
// ----------------------------------------------------

export async function chat(payload: any) {
  const response = await api.post(
    "/api/chat",
    payload
  );

  return response.data;
}

export default api;