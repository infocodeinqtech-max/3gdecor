/** Safe messages for end users — never leak stack traces, SQL, or internals. */

export const PUBLIC_SAFE_ERROR =
  "This process cannot be proceeded at this time. Please try again later.";

const TECHNICAL_PATTERNS =
  /SQLSTATE|SQL syntax|Exception|TypeError|ReferenceError|NetworkError|Failed to fetch|ECONN|ENOENT|stack trace|at\s+\S+\s+\(|undefined is not|null is not|Unexpected token|Internal Server Error|Whoops!|Illuminate\\|Symfony\\|PDOException|mysqli_|CORS|ERR_/i;

/** Short, human validation messages we can still show (admin + forms). */
function isLikelyValidationMessage(message: string): boolean {
  const m = message.trim();
  if (!m || m.length > 160) return false;
  if (TECHNICAL_PATTERNS.test(m)) return false;
  if (m.includes("{") || m.includes("<!DOCTYPE") || m.includes("<html")) {
    return false;
  }
  return true;
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message || "";
  if (typeof error === "string") return error;
  return "";
}

/**
 * Message safe to show on the public site / toasts when the raw error
 * may contain sensitive or technical details.
 */
export function toPublicErrorMessage(error: unknown): string {
  const raw = getErrorMessage(error).trim();
  if (!raw) return PUBLIC_SAFE_ERROR;
  if (!isLikelyValidationMessage(raw)) return PUBLIC_SAFE_ERROR;
  // Allow known friendly validation / OTP messages
  return raw;
}

/**
 * Admin toasts: keep validation text, hide technical internals.
 */
export function toAdminErrorMessage(error: unknown): string {
  const raw = getErrorMessage(error).trim();
  if (!raw) return PUBLIC_SAFE_ERROR;
  if (isLikelyValidationMessage(raw)) return raw;
  return PUBLIC_SAFE_ERROR;
}
