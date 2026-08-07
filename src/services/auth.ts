// src/services/auth.ts

import api from "./ai";
import { useAuthStore } from "../store/auth-store";

// ----------------------------------------------------
// Types
// ----------------------------------------------------

export interface SignupRequest {
  full_name: string;
  email: string;
  password: string;
  company?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  company?: string;
  role?: string;
  avatar?: string;
  is_active?: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

// ----------------------------------------------------
// Cookie
// ----------------------------------------------------

function setCookie(
  name: string,
  value: string
) {
  document.cookie = `${name}=${value}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; Max-Age=0; path=/`;
}

// ----------------------------------------------------
// Signup
// ----------------------------------------------------

export async function signup(
  data: SignupRequest
): Promise<AuthResponse> {
  const response = await api.post(
    "/api/auth/signup",
    data
  );

  return response.data;
}

// ----------------------------------------------------
// Login
// ----------------------------------------------------

export async function login(
  data: LoginRequest
): Promise<AuthResponse> {

  const response =
    await api.post<AuthResponse>(
      "/api/auth/login",
      data
    );

  const token =
    response.data.access_token;

  const user =
    response.data.user;

  console.log("LOGIN RESPONSE");
  console.log(response.data);

  localStorage.setItem(
    "aura_token",
    token
  );

  localStorage.setItem(
    "aura_user",
    JSON.stringify(user)
  );

  setCookie(
    "aura_token",
    token
  );

  useAuthStore.getState().setAuth(
    user,
    token
  );

  return response.data;
}

// ----------------------------------------------------
// Logout
// ----------------------------------------------------

export function logout() {

  localStorage.removeItem(
    "aura_token"
  );

  localStorage.removeItem(
    "aura_user"
  );

  deleteCookie(
    "aura_token"
  );

  useAuthStore
    .getState()
    .logout();

  window.location.href =
    "/login";
}

// ----------------------------------------------------
// User
// ----------------------------------------------------

export function getCurrentUser() {

  const raw =
    localStorage.getItem(
      "aura_user"
    );

  if (!raw)
    return null;

  return JSON.parse(raw);
}

// ----------------------------------------------------
// Token
// ----------------------------------------------------

export function getToken() {
  return localStorage.getItem(
    "aura_token"
  );
}

// ----------------------------------------------------
// Auth
// ----------------------------------------------------

export function isAuthenticated() {
  return !!getToken();
}