import { Box, Container, Heading, Text, VStack, Grid, GridItem } from '@chakra-ui/react';

export const HowToPlay = () => {
  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={4}>
            How to play
          </Heading>
          <Text color="gray.600" fontSize="lg">
            Try to guess the word in 6 tries. After each guess, the color of the tiles will change
            to show how close your guess was to the word.
          </Text>
        </Box>

        {/* Example 1 */}
        <Box>
          <Grid templateColumns="repeat(5, 60px)" gap={2} mx="auto" maxW="fit-content" mb={4}>
            <GridItem
              w="60px"
              h="60px"
              bg="green.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              borderRadius="md"
            >
              S
            </GridItem>
            {['M', 'I', 'L', 'E'].map((letter) => (
              <GridItem
                key={letter}
                w="60px"
                h="60px"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                borderRadius="md"
              >
                {letter}
              </GridItem>
            ))}
          </Grid>
          <Text color="gray.600" textAlign="center">
            The letter S is in the word and in the correct spot.
          </Text>
        </Box>

        {/* Example 2 */}
        <Box>
          <Grid templateColumns="repeat(5, 60px)" gap={2} mx="auto" maxW="fit-content" mb={4}>
            {['L', 'A'].map((letter) => (
              <GridItem
                key={letter}
                w="60px"
                h="60px"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                borderRadius="md"
              >
                {letter}
              </GridItem>
            ))}
            <GridItem
              w="60px"
              h="60px"
              bg="yellow.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              borderRadius="md"
            >
              U
            </GridItem>
            {['G', 'H'].map((letter) => (
              <GridItem
                key={letter}
                w="60px"
                h="60px"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                borderRadius="md"
              >
                {letter}
              </GridItem>
            ))}
          </Grid>
          <Text color="gray.600" textAlign="center">
            The letter U is in the word but in the wrong spot.
          </Text>
        </Box>

        {/* Example 3 */}
        <Box>
          <Grid templateColumns="repeat(5, 60px)" gap={2} mx="auto" maxW="fit-content" mb={4}>
            {['E', 'N', 'J'].map((letter) => (
              <GridItem
                key={letter}
                w="60px"
                h="60px"
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="bold"
                color="gray.800"
                borderRadius="md"
              >
                {letter}
              </GridItem>
            ))}
            <GridItem
              w="60px"
              h="60px"
              bg="gray.600"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              fontWeight="bold"
              color="white"
              borderRadius="md"
            >
              O
            </GridItem>
            <GridItem
              w="60px"
              h="60px"
              bg="white"
              border="2px solid"
              borderColor="gray.200"
              display="flex"
              alignItems="center"
              justifyContent="center"
              fontSize="2xl"
              fontWeight="bold"
              color="gray.800"
              borderRadius="md"
            >
              Y
            </GridItem>
          </Grid>
          <Text color="gray.600" textAlign="center">
            The letter O is not in the word in any spot.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}; 