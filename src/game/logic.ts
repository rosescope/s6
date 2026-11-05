// Pure game rules. These functions never touch the DOM, so they are easy
// to check with `deno check` and easy to unit test later.
import type { GameState } from "./state.ts";
import { type UpgradeDef, UPGRADES } from "./upgrades.ts";

// Level owned of an upgrade. Upgrades never purchased read as level 0,
// so state.upgrades can stay sparse.
export function getUpgradeLevel(state: GameState, id: string): number {
  return state.upgrades[id] ?? 0;
}

// Cost of the next level of an upgrade. Costs grow with every purchase.
export function getUpgradeCost(def: UpgradeDef, level: number): number {
  return Math.ceil(def.baseCost * def.growth ** level);
}

// Shared purchase rule for every upgrade in the catalog: pay the cost,
// gain one level. Returns false when the player cannot afford it.
export function tryPurchase(state: GameState, def: UpgradeDef): boolean {
  const level = getUpgradeLevel(state, def.id);
  const cost = getUpgradeCost(def, level);
  if (state.fish < cost) {
    return false;
  }
  state.fish -= cost;
  state.upgrades[def.id] = level + 1;
  return true;
}

// Fish gained per click. Better Fishing Rod upgrades add to the base of 1.
export function getClickGain(state: GameState): number {
  let gain = 1;
  for (const def of UPGRADES) {
    if (def.effect.type === "click") {
      gain += def.effect.amount * getUpgradeLevel(state, def.id);
    }
  }
  return gain;
}

// One click of the dive button: the diver catches a fish.
export function applyClick(state: GameState): void {
  state.fish += getClickGain(state);
}

// Automatic fish per second from every owned production upgrade.
export function getProductionPerSecond(state: GameState): number {
  let perSecond = 0;
  for (const def of UPGRADES) {
    if (def.effect.type === "production") {
      perSecond += def.effect.amount * getUpgradeLevel(state, def.id);
    }
  }
  return perSecond;
}

// Advance automatic production by the elapsed time in seconds.
// GameState stays the single source of truth: time is converted to fish here.
export function applyElapsed(state: GameState, seconds: number): void {
  state.fish += getProductionPerSecond(state) * seconds;
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
