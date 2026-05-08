import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
  }
  return `${m}m ${s.toString().padStart(2, "0")}s`;
}

export function calculateMeetingCost(
  attendees: number,
  hourlyRate: number,
  elapsedSeconds: number
): number {
  const hoursElapsed = elapsedSeconds / 3600;
  return attendees * hourlyRate * hoursElapsed;
}

export function getPainColor(score: number): string {
  if (score <= 3) return "text-green-400";
  if (score <= 6) return "text-yellow-400";
  if (score <= 8) return "text-orange-400";
  return "text-red-400";
}

export function getPainLabel(score: number): string {
  if (score <= 2) return "Essential";
  if (score <= 4) return "Justified";
  if (score <= 6) return "Questionable";
  if (score <= 8) return "Wasteful";
  return "Should Be an Email";
}
