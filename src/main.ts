// Deep Sea Diver — an incremental game about catching fish.
// Entry point: builds the UI and wires game logic to it.
import { applyClick } from "./game/logic.ts";
import { createGameState } from "./game/state.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const state = createGameState();

const heading = document.createElement("h1");
heading.textContent = "Deep Sea Diver";

const blurb = document.createElement("p");
blurb.textContent = "Click the waves to catch fish.";

// Minimal readout so the button's effect is visible. The formatted counter
// display is its own feature and gets built next.
const counter = document.createElement("p");
const renderCounter = (): void => {
  counter.textContent = `Fish: ${state.fish}`;
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
