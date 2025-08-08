import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isClient =
  typeof window !== "undefined" && typeof window.document !== "undefined";

export const formatDate = (date: string | Date) => {
  if (!date) return "-";
  // Using Intl.DateTimeFormat ensures consistent formatting across server and client
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

/**
 * Extracts the first letter from a given string.
 * Trims any leading whitespace and returns the first character in uppercase.
 *
 * @param text - The input string from which to extract the first letter
 * @returns A single uppercase character, or an empty string if input is invalid
 */
export function getFirstLetter(text?: string): string {
  if (!text || typeof text !== "string") return "";

  // Remove leading/trailing whitespace
  const trimmedText = text.trim();

  // Return the first character in uppercase (if it exists)
  return trimmedText.charAt(0).toUpperCase();
}
