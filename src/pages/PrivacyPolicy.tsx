import { FC } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const PrivacyPolicy: FC = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Privacy Policy</Heading>
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>Information We Collect</Heading>
          <Text mb={4}>
            We collect information that you provide directly to us when you:
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">Create an account</Text>
            <Text as="li">Play games</Text>
            <Text as="li">Share game results</Text>
            <Text as="li">Communicate with us</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>How We Use Your Information</Heading>
          <Text mb={4}>
            We use the information we collect to:
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">Provide and improve our services</Text>
            <Text as="li">Personalize your experience</Text>
            <Text as="li">Communicate with you</Text>
            <Text as="li">Monitor and analyze trends and usage</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Information Sharing</Heading>
          <Text mb={4}>
            We do not share your personal information with third parties except:
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">With your consent</Text>
            <Text as="li">To comply with legal obligations</Text>
            <Text as="li">To protect our rights and the rights of others</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Data Security</Heading>
          <Text mb={4}>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Your Rights</Heading>
          <Text mb={4}>
            You have the right to:
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">Access your personal information</Text>
            <Text as="li">Correct inaccurate information</Text>
            <Text as="li">Request deletion of your information</Text>
            <Text as="li">Object to processing of your information</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>Contact Us</Heading>
          <Text>
            If you have any questions about this Privacy Policy, please contact us at privacy@apples.com
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default PrivacyPolicy; 