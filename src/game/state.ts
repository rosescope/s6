// Core game state. Everything the game tracks lives in this one object,
// so new features extend the state instead of adding globals.
export type GameState = {
  fish: number;
  // Levels owned of each upgrade, keyed by upgrade id from the catalog.
  upgrades: Record<string, number>;
};

export function createGameState(): GameState {
  return { fish: 0, upgrades: {} };
}
