import { getApiBase } from "./env";
import {
  PUBLIC_SAFE_ERROR,
  toAdminErrorMessage,
} from "../utils/publicError";

export { getApiBase } from "./env";

const TOKEN_KEY = "3gdeco-admin-token";

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

type ApiOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
};

export async function apiRequest<T = unknown>(
  path: string,
  options: ApiOptions = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (options.auth !== false) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const method = options.method || "GET";
  let res: Response;
  try {
    res = await fetch(`${getApiBase()}${path}`, {
      method,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: method === "GET" ? "no-store" : "default",
    });
  } catch {
    throw new Error(PUBLIC_SAFE_ERROR);
  }

  return parseApiResponse<T>(res);
}

/** Multipart upload (do not set Content-Type — browser sets boundary). */
export async function apiUpload<T = unknown>(
  path: string,
  formData: FormData,
  options: { auth?: boolean; method?: string } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.auth !== false) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${getApiBase()}${path}`, {
      method: options.method || "POST",
      headers,
      body: formData,
    });
  } catch {
    throw new Error(PUBLIC_SAFE_ERROR);
  }

  return parseApiResponse<T>(res);
}

/** Upload image blob to /uploads/{section}/... and return stored path. */
export async function uploadMediaFile(
  section: string,
  blob: Blob,
  filename = "image.jpg",
): Promise<string> {
  const form = new FormData();
  form.append("section", section);
  form.append("file", blob, filename);

  const res = await apiUpload<{
    success: boolean;
    data?: { path?: string };
    message?: string;
  }>("/media/upload", form);

  const path = res.data?.path?.trim();
  if (!path) {
    throw new Error(toAdminErrorMessage(res.message || PUBLIC_SAFE_ERROR));
  }
  return path;
}

async function parseApiResponse<T>(res: Response): Promise<T> {
  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();
  let json: unknown = null;

  if (contentType.includes("application/json") || text.trim().startsWith("{")) {
    try {
      // Tolerate accidental PHP warnings/HTML prepended before JSON
      const start = text.indexOf("{");
      const end = text.lastIndexOf("}");
      const payload =
        start >= 0 && end > start ? text.slice(start, end + 1) : text;
      json = JSON.parse(payload);
    } catch {
      json = null;
    }
  }

  if (!json || typeof json !== "object") {
    throw new Error(PUBLIC_SAFE_ERROR);
  }

  const body = json as Record<string, unknown>;

  if (!res.ok) {
    const firstFieldError =
      body.errors &&
      typeof body.errors === "object" &&
      Object.values(body.errors as Record<string, string[]>)
        .flat()
        .find((msg) => typeof msg === "string");
    const raw =
      (typeof firstFieldError === "string" && firstFieldError) ||
      (typeof body.message === "string" && body.message) ||
      "";
    throw new Error(toAdminErrorMessage(raw || PUBLIC_SAFE_ERROR));
  }

  return json as T;
}
