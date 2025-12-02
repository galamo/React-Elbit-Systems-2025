// utils.ts - Utility functions with various export patterns

// Named exports
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}

// Export with alias
const internalRandomId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

export { internalRandomId as generateId };

// Namespace-style export
export const StringUtils = {
  reverse: (str: string): string => str.split("").reverse().join(""),
  isPalindrome: (str: string): boolean => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");
    return cleaned === cleaned.split("").reverse().join("");
  },
  wordCount: (str: string): number => str.trim().split(/\s+/).length,
};

// Constants
export const MAX_STRING_LENGTH = 1000;
export const MIN_STRING_LENGTH = 1;
