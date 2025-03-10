import { FC } from 'react';
import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';

const TermsOfService: FC = () => {
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl">Terms of Service</Heading>
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>1. Acceptance of Terms</Heading>
          <Text mb={4}>
            By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>2. Use License</Heading>
          <Text mb={4}>
            Permission is granted to temporarily access the materials (information or software) on our website for personal, non-commercial transitory viewing only.
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">Modify or copy the materials</Text>
            <Text as="li">Use the materials for any commercial purpose</Text>
            <Text as="li">Attempt to decompile or reverse engineer any software contained on the website</Text>
            <Text as="li">Remove any copyright or other proprietary notations from the materials</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>3. User Account</Heading>
          <Text mb={4}>
            To access certain features of the website, you may be required to create an account. You are responsible for:
          </Text>
          <Text as="ul" pl={5} mb={4}>
            <Text as="li">Maintaining the confidentiality of your account</Text>
            <Text as="li">All activities that occur under your account</Text>
            <Text as="li">Notifying us immediately of any unauthorized use</Text>
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>4. Disclaimer</Heading>
          <Text mb={4}>
            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>5. Limitations</Heading>
          <Text mb={4}>
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>6. Governing Law</Heading>
          <Text mb={4}>
            These terms and conditions are governed by and construed in accordance with the laws and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default TermsOfService; 