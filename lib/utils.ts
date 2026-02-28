import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a phone number with spaces for readability.
 * Examples:
 *   "+2348027815383" → "+234 802 7815 383"
 *   "08027815383" → "080 2781 5383"
 *   "+12125551234" → "+1 212 555 1234"
 *
 * For numbers with a '+', splits off country code (1-3 digits),
 * then formats the rest in groups of 3-4 digits for readability.
 */
export function formatPhoneNumber(input: string): string {
  const raw = (input ?? "").trim();
  if (!raw) return "";

  // extract and preserve leading '+'
  const hasPlus = raw.startsWith("+");
  const digitsOnly = raw.replace(/[^0-9]/g, "");

  if (digitsOnly.length === 0) return raw;

  // if it started with '+', extract country code (1-3 digits, prefer longest)
  let countryCode = "";
  let nationalPart = digitsOnly;

  if (hasPlus) {
    // try to extract country code: prefer 3, then 2, then 1 digit
    const maxLen = Math.min(3, digitsOnly.length - 1);
    for (let len = maxLen; len >= 1; len--) {
      const candidate = digitsOnly.slice(0, len);
      const remainder = digitsOnly.slice(len);
      if (remainder.length >= 4 && remainder.length <= 14) {
        countryCode = candidate;
        nationalPart = remainder;
        break;
      }
    }
    // fallback: if no valid split found, treat first 1-3 as country code
    if (!countryCode) {
      const fallbackLen = Math.min(3, digitsOnly.length - 1);
      countryCode = digitsOnly.slice(0, fallbackLen);
      nationalPart = digitsOnly.slice(fallbackLen);
    }
  }

  // format national part: groups of 3, 4, 3
  let formatted = "";
  if (nationalPart.length <= 7) {
    // short number: just group by 3s
    formatted = nationalPart.replace(/(\d{3})(?=\d)/g, "$1 ");
  } else if (nationalPart.length === 10) {
    // typical 10-digit (e.g., Nigerian): 3-4-3
    formatted = `${nationalPart.slice(0, 3)} ${nationalPart.slice(3, 7)} ${nationalPart.slice(7)}`;
  } else if (nationalPart.length === 11) {
    // e.g., US with leading 1: 3-4-4
    formatted = `${nationalPart.slice(0, 3)} ${nationalPart.slice(3, 7)} ${nationalPart.slice(7)}`;
  } else {
    // generic: group by 3s with last group flexible
    formatted = nationalPart.replace(/(\d{3})(?=\d)/g, "$1 ");
  }

  // combine
  if (hasPlus) {
    return `+${countryCode} ${formatted}`;
  }
  return formatted;
}
