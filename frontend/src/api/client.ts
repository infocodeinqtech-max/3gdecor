import { getApiBase } from "./env";

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
  const res = await fetch(`${getApiBase()}${path}`, {
    method,
    headers,
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    cache: method === "GET" ? "no-store" : "default",
  });

  const contentType = res.headers.get("content-type") || "";
  const json = contentType.includes("application/json")
    ? await res.json().catch(() => null)
    : null;

  // Hostinger misconfig often returns SPA HTML (200) for /api/* —
  // treat that as a hard failure so login never looks "successful".
  if (!json || typeof json !== "object") {
    throw new Error(
      "API did not return JSON. Check that /api is routed to Laravel (see root .htaccess).",
    );
  }

  if (!res.ok) {
    const firstFieldError =
      json?.errors &&
      typeof json.errors === "object" &&
      Object.values(json.errors as Record<string, string[]>)
        .flat()
        .find((msg) => typeof msg === "string");
    const message =
      (typeof firstFieldError === "string" && firstFieldError) ||
      (typeof json?.message === "string" && json.message) ||
      `Request failed (${res.status})`;
    throw new Error(message);
  }

  return json as T;
}
