import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper functions from the skeleton
export function fmtDate(s: string) {
  const d = new Date(s + "T00:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export function daysFromNow(s: string) {
  const d = new Date(s + "T00:00:00");
  return Math.round((Date.now() - d.getTime()) / 86400000);
}

export function avgNum(arr: number[]) {
  return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
}

export function sumOf(arr: number[]) {
  return arr.reduce((a, b) => a + b, 0);
}

export function labelOf(
  list: Array<{ id: string; label: string }>,
  id: string
) {
  return list.find((x) => x.id === id)?.label || id;
}

export function onlyNumbers(v: string) {
  return v.replace(/[^0-9]/g, "");
}

export function numBlock(obj: Record<string, any>) {
  const out: Record<string, number> = {};
  Object.keys(obj).forEach((k) => (out[k] = Number(obj[k] || 0)));
  return out;
}
