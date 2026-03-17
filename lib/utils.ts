import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes safely, resolving conflicts.
 * Use this instead of plain string concatenation for conditional classes.
 *
 * Example: cn("px-4 py-2", isActive && "bg-black", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
