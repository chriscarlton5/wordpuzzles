import { Box, Button, Container, Flex, HStack, Image, Text } from '@chakra-ui/react';

export const Navbar = () => {
  return (
    <Box bg="gray.800" py={2} borderBottom="1px solid" borderColor="whiteAlpha.200">
      <Container maxW="container.lg">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Flex align="center">
              <Text fontSize="2xl" fontWeight="bold" color="white">
                <Text as="span" color="cyan.400">W</Text>
                <Text as="span" color="green.400">O</Text>
                <Text as="span" color="yellow.400">R</Text>
                <Text as="span" color="red.400">D</Text>
                <Text as="span" color="white">Play</Text>
              </Text>
            </Flex>
            <HStack spacing={6} color="whiteAlpha.800">
              <Button variant="ghost" size="sm" color="gray.300" _hover={{ bg: 'whiteAlpha.200', color: 'white' }}>About</Button>
              <Button variant="ghost" size="sm" color="gray.300" _hover={{ bg: 'whiteAlpha.200', color: 'white' }}>Games</Button>
              <Button variant="ghost" size="sm" color="gray.300" _hover={{ bg: 'whiteAlpha.200', color: 'white' }}>Stats</Button>
              <Button variant="ghost" size="sm" color="gray.300" _hover={{ bg: 'whiteAlpha.200', color: 'white' }}>FAQ</Button>
            </HStack>
          </HStack>
          
          <HStack spacing={4}>
            <Button colorScheme="teal" size="sm">New Game</Button>
            <Button colorScheme="purple" size="sm">Group Challenge</Button>
            <Button variant="outline" size="sm" color="gray.300" _hover={{ bg: 'whiteAlpha.200', color: 'white' }}>Log In</Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}; 