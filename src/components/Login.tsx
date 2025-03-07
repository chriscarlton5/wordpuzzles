import React from 'react';
import { Box, Button, VStack, Text, useToast } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../firebase/AuthContext';

const Login: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const toast = useToast();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast({
        title: 'Successfully signed in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error signing in',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      p={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg="white"
    >
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Welcome to WordPuzzle
        </Text>
        <Text textAlign="center" color="gray.600">
          Sign in to save your game statistics and challenge your friends!
        </Text>
        <Button
          w="full"
          variant="outline"
          leftIcon={<FcGoogle />}
          onClick={handleGoogleSignIn}
          size="lg"
        >
          Sign in with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default Login; 