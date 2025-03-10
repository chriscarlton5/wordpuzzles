import { useState, useEffect } from 'react';
import { Box, Container, Heading, VStack, Button, useToast, Text } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { Navbar } from './components/Navbar';
import { HowToPlay } from './pages/HowToPlay';
import { WhatIsThis } from './pages/WhatIsThis';
import { WhyBuildThis } from './pages/WhyBuildThis';
import { GroupChallenge } from './pages/GroupChallenge';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { AuthProvider, useAuth } from './firebase/AuthContext';
import { 
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
  getGameInfoFromUrl,
  generateShareUrl,
  getDailyChallengeGameId,
  getDailyChallengeWord,
  isDailyChallenge
} from './utils/gameSharing';
import { updateGameStats } from './firebase/db';
import { Stats } from './components/Stats';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

// Function to update meta tags for better link previews
const updateMetaTags = (challenger?: string | null) => {
  const title = challenger 
    ? `${challenger} has challenged you to a WordPuzzle!`
    : 'WordPuzzles.org - Daily Word Puzzles';
  
  const description = challenger
    ? `Can you solve this WordPuzzle challenge from ${challenger}?`
    : 'Challenge your friends to solve daily word puzzles! Play now and test your vocabulary skills.';
  
  const url = window.location.origin + window.location.pathname + window.location.search;
  
  // Update meta tags
  document.title = title;
  document.querySelector('meta[name="title"]')?.setAttribute('content', title);
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
  document.querySelector('meta[property="twitter:title"]')?.setAttribute('content', title);
  document.querySelector('meta[property="twitter:description"]')?.setAttribute('content', description);
  document.querySelector('meta[property="twitter:url"]')?.setAttribute('content', url);
};

const GameComponent = () => {
  const [gameId, setGameId] = useState<number>(() => {
    const { gameId, challenger } = getGameInfoFromUrl();
    if (gameId) {
      updateMetaTags(challenger);
    }
    return gameId || generateGameId();
  });
  const [solution, setSolution] = useState<string>(() => getWordFromGameId(gameId));
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [usedLetters, setUsedLetters] = useState<Record<string, LetterStatus>>({});
  const [letterStatuses, setLetterStatuses] = useState<Record<number, LetterStatus[]>>({});
  const [isDaily, setIsDaily] = useState(() => isDailyChallenge(gameId));
  const { user } = useAuth();
  const toast = useToast();

  // Check if we need to update to today's daily challenge
  useEffect(() => {
    if (isDaily && gameId !== getDailyChallengeGameId()) {
      setGameId(getDailyChallengeGameId());
      setSolution(getDailyChallengeWord());
      setGuesses([]);
      setCurrentGuess('');
      setGameStatus('playing');
      setUsedLetters({});
      setLetterStatuses({});
    }
  }, [isDaily]);

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
    setIsDaily(false);
  };

  const handleCopyGameId = async () => {
    const shareUrl = generateShareUrl(gameId, user?.displayName || undefined);
    if (!shareUrl) return;
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
    <Container 
      maxW="container.lg" 
      py={{ base: 6, md: 8 }}
      px={{ base: 0, md: 8 }}
    >
      <Box 
        position="relative" 
        display="flex" 
        flexDirection={{ base: "column", md: "row" }} 
        justifyContent={{ base: "flex-start", md: "center" }}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        {/* Center - Game Board - Now first on mobile */}
        <Box 
          maxW={{ base: "100%", md: "600px" }}
          mx="auto"
          pl={{ md: '0' }}
          position="relative"
          width={{ base: "92%", md: "100%" }}
          order={{ base: 1, md: 2 }}
        >
          <VStack spacing={{ base: 6, md: 8 }} align="center">
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

        {/* Left side - Welcome and Info - Now second on mobile */}
        <Box 
          position={{ base: 'static', md: 'absolute' }} 
          left={{ md: 'calc(50% - 600px)' }} 
          top={0} 
          width={{ base: '92%', md: '350px' }}
          mb={{ base: 3, md: 0 }}
          mt={{ base: 4, md: 0 }}
          bg="white"
          borderRadius="lg"
          p={{ base: 3, md: 6 }}
          boxShadow="sm"
          zIndex={1}
          order={{ base: 2, md: 1 }}
        >
          <VStack align="stretch" spacing={{ base: 3, md: 8 }}>
            <Box>
              <Heading size="lg" mb={3} color="gray.700">Welcome to WordPuzzles!</Heading>
              <Text color="gray.600" fontSize="md" lineHeight="tall">
                It's for people that love Wordle, but hate limits. Enjoy unlimited games, challenge others and learn about words.
              </Text>
            </Box>
            
            <Box>
              <Text color="gray.700" fontSize="md" mb={1}>
                {isDaily ? 'Daily Challenge' : 'Custom Game'} #{gameId} - {new Date().toLocaleDateString()}
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
              {isDaily && (
                <Text color="gray.500" fontSize="sm" mt={3}>
                  A new word is selected every day at midnight Eastern Time
                </Text>
              )}
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
  console.log('App component rendered');
  return (
    <AuthProvider>
      <Router>
        <Box minH="100vh" bg="gray.50">
          <Navbar />
          <Routes>
            <Route path="/" element={<GameComponent />} />
            <Route path="/how-to-play" element={<HowToPlay />} />
            <Route path="/what-is-this" element={<WhatIsThis />} />
            <Route path="/why-build-this" element={<WhyBuildThis />} />
            <Route path="/group-challenge" element={<GroupChallenge />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/stats" element={
              <ProtectedRoute>
                <Stats />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Box>
      </Router>
    </AuthProvider>
  );
} 