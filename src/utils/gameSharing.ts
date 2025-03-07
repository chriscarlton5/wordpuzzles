import { SOLUTION_WORDS } from './words';

// Store custom words for challenges
const customChallengeWords: Record<number, string> = {};

// Generate a random game ID
export const generateGameId = (): number => {
  return Math.floor(Math.random() * 1000000000);
};

// Get word from game ID (deterministic)
export const getWordFromGameId = (gameId: number): string => {
  // First check if it's a custom challenge word
  if (customChallengeWords[gameId]) {
    return customChallengeWords[gameId];
  }
  
  // Otherwise use the standard word list
  const index = gameId % SOLUTION_WORDS.length;
  return SOLUTION_WORDS[index];
};

// Store a custom word for a challenge
export const setCustomChallengeWord = (gameId: number, word: string): void => {
  customChallengeWords[gameId] = word.toLowerCase();
};

// Generate a shareable URL for a game
export const generateShareUrl = (gameId: number): string => {
  const baseUrl = window.location.origin;
  return `${baseUrl}?game=${gameId}`;
};

// Get game ID from URL if present
export const getGameIdFromUrl = (): number | null => {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get('game');
  return gameId ? parseInt(gameId) : null;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// Get the daily challenge game ID based on the date
export const getDailyChallengeGameId = (date: Date = new Date()): number => {
  // Use the date as a seed (YYYYMMDD format)
  const dateString = date.getFullYear().toString() +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  return parseInt(dateString);
};

// Get the daily challenge word (deterministic based on date)
export const getDailyChallengeWord = (date: Date = new Date()): string => {
  const gameId = getDailyChallengeGameId(date);
  return getWordFromGameId(gameId);
};

// Check if a game ID is from today's daily challenge
export const isDailyChallenge = (gameId: number): boolean => {
  return gameId === getDailyChallengeGameId();
}; 