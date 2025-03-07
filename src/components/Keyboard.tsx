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
      return { base: '54px', md: '80px' };
    }
    return { base: '30px', md: '40px' };
  };

  return (
    <Box 
      w="100%" 
      maxW={{ base: "100%", md: "800px" }} 
      mx="auto" 
      px={{ base: 0, md: 2 }}
    >
      <VStack spacing={{ base: 1, md: 2 }}>
        {KEYBOARD_ROWS.map((row, i) => (
          <HStack key={i} spacing={{ base: 1, md: 2 }} justifyContent="center">
            {row.map((key) => (
              <Button
                key={key}
                onClick={() => onKeyPress(key)}
                bg={getKeyColor(key)}
                color={getKeyColor(key) === 'white' ? 'gray.800' : 'white'}
                w={getKeyWidth(key)}
                h={{ base: '42px', md: '45px' }}
                minW={0}
                p={0}
                fontSize={{ base: key.length > 1 ? '11px' : '14px', md: key.length > 1 ? 'sm' : 'md' }}
                fontWeight="medium"
                _hover={{ opacity: 0.8 }}
                _active={{ transform: 'scale(0.95)' }}
                transition="all 0.2s"
                borderRadius={{ base: 'sm', md: 'md' }}
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