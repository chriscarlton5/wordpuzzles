import { useState, useEffect } from 'react';
import { Box, Container, Heading, VStack, Button, useToast, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { Navbar } from './components/Navbar';
import { HowToPlay } from './pages/HowToPlay';
import { WhatIsThis } from './pages/WhatIsThis';
import { WhyBuildThis } from './pages/WhyBuildThis';
import Login from './components/Login';
import { AuthProvider, useAuth } from './firebase/AuthContext';
import { 
  getRandomWord, 
  isValidWord, 
  checkGuess, 
  updateUsedLetters,
  LetterStatus,
  GameStatus
} from './utils/gameLogic';
import {
  generateGameId,
  getWordFromGameId,
  copyToClipboard,
  getGameIdFromUrl,
  generateShareUrl
} from './utils/gameSharing';
import { updateGameStats } from './firebase/db';
import { Stats } from './components/Stats';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

const GameComponent = () => {
  const [gameId, setGameId] = useState<number>(() => {
    const urlGameId = getGameIdFromUrl();
    return urlGameId || generateGameId();
  });
  const [solution, setSolution] = useState(() => {
    const urlGameId = getGameIdFromUrl();
    return urlGameId ? getWordFromGameId(urlGameId) : getRandomWord();
  });
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [usedLetters, setUsedLetters] = useState<Record<string, LetterStatus>>({});
  const [letterStatuses, setLetterStatuses] = useState<Record<number, LetterStatus[]>>({});
  const toast = useToast();
  const { user } = useAuth();

  const handleKeyPress = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      if (currentGuess.length !== WORD_LENGTH) {
        toast({
          title: 'Word too short',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      if (!isValidWord(currentGuess)) {
        toast({
          title: 'Not in word list',
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      // Check the guess
      const newLetterStatuses = {
        ...letterStatuses,
        [guesses.length]: checkGuess(currentGuess, solution)
      };
      setLetterStatuses(newLetterStatuses);

      // Update used letters
      setUsedLetters(prev => updateUsedLetters(currentGuess, solution, prev));

      // Add guess to list
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess('');

      // Check win/lose conditions
      if (currentGuess === solution) {
        setGameStatus('won');
        if (user) {
          updateGameStats(user.uid, true, newGuesses, gameId, solution);
        }
        toast({
          title: 'Congratulations!',
          description: `You found the word in ${newGuesses.length} ${newGuesses.length === 1 ? 'try' : 'tries'}!`,
          status: 'success',
          duration: null,
          isClosable: true,
        });
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameStatus('lost');
        if (user) {
          updateGameStats(user.uid, false, newGuesses, gameId, solution);
        }
        toast({
          title: 'Game Over',
          description: `The word was ${solution.toUpperCase()}`,
          status: 'error',
          duration: null,
          isClosable: true,
        });
      }
    } else if (key === 'DELETE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key.toLowerCase());
    }
  };

  const handleNewGame = () => {
    const newGameId = generateGameId();
    setGameId(newGameId);
    setSolution(getWordFromGameId(newGameId));
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setUsedLetters({});
    setLetterStatuses({});
  };

  const handleCopyGameId = async () => {
    const shareUrl = generateShareUrl(gameId);
    await copyToClipboard(shareUrl);
    toast({
      title: 'Game link copied!',
      description: 'Share this link with your friends to play the same game.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleKeyPress('ENTER');
      } else if (e.key === 'Backspace') {
        handleKeyPress('DELETE');
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, guesses, solution, gameStatus]);

  return (
    <Container maxW="container.lg" py={8}>
      <Box position="relative">
        {/* Left side - Welcome and Info */}
        <Box 
          position={{ base: 'static', md: 'absolute' }} 
          left={0} 
          top={0} 
          width={{ base: 'full', md: '350px' }}
          mb={{ base: 8, md: 0 }}
          bg="white"
          borderRadius="lg"
          p={6}
          boxShadow="sm"
        >
          <VStack align="stretch" spacing={8}>
            <Box>
              <Heading size="lg" mb={3} color="gray.700">Welcome to WordPlay!</Heading>
              <Text color="gray.600" fontSize="md" lineHeight="tall">
                It's for people that love Wordle, but hate limits. Enjoy unlimited games, challenge others and learn about words.
              </Text>
            </Box>
            
            <Box borderTop="1px" borderColor="gray.100" pt={6}>
              <Text color="gray.700" fontSize="md" mb={1}>
                Daily Puzzle #{gameId} - {new Date().toLocaleDateString()}
              </Text>
              <Text color="gray.500" fontSize="sm" display="flex" alignItems="center" gap={2}>
                Game ID: {gameId}
                <Box 
                  as="span" 
                  bg="purple.500" 
                  color="white" 
                  p={1} 
                  borderRadius="md" 
                  cursor="pointer" 
                  fontSize="xs"
                  onClick={handleCopyGameId}
                  _hover={{ bg: 'purple.600' }}
                >
                  📋
                </Box>
              </Text>
              <Text color="gray.500" fontSize="sm" mt={3}>
                A new word is selected every day at midnight Eastern Time
              </Text>
            </Box>

            <Button 
              colorScheme="teal"
              size="md"
              width="fit-content"
              variant="solid"
              bg="#00A4A6"
              color="white"
              _hover={{ bg: "#008486" }}
            >
              How To Play
            </Button>

            <Button 
              colorScheme="teal" 
              onClick={handleNewGame}
              size="md"
              width="fit-content"
              _hover={{ transform: 'translateY(-2px)' }}
              transition="all 0.2s"
            >
              New Game
            </Button>
          </VStack>
        </Box>

        {/* Center - Game Board */}
        <Box 
          maxW="600px" 
          mx="auto"
          pl={{ base: 0, md: '100px' }}
        >
          <VStack spacing={8} align="center">
            <GameBoard
              guesses={guesses}
              currentGuess={currentGuess}
              maxGuesses={MAX_GUESSES}
              wordLength={WORD_LENGTH}
              solution={solution}
              letterStatuses={letterStatuses}
            />
            
            <Box width="100%">
              <Keyboard
                onKeyPress={handleKeyPress}
                usedLetters={usedLetters}
              />
            </Box>
          </VStack>
        </Box>
      </Box>
    </Container>
  );
};

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box>Loading...</Box>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/what-is-this" element={<WhatIsThis />} />
            <Route path="/why-build-this" element={<WhyBuildThis />} />
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <GameComponent />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
} 