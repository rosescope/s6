// Pure game rules. These functions never touch the DOM, so they are easy
// to check with `deno check` and easy to unit test later.
import type { GameState } from "./state.ts";

// Fish gained per catch. Upgrades will multiply this later.
export function getClickGain(): number {
  return 1;
}

// One click of the dive button: the diver catches a fish.
export function applyClick(state: GameState): void {
  state.fish += getClickGain();
}

// Readable number formatting for large amounts: 999 -> "999", 1234 -> "1.2K".
const UNITS = ["", "K", "M", "B", "T"] as const;

export function formatNumber(value: number): string {
  if (value < 1000) {
    return Math.floor(value).toString();
  }
  let unitIndex = 0;
  let scaled = value;
  while (scaled >= 1000 && unitIndex < UNITS.length - 1) {
    scaled /= 1000;
    unitIndex++;
  }
  const digits = scaled >= 100
    ? Math.floor(scaled).toString()
    : scaled.toFixed(1);
  const text = digits.endsWith(".0") ? digits.slice(0, -2) : digits;
  return `${text}${UNITS[unitIndex]}`;
}
