// Level thresholds - each index represents the minimum wins needed for that level
const LEVEL_THRESHOLDS = [
  0,    // Level 1: 0-4 wins
  5,    // Level 2: 5-14 wins
  15,   // Level 3: 15-29 wins
  30,   // Level 4: 30-49 wins
  50,   // Level 5: 50-74 wins
  75,   // Level 6: 75-99 wins
  100,  // Level 7: 100-149 wins
  150,  // Level 8: 150-199 wins
  200,  // Level 9: 200-299 wins
  300   // Level 10: 300+ wins
];

export interface LevelInfo {
  level: number;
  currentWins: number;
  winsToNextLevel: number | null;
  progress: number;
}

export const calculateLevel = (totalWins: number): LevelInfo => {
  // Find the highest level threshold that the user has passed
  let level = 1;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (totalWins >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }

  // Calculate wins needed for next level
  const nextLevelThreshold = LEVEL_THRESHOLDS[level];
  const winsToNextLevel = nextLevelThreshold ? nextLevelThreshold - totalWins : null;

  // Calculate progress to next level (as a percentage)
  let progress = 0;
  if (level < LEVEL_THRESHOLDS.length) {
    const currentLevelThreshold = LEVEL_THRESHOLDS[level - 1];
    const winsInCurrentLevel = totalWins - currentLevelThreshold;
    const winsNeededForNextLevel = nextLevelThreshold - currentLevelThreshold;
    progress = (winsInCurrentLevel / winsNeededForNextLevel) * 100;
  } else {
    progress = 100; // Max level reached
  }

  return {
    level,
    currentWins: totalWins,
    winsToNextLevel,
    progress
  };
}; 