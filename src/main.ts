// Deep Sea Diver — an incremental game about catching fish.
// Entry point: builds the UI and wires game logic to it.
import { applyClick, formatNumber } from "./game/logic.ts";
import { createGameState } from "./game/state.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const state = createGameState();

const heading = document.createElement("h1");
heading.textContent = "Deep Sea Diver";

const blurb = document.createElement("p");
blurb.textContent = "Click the waves to catch fish.";

// The fish counter. GameState is the single source of truth: every render
// formats the current count fresh, so the display can never drift from state.
const counter = document.createElement("p");
counter.ariaLive = "polite";
counter.style.fontSize = "1.4em";
const renderCounter = (): void => {
  counter.textContent = `Fish: ${formatNumber(state.fish)}`;
};
renderCounter();

const catchButton = document.createElement("button");
catchButton.type = "button";
catchButton.textContent = "🎣 Catch a fish";
catchButton.addEventListener("click", () => {
  applyClick(state);
  renderCounter();
});

app.append(heading, blurb, counter, catchButton);
