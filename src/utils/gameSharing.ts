import { SOLUTION_WORDS } from './words';

// Generate a unique game ID (8 digits)
export const generateGameId = (): number => {
  return Math.floor(10000000 + Math.random() * 90000000);
};

// Get word from game ID (deterministic)
export const getWordFromGameId = (gameId: number): string => {
  // Use the game ID as a seed to select a word
  const index = gameId % SOLUTION_WORDS.length;
  return SOLUTION_WORDS[index];
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// Get game ID from URL
export const getGameIdFromUrl = (): number | null => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('game_id');
  return gameId ? parseInt(gameId, 10) : null;
};

// Generate share URL
export const generateShareUrl = (gameId: number): string => {
  return `${window.location.origin}/game/join?game_id=${gameId}`;
}; 