export const defaultCampus = { id: "isg-matriz", name: "ISG Matriz" };

export const serviceTypes = [
  { id: "celebracao", label: "Celebração" },
  { id: "gsg", label: "GSG / Juventude" },
  { id: "kids", label: "Kids Service" },
  { id: "oracao", label: "Oração" },
];

export const CHART_COLORS = [
  "#2563eb",
  "#22c55e",
  "#f97316",
  "#06b6d4",
  "#a855f7",
  "#eab308",
];

export function uid() {
  return Math.random().toString(36).slice(2);
}
