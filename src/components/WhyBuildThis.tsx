import { Container, Heading, Text, VStack } from '@chakra-ui/react';

export const WhyBuildThis = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={4} color="gray.700">
          Why would you do this?
        </Heading>
        
        <Text color="gray.700">
          Or better yet, why would *I* do this? That's a really good question. My wife has asked
          me the same question.
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
          One weekend, I was chatting with my 11 year old who is taking Python programming
          classes. He's still very, very early in his programming journey. But, I wanted to show
          him what was possible with programming by actually developing an application and
          launching it to the public.
        </Text>

        <Text color="gray.700">
          So, that night, I decided to hack something together. It was partly to inspire my son,
          partly to scratch my own itch and partly to help me learn about some newer
          technologies. I learn by doing. Also, I really love building things. Some people have a
          woodshop and build cool things with their hands. I don't have that skill. But, I have a
          MacBook Pro and like to build things with my fingers.
        </Text>

        <Heading as="h2" size="lg" mt={6} mb={3} color="gray.700">
          The Launch
        </Heading>

        <Text color="gray.700">
          The first feature in WordPuzzles wasn't actually the game, it was called "First Word" -- and
          it was a tool to help you figure out how "good" your first guess was. But, I soon decided
          that it's really hard to get better at the game (and pick better words) if you can't
          actually try it out by "playing" the game. And, as it turns out, writing the app to play the
          game was easier than the analytics tool to grade your first word. And, so WordPuzzles was
          born.
        </Text>
      </VStack>
    </Container>
  );
}; 