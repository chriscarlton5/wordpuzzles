import React, { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Input,
  Button,
  Switch,
  FormControl,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import { generateGameId, generateShareUrl, setCustomChallengeWord } from '../utils/gameSharing';

export const GroupChallenge: React.FC = () => {
  const [challengeName, setChallengeName] = useState('');
  const [useCustomWord, setUseCustomWord] = useState(false);
  const [customWord, setCustomWord] = useState('');
  const toast = useToast();

  const handleCreateChallenge = () => {
    if (!challengeName.trim()) {
      toast({
        title: 'Challenge name required',
        description: 'Please enter a name for your challenge.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (useCustomWord && (!customWord.trim() || customWord.length !== 5)) {
      toast({
        title: 'Invalid custom word',
        description: 'Please enter a 5-letter word for your challenge.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Generate a game ID and create share URL
    const gameId = generateGameId();
    
    // If using custom word, store it
    if (useCustomWord && customWord) {
      setCustomChallengeWord(gameId, customWord);
    }

    const shareUrl = generateShareUrl(gameId);

    // Show success message with share URL
    toast({
      title: 'Challenge Created!',
      description: 'The challenge link has been copied to your clipboard. Share it with your friends to start the challenge!',
      status: 'success',
      duration: null,
      isClosable: true,
    });

    // Copy to clipboard
    navigator.clipboard.writeText(shareUrl);
  };

  const handleCustomWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    // Only allow letters
    if (/^[a-z]*$/.test(value) && value.length <= 5) {
      setCustomWord(value);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            Create Group Challenge
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Create a WordPlay challenge to play with your friends and family. Enter
            a simple name for the challenge, and we'll create a link you can send to
            the group.
          </Text>
        </Box>

        <Box bg="white" p={6} borderRadius="lg" boxShadow="sm">
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel>Enter Challenge Name</FormLabel>
              <Input
                value={challengeName}
                onChange={(e) => setChallengeName(e.target.value)}
                placeholder="Climbing Sleepily Challenge"
                size="lg"
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">
                Enter Custom Challenge Word
              </FormLabel>
              <Switch
                colorScheme="purple"
                isChecked={useCustomWord}
                onChange={(e) => setUseCustomWord(e.target.checked)}
              />
            </FormControl>

            {useCustomWord && (
              <FormControl>
                <FormLabel>Custom Word (5 letters)</FormLabel>
                <Input
                  value={customWord}
                  onChange={handleCustomWordChange}
                  placeholder="Enter a 5-letter word"
                  size="lg"
                  maxLength={5}
                />
                <Text fontSize="sm" color="gray.500" mt={1}>
                  {customWord.length}/5 letters
                </Text>
              </FormControl>
            )}

            <Button
              colorScheme="purple"
              size="lg"
              onClick={handleCreateChallenge}
            >
              Create Challenge
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}; 