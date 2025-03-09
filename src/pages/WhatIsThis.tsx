import { Box, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { FaGamepad, FaGraduationCap, FaHeart } from 'react-icons/fa';

export const WhatIsThis = () => {
  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            WordPuzzles - The Totally Unofficial
          </Heading>
          <Heading as="h2" size="lg" color="gray.600" mb={6}>
            Wordle Practice Game
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Do you love word games? So do I. A lot.
          </Text>
        </Box>

        <Box>
          <Heading as="h3" size="lg" mb={6}>
            What is this?
          </Heading>
          <Text color="gray.600" fontSize="md" mb={4}>
            Simple. WordPuzzles is a word guessing game similar to the web game Wordle (and based on the concept in the TV game show Lingo). You may also know it as the game with green and yellow squares.
          </Text>
          <Text color="gray.600" fontSize="md" mb={4}>
            IMPORTANT NOTE: WordPuzzles is not associated with Wordle in any way. I'm just a fan of Wordle (like millions of others) and wanted a way to practice/play the game more. Wordle is now owned by The New York Times.
          </Text>
          <Text color="gray.600" fontSize="md" mb={4}>
            OK, fine. But how is this different from the official Wordle? Why would I play this instead of Wordle? You wouldn't. I still play Wordle every day. But in-between, I play WordPuzzles. And, if I want to challenge friends, I play WordPuzzles.
          </Text>
          <Text color="gray.600" fontSize="md" mb={8}>
            But, there are some differences. WordPuzzles is better in some ways, and not-so-better in others.
          </Text>
        </Box>

        <VStack spacing={6} align="stretch">
          <Box p={6} borderRadius="lg" bg="white" boxShadow="sm">
            <VStack align="start" spacing={3}>
              <Box display="flex" alignItems="center" gap={3}>
                <Icon as={FaGamepad} boxSize={6} color="teal.500" />
                <Heading as="h4" size="md">Practice as much as you want</Heading>
              </Box>
              <Text color="gray.600">
                You get better with practice. And, it's hard to get better when you can only play once a day. WordPuzzles lets you practice/play as much as you want.
              </Text>
            </VStack>
          </Box>

          <Box p={6} borderRadius="lg" bg="white" boxShadow="sm">
            <VStack align="start" spacing={3}>
              <Box display="flex" alignItems="center" gap={3}>
                <Icon as={FaHeart} boxSize={6} color="red.500" />
                <Heading as="h4" size="md">It's free, not 'free for now'</Heading>
              </Box>
              <Text color="gray.600">
                WordPuzzles is a nights/weekends project for me. I do it for fun and to bring joy to others. It is free to play and will not be put behind a pay wall.
              </Text>
            </VStack>
          </Box>

          <Box p={6} borderRadius="lg" bg="white" boxShadow="sm">
            <VStack align="start" spacing={3}>
              <Box display="flex" alignItems="center" gap={3}>
                <Icon as={FaGraduationCap} boxSize={6} color="purple.500" />
                <Heading as="h4" size="md">It's educational -- sort of</Heading>
              </Box>
              <Text color="gray.600">
                Word games are fun, but they also help keep your brain sharp. The more you can play, the more you can learn!
              </Text>
            </VStack>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
}; 