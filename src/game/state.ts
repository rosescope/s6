// Core game state. Everything the game tracks lives in this one object,
// so new features extend the state instead of adding globals.
export type GameState = {
  fish: number;
};

export function createGameState(): GameState {
  return { fish: 0 };
}
