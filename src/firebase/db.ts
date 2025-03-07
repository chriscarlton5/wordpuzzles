import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  getDocs,
  increment,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './config';
import { User } from 'firebase/auth';

// Types for our database
export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  longestStreak: number;
  totalGuesses: number;
  lowestScore: number;
  lastPlayed: Date;
}

export interface GameRecord {
  gameId: number;
  word: string;
  guesses: string[];
  won: boolean;
  score: number;
  playedAt: Date;
  userId: string;
}

// Initialize user stats if they don't exist
export const initializeUserStats = async (user: User) => {
  const userRef = doc(db, 'users', user.uid);
  const statsRef = doc(userRef, 'stats', 'gameStats');
  
  const initialStats: GameStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalGuesses: 0,
    lowestScore: 6, // Start with worst possible score
    lastPlayed: new Date()
  };

  await setDoc(statsRef, initialStats);
  return initialStats;
};

// Get user stats
export const getUserStats = async (userId: string): Promise<GameStats | null> => {
  const statsRef = doc(db, 'users', userId, 'stats', 'gameStats');
  const statsDoc = await getDoc(statsRef);
  
  if (!statsDoc.exists()) {
    return null;
  }

  return statsDoc.data() as GameStats;
};

// Update stats after a game
export const updateGameStats = async (
  userId: string, 
  won: boolean, 
  guesses: string[], 
  gameId: number,
  word: string
) => {
  const statsRef = doc(db, 'users', userId, 'stats', 'gameStats');
  const statsDoc = await getDoc(statsRef);
  
  if (!statsDoc.exists()) {
    await initializeUserStats({ uid: userId } as User);
  }

  const score = guesses.length;
  const currentStats = statsDoc.data() as GameStats;
  
  // Calculate new streak
  const newCurrentStreak = won ? currentStats.currentStreak + 1 : 0;
  const newLongestStreak = Math.max(currentStats.longestStreak, newCurrentStreak);

  // Update stats
  await updateDoc(statsRef, {
    gamesPlayed: increment(1),
    gamesWon: won ? increment(1) : increment(0),
    currentStreak: newCurrentStreak,
    longestStreak: newLongestStreak,
    totalGuesses: increment(score),
    lowestScore: won && score < currentStats.lowestScore ? score : currentStats.lowestScore,
    lastPlayed: serverTimestamp()
  });

  // Record the game
  const gameRecord: GameRecord = {
    gameId,
    word,
    guesses,
    won,
    score,
    playedAt: new Date(),
    userId
  };

  await setDoc(doc(db, 'users', userId, 'games', gameId.toString()), gameRecord);
};

// Get user's game history
export const getUserGames = async (userId: string): Promise<GameRecord[]> => {
  const gamesRef = collection(db, 'users', userId, 'games');
  const gamesQuery = query(gamesRef);
  const gamesSnapshot = await getDocs(gamesQuery);
  
  return gamesSnapshot.docs.map(doc => doc.data() as GameRecord);
};

// Get user's recent games (last 10)
export const getRecentGames = async (userId: string): Promise<GameRecord[]> => {
  const gamesRef = collection(db, 'users', userId, 'games');
  const gamesQuery = query(gamesRef);
  const gamesSnapshot = await getDocs(gamesQuery);
  
  return gamesSnapshot.docs
    .map(doc => doc.data() as GameRecord)
    .sort((a, b) => b.playedAt.getTime() - a.playedAt.getTime())
    .slice(0, 10);
};

// Get user's win rate
export const getWinRate = async (userId: string): Promise<number> => {
  const stats = await getUserStats(userId);
  if (!stats) return 0;
  return stats.gamesPlayed > 0 ? (stats.gamesWon / stats.gamesPlayed) * 100 : 0;
};

// Get user's average score
export const getAverageScore = async (userId: string): Promise<number> => {
  const stats = await getUserStats(userId);
  if (!stats) return 0;
  return stats.gamesPlayed > 0 ? stats.totalGuesses / stats.gamesPlayed : 0;
}; 