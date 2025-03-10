import { Container, Heading, Text, VStack } from '@chakra-ui/react';

export const WhyBuildThis = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={4} color="gray.700">
          Why would you do this?
        </Heading>
        
        <Text color="gray.700">
        Or better yet, why would *I* do this? That's a really good question.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={3} color="gray.700">
          The Story
        </Heading>
        
        <Text color="gray.700">
          Like many others, I came across Wordle and was immediately enthralled. I've loved
          word games my whole life, and it was just fun to play. And play I did (30+ straight
          wins). 100% completion rate.
        </Text>

        <Text color="gray.700">
        One morning, I was chatting with my girlfriend while playing the Wordle over coffee (our morning routine).
        She mentioned how much she loved our morning ritual, but hated when she solved Wordle too fast, and then had to wait 24 hours for the next puzzle.
        I agreed. Why should she have to wait?
        </Text>

        <Text color="gray.700">
        That night, I decided to hack something together. I'm not a professional developer, so progress was slow. 
        This game is the result. It's not perfect. But it is built with love. 
        I hope you enjoy it after solving Wordle a little too quickly over morning coffee.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={3} color="gray.700">
          What's Next?
        </Heading>

        <Text color="gray.700">
        Well, I'm not sure. Because I am so bad at coding, I'm sure there are lots of bugs to fix. This will be a work in progress.
          I would like to add more games in the future and make them unlimited, too. It would be nice if they were all free to play. If you want to 
          get in touch with me, I may make my email public. You can send me ideas, suggestions, or just say hi. Thanks for playing!
        </Text>
      </VStack>
    </Container>
  );
}; 