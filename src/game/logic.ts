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
