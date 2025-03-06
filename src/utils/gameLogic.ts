import { WORD_LIST } from './words';

export type LetterStatus = 'correct' | 'present' | 'absent' | undefined;
export type GameStatus = 'playing' | 'won' | 'lost';

export interface GameState {
  solution: string;
  guesses: string[];
  currentGuess: string;
  gameStatus: GameStatus;
  usedLetters: Record<string, LetterStatus>;
}

export const getRandomWord = (): string => {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string): boolean => {
  return WORD_LIST.includes(word.toLowerCase());
};

export const checkGuess = (guess: string, solution: string): LetterStatus[] => {
  const result: LetterStatus[] = Array(guess.length).fill('absent');
  const solutionChars = [...solution];
  const guessChars = [...guess];

  // First pass: mark correct letters
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === solutionChars[i]) {
      result[i] = 'correct';
      solutionChars[i] = '*'; // Mark as used
      guessChars[i] = '-'; // Mark as processed
    }
  }

  // Second pass: mark present letters
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] !== '-') { // Skip already processed letters
      const charIndex = solutionChars.indexOf(guessChars[i]);
      if (charIndex !== -1) {
        result[i] = 'present';
        solutionChars[charIndex] = '*'; // Mark as used
      }
    }
  }

  return result;
};

export const updateUsedLetters = (
  guess: string,
  solution: string,
  currentUsedLetters: Record<string, LetterStatus>
): Record<string, LetterStatus> => {
  const statuses = checkGuess(guess, solution);
  const newUsedLetters = { ...currentUsedLetters };

  [...guess].forEach((letter, i) => {
    const upperLetter = letter.toUpperCase();
    const currentStatus = newUsedLetters[upperLetter];
    const newStatus = statuses[i];

    // Only update if the new status is more favorable than the current one
    if (
      currentStatus === undefined ||
      (currentStatus === 'absent' && (newStatus === 'present' || newStatus === 'correct')) ||
      (currentStatus === 'present' && newStatus === 'correct')
    ) {
      newUsedLetters[upperLetter] = newStatus;
    }
  });

  return newUsedLetters;
}; 