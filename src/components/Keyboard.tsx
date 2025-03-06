import React from 'react';
import { Box, Button, HStack, VStack } from '@chakra-ui/react';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  usedLetters: Record<string, 'correct' | 'present' | 'absent' | undefined>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE']
];

export const Keyboard = ({ onKeyPress, usedLetters }: KeyboardProps) => {
  const getKeyColor = (key: string) => {
    const status = usedLetters[key];
    switch (status) {
      case 'correct':
        return 'green.500';
      case 'present':
        return 'yellow.500';
      case 'absent':
        return 'gray.400';
      default:
        return 'white';
    }
  };

  const getKeyWidth = (key: string) => {
    if (key === 'ENTER' || key === 'DELETE') {
      return { base: '70px', md: '80px' };
    }
    return { base: '35px', md: '40px' };
  };

  return (
    <Box w="100%" maxW="800px" mx="auto" px={2}>
      <VStack spacing={1}>
        {KEYBOARD_ROWS.map((row, i) => (
          <HStack key={i} spacing={1} justifyContent="center">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() => onKeyPress(key)}
                bg={getKeyColor(key)}
                color={getKeyColor(key) === 'white' ? 'gray.800' : 'white'}
                w={getKeyWidth(key)}
                h={{ base: '40px', md: '45px' }}
                p={1}
                fontSize={{ base: key.length > 1 ? 'xs' : 'sm', md: key.length > 1 ? 'sm' : 'md' }}
                fontWeight="medium"
                _hover={{ opacity: 0.8 }}
                _active={{ transform: 'scale(0.95)' }}
                transition="all 0.2s"
                borderRadius="md"
              >
                {key}
              </Button>
            ))}
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}; 