// Deep Sea Diver — an incremental game about catching fish.
// Entry point: builds the UI from the upgrade catalog, wires game logic
// to it, and runs the elapsed-time production loop.

import {
  applyClick,
  applyElapsed,
  formatNumber,
  getClickGain,
  getProductionPerSecond,
  getUpgradeCost,
  getUpgradeLevel,
  tryPurchase,
} from "./game/logic.ts";
import { createGameState } from "./game/state.ts";
import { type UpgradeDef, UPGRADES } from "./game/upgrades.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const state = createGameState();

const heading = document.createElement("h1");
heading.textContent = "Deep Sea Diver";

const blurb = document.createElement("p");
blurb.textContent =
  "Catch fish by clicking, then buy nets and rods so the ocean does the work.";

// Stats read straight from GameState on every render.
const fishStat = document.createElement("p");
fishStat.ariaLive = "polite";
fishStat.style.fontSize = "1.4em";
const productionStat = document.createElement("p");
const clickStat = document.createElement("p");
const renderStats = (): void => {
  fishStat.textContent = `Fish: ${formatNumber(state.fish)}`;
  productionStat.textContent = `Fish per second: ${
    formatNumber(getProductionPerSecond(state))
  }`;
  clickStat.textContent = `Fish per click: ${
    formatNumber(getClickGain(state))
  }`;
};

const catchButton = document.createElement("button");
catchButton.type = "button";
catchButton.textContent = "🎣 Catch a fish";
catchButton.addEventListener("click", () => {
  applyClick(state);
  render();
});

// Upgrade buttons are generated from the catalog: one shared purchase
// handler, no duplicated code per upgrade.
const upgradesHeading = document.createElement("h2");
upgradesHeading.textContent = "Upgrades";

const upgradeList = document.createElement("div");
const upgradeButtons: Array<{ button: HTMLButtonElement; def: UpgradeDef }> =
  [];
for (const def of UPGRADES) {
  const button = document.createElement("button");
  button.type = "button";
  button.title = `Buy a ${def.name}`;
  button.addEventListener("click", () => {
    tryPurchase(state, def);
    render();
  });
  upgradeButtons.push({ button, def });
  upgradeList.append(button);
}

const renderUpgrades = (): void => {
  for (const { button, def } of upgradeButtons) {
    const level = getUpgradeLevel(state, def.id);
    const cost = getUpgradeCost(def, level);
    button.textContent = `${def.name}: ${def.description} — ${
      formatNumber(cost)
    } fish (owned: ${level})`;
    button.disabled = state.fish < cost;
  }
};

const render = (): void => {
  renderStats();
  renderUpgrades();
};
render();

// Automatic production: fish accumulate with elapsed time. The delta is
// clamped so a background tab does not produce a giant catch-up burst.
const MAX_TICK_SECONDS = 1;
let lastFrame = performance.now();
const frame = (now: number): void => {
  const deltaSeconds = Math.min((now - lastFrame) / 1000, MAX_TICK_SECONDS);
  lastFrame = now;
  applyElapsed(state, deltaSeconds);
  render();
  requestAnimationFrame(frame);
};
requestAnimationFrame(frame);

app.append(
  heading,
  blurb,
  fishStat,
  productionStat,
  clickStat,
  catchButton,
  upgradesHeading,
  upgradeList,
);
