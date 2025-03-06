import { useState, useEffect } from 'react';
import { Box, Container, Heading, VStack, Button, useToast, Text } from '@chakra-ui/react';
import { GameBoard } from './components/GameBoard';
import { Keyboard } from './components/Keyboard';
import { Navbar } from './components/Navbar';
import { 
  getRandomWord, 
  isValidWord, 
  checkGuess, 
  updateUsedLetters,
  LetterStatus,
  GameStatus
} from './utils/gameLogic';

const WORD_LENGTH = 5;
const MAX_GUESSES = 6;

export default function App() {
  const [solution, setSolution] = useState(getRandomWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [usedLetters, setUsedLetters] = useState<Record<string, LetterStatus>>({});
  const [letterStatuses, setLetterStatuses] = useState<Record<number, LetterStatus[]>>({});
  const toast = useToast();

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
        toast({
          title: 'Congratulations!',
          description: `You found the word in ${newGuesses.length} ${newGuesses.length === 1 ? 'try' : 'tries'}!`,
          status: 'success',
          duration: null,
          isClosable: true,
        });
      } else if (newGuesses.length >= MAX_GUESSES) {
        setGameStatus('lost');
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
    const word = getRandomWord();
    setSolution(word);
    setGuesses([]);
    setCurrentGuess('');
    setGameStatus('playing');
    setUsedLetters({});
    setLetterStatuses({});
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
    <Box minH="100vh" bg="gray.100">
      <Navbar />
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Heading size="lg" mb={2} color="gray.800">Welcome to WordPlay!</Heading>
            <Text color="gray.600" fontSize="lg">
              It's for people that love Wordle, but hate limits. Enjoy unlimited games, challenge others and learn about words.
            </Text>
            <Text color="gray.600" fontSize="md" mt={4}>
              Daily Puzzle #65 - Thu, Mar 06
            </Text>
            <Text color="gray.500" fontSize="sm" mt={1}>
              Game ID: 401971311
            </Text>
            {gameStatus !== 'playing' && (
              <Button 
                colorScheme="teal" 
                onClick={handleNewGame}
                size="md"
                mt={4}
                px={8}
                _hover={{ transform: 'translateY(-2px)' }}
                transition="all 0.2s"
              >
                New Game
              </Button>
            )}
          </Box>
          
          <Box display="flex" justifyContent="center">
            <GameBoard
              guesses={guesses}
              currentGuess={currentGuess}
              maxGuesses={MAX_GUESSES}
              wordLength={WORD_LENGTH}
              solution={solution}
              letterStatuses={letterStatuses}
            />
          </Box>
          
          <Box mt="auto">
            <Keyboard
              onKeyPress={handleKeyPress}
              usedLetters={usedLetters}
            />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
} 