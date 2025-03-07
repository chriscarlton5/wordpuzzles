import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Heading,
  VStack,
  useToast,
  Spinner,
  Text
} from '@chakra-ui/react';
import { useAuth } from '../firebase/AuthContext';
import { GameStats, getUserStats, getWinRate, getAverageScore } from '../firebase/db';

export const Stats: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GameStats | null>(null);
  const [winRate, setWinRate] = useState<number>(0);
  const [averageScore, setAverageScore] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      try {
        const userStats = await getUserStats(user.uid);
        const rate = await getWinRate(user.uid);
        const avgScore = await getAverageScore(user.uid);

        setStats(userStats);
        setWinRate(rate);
        setAverageScore(avgScore);
      } catch (error) {
        console.error('Error loading stats:', error);
        toast({
          title: 'Error loading statistics',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user, toast]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="400px">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box textAlign="center" py={8}>
        <Text fontSize="xl">No statistics available yet. Play some games to see your stats!</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      <Heading size="lg" textAlign="center">Your Statistics</Heading>
      
      <StatGroup>
        <Stat>
          <StatLabel>Games Played</StatLabel>
          <StatNumber>{stats.gamesPlayed}</StatNumber>
          <StatHelpText>Total games played</StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Win Rate</StatLabel>
          <StatNumber>{winRate.toFixed(1)}%</StatNumber>
          <StatHelpText>
            <StatArrow type={winRate >= 50 ? 'increase' : 'decrease'} />
          </StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Current Streak</StatLabel>
          <StatNumber>{stats.currentStreak}</StatNumber>
          <StatHelpText>Consecutive wins</StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Longest Streak</StatLabel>
          <StatNumber>{stats.longestStreak}</StatNumber>
          <StatHelpText>Best streak</StatHelpText>
        </Stat>
      </StatGroup>

      <StatGroup>
        <Stat>
          <StatLabel>Average Score</StatLabel>
          <StatNumber>{averageScore.toFixed(1)}</StatNumber>
          <StatHelpText>Average guesses per game</StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Best Score</StatLabel>
          <StatNumber>{stats.lowestScore}</StatNumber>
          <StatHelpText>Lowest number of guesses</StatHelpText>
        </Stat>
        
        <Stat>
          <StatLabel>Last Played</StatLabel>
          <StatNumber>
            {new Date(stats.lastPlayed).toLocaleDateString()}
          </StatNumber>
          <StatHelpText>Most recent game</StatHelpText>
        </Stat>
      </StatGroup>
    </VStack>
  );
}; 