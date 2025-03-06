import { Grid, GridItem } from '@chakra-ui/react';
import { LetterStatus } from '../utils/gameLogic';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  maxGuesses: number;
  wordLength: number;
  solution: string;
  letterStatuses: Record<number, LetterStatus[]>;
}

export const GameBoard = ({
  guesses,
  currentGuess,
  maxGuesses,
  wordLength,
  letterStatuses,
}: GameBoardProps) => {
  const getBackgroundColor = (rowIndex: number, colIndex: number): string => {
    if (rowIndex < guesses.length) {
      const status = letterStatuses[rowIndex]?.[colIndex];
      switch (status) {
        case 'correct':
          return 'green.500';
        case 'present':
          return 'yellow.500';
        case 'absent':
          return 'gray.600';
        default:
          return 'white';
      }
    }
    return 'white';
  };

  const getBorder = (rowIndex: number): string => {
    if (rowIndex === guesses.length) {
      return '2px solid';
    }
    return '2px solid';
  };

  const getBorderColor = (rowIndex: number): string => {
    if (rowIndex === guesses.length) {
      return 'blue.400';
    }
    if (rowIndex < guesses.length) {
      return 'gray.300';
    }
    return 'gray.200';
  };

  return (
    <Grid
      templateColumns={`repeat(${wordLength}, 1fr)`}
      gap={2}
      maxW="350px"
      mx="auto"
    >
      {Array.from({ length: maxGuesses }).map((_, rowIndex) => (
        Array.from({ length: wordLength }).map((_, colIndex) => {
          const letter = rowIndex === guesses.length
            ? currentGuess[colIndex]
            : guesses[rowIndex]?.[colIndex];

          return (
            <GridItem
              key={`${rowIndex}-${colIndex}`}
              w="60px"
              h="60px"
              bg={getBackgroundColor(rowIndex, colIndex)}
              border={getBorder(rowIndex)}
              borderColor={getBorderColor(rowIndex)}
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              fontWeight="bold"
              color={rowIndex < guesses.length ? 'white' : 'gray.800'}
              textTransform="uppercase"
              transition="all 0.2s"
              borderRadius="md"
              boxShadow="sm"
            >
              {letter}
            </GridItem>
          );
        })
      ))}
    </Grid>
  );
}; 