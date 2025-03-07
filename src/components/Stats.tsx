import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  useToast,
  Spinner,
  Text,
  SimpleGrid,
  Icon,
  Progress,
  Tooltip,
} from '@chakra-ui/react';
import { useAuth } from '../firebase/AuthContext';
import { GameStats, getUserStats } from '../firebase/db';
import { FiActivity, FiAward, FiBarChart2, FiTrendingUp } from 'react-icons/fi';
import { calculateLevel, LevelInfo } from '../utils/levelSystem';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  subtext?: string;
  showProgress?: boolean;
  progressValue?: number;
  progressColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon, 
  title, 
  value, 
  subtext, 
  showProgress, 
  progressValue,
  progressColor = "green" 
}) => (
  <Box
    bg="white"
    p={6}
    borderRadius="lg"
    boxShadow="sm"
    position="relative"
    overflow="hidden"
  >
    <Icon
      as={icon}
      boxSize={6}
      color="purple.500"
      mb={2}
    />
    <Text color="gray.500" fontSize="sm" mb={1}>
      {title}
    </Text>
    <Text fontSize="2xl" fontWeight="bold">
      {value}
    </Text>
    {subtext && (
      <Text fontSize="sm" color="gray.500" mt={1}>
        {subtext}
      </Text>
    )}
    {showProgress && progressValue !== undefined && (
      <Box mt={2}>
        <Progress
          value={progressValue}
          size="xs"
          colorScheme={progressColor}
          bg="gray.100"
          borderRadius="full"
        />
      </Box>
    )}
  </Box>
);

export const Stats: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<GameStats | null>(null);
  const [levelInfo, setLevelInfo] = useState<LevelInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const loadStats = async () => {
      if (!user) return;

      try {
        const userStats = await getUserStats(user.uid);
        setStats(userStats);
        if (userStats) {
          setLevelInfo(calculateLevel(userStats.gamesWon));
        }
      } catch (error) {
        console.error('Error loading statistics:', error);
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

  const defaultStats: GameStats = {
    gamesPlayed: 0,
    gamesWon: 0,
    currentStreak: 0,
    longestStreak: 0,
    totalGuesses: 0,
    lowestScore: 6,
    lastPlayed: new Date()
  };

  const currentStats = stats || defaultStats;
  const winRatio = currentStats.gamesPlayed > 0 
    ? (currentStats.gamesWon / currentStats.gamesPlayed) * 100 
    : 0;
  const averageScore = currentStats.gamesPlayed > 0
    ? currentStats.totalGuesses / currentStats.gamesPlayed
    : 0;

  return (
    <VStack spacing={8} align="stretch" p={6}>
      <Heading size="lg" textAlign="center" color="gray.700">
        Game Stats
      </Heading>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <StatCard
          icon={FiActivity}
          title="Games Played"
          value={currentStats.gamesPlayed}
        />
        
        <StatCard
          icon={FiBarChart2}
          title="Win Ratio"
          value={`${winRatio.toFixed(1)}%`}
          subtext={`vs. 84% for all players`}
          showProgress={true}
          progressValue={winRatio}
        />
        
        <StatCard
          icon={FiTrendingUp}
          title="Longest Win Streak"
          value={currentStats.longestStreak}
        />
        
        <StatCard
          icon={FiAward}
          title="Current Win Streak"
          value={currentStats.currentStreak}
        />
        
        <Tooltip 
          label={levelInfo?.winsToNextLevel 
            ? `${levelInfo.winsToNextLevel} wins needed for next level` 
            : 'Max level reached!'
          }
          placement="top"
        >
          <Box>
            <StatCard
              icon={FiBarChart2}
              title="Level"
              value={levelInfo?.level || 1}
              subtext={`${currentStats.gamesWon} total wins`}
              showProgress={true}
              progressValue={levelInfo?.progress || 0}
              progressColor="purple"
            />
          </Box>
        </Tooltip>
        
        <StatCard
          icon={FiBarChart2}
          title="Average Score"
          value={averageScore.toFixed(1)}
        />
        
        <StatCard
          icon={FiTrendingUp}
          title="Best Score"
          value={currentStats.lowestScore}
        />
        
        <StatCard
          icon={FiActivity}
          title="Average # of Turns"
          value={averageScore.toFixed(2)}
          subtext="vs. 4.4 for all players"
        />
      </SimpleGrid>

      <Box mt={8}>
        <Heading size="md" mb={4} color="gray.700">
          Guess Distribution
        </Heading>
        {/* Guess distribution chart will go here */}
      </Box>
    </VStack>
  );
}; 