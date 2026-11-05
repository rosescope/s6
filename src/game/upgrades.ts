// Data-driven upgrade catalog. Game rules (logic.ts) and the UI read this
// data instead of duplicating purchase code per upgrade: adding an upgrade
// is just adding an entry here.

export type UpgradeEffect =
  | { type: "click"; amount: number }
  | { type: "production"; amount: number };

export type UpgradeDef = {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  // Multiplier on the cost after each purchase: 1.15 means +15% per level.
  growth: number;
  effect: UpgradeEffect;
};

export const UPGRADES: UpgradeDef[] = [
  {
    id: "net",
    name: "Fishing Net",
    description: "+1 fish per second",
    baseCost: 10,
    growth: 1.15,
    effect: { type: "production", amount: 1 },
  },
  {
    id: "rod",
    name: "Better Fishing Rod",
    description: "+1 fish per click",
    baseCost: 15,
    growth: 1.15,
    effect: { type: "click", amount: 1 },
  },
];
