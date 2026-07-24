/** Shared email / phone validation for public + admin forms. */

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (!email || email.length > 190) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/** Live keyup hint for email format. */
export function emailKeyupHint(value: string): string | null {
  const email = value.trim();
  if (!email) return null;
  if (email.length > 190) return "Email is too long";
  if (!email.includes("@")) return "Email must include @";
  const [local, domain] = email.split("@");
  if (!local) return "Enter text before @";
  if (!domain) return "Enter domain after @";
  if (!domain.includes(".")) return "Domain needs a dot (e.g. .com)";
  if (domain.startsWith(".") || domain.endsWith(".")) {
    return "Invalid domain format";
  }
  if (!isValidEmail(email)) return "Enter a valid email (name@domain.com)";
  return null;
}

export function digitsOnly(value: string): string {
  return value.replace(/\D+/g, "");
}

/** Contact mobile: digits only, exactly up to 10. No letters/symbols. */
export function sanitizeMobileInput(raw: string): string {
  return digitsOnly(raw).slice(0, 10);
}

/**
 * Office / footer phone: digits only.
 * Mobile → max 10; landline (starts with 0) → max 11.
 */
export function sanitizePhoneInput(raw: string): string {
  const d = digitsOnly(raw);
  if (d.startsWith("0")) return d.slice(0, 11);
  return d.slice(0, 10);
}

/** Exactly 10 digits, starts with 6–9. */
export function isIndianMobile(value: string): boolean {
  const d = digitsOnly(value);
  return d.length === 10 && /^[6-9]\d{9}$/.test(d);
}

/** Exactly 11 digits, starts with 0 (STD landline). */
export function isIndianLandline(value: string): boolean {
  const d = digitsOnly(value);
  return d.length === 11 && /^0\d{10}$/.test(d);
}

export function isIndianPhone(
  value: string,
  options?: { allowLandline?: boolean },
): boolean {
  if (isIndianMobile(value)) return true;
  if (options?.allowLandline && isIndianLandline(value)) return true;
  return false;
}

/** Live keyup hint — empty while typing incomplete; error when length complete but invalid. */
export function phoneKeyupHint(
  value: string,
  options?: { allowLandline?: boolean; required?: boolean },
): string | null {
  const d = digitsOnly(value);
  if (!d) {
    return options?.required === false ? null : null;
  }

  if (options?.allowLandline) {
    if (d.startsWith("0")) {
      if (d.length < 11) return "Landline needs 11 digits";
      if (!isIndianLandline(d)) return "Enter a valid 11-digit landline";
      return null;
    }
    if (d.length < 10) return "Mobile needs 10 digits";
    if (d.length === 10 && !isIndianMobile(d)) {
      return "Mobile must start with 6–9";
    }
    if (!isIndianMobile(d)) return "Enter a valid 10-digit mobile number";
    return null;
  }

  if (d.length < 10) return "Mobile needs 10 digits";
  if (!isIndianMobile(d)) return "Mobile must be 10 digits starting with 6–9";
  return null;
}

export function mapsEmbedFromAddress(address: string): string {
  const q = encodeURIComponent(address.trim());
  return `https://maps.google.com/maps?q=${q}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
}

export function officeMapSrc(
  mapEmbed: string | undefined | null,
  address: string,
): string {
  const embed = (mapEmbed || "").trim();
  if (embed) return embed;
  if (address.trim()) return mapsEmbedFromAddress(address);
  return "";
}
