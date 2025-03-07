import React, { useState } from 'react';
import { Box, Button, VStack, Text, useToast, Input, FormControl, FormLabel, Image, HStack } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Login: React.FC = () => {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Log when component mounts and when location changes
  React.useEffect(() => {
    console.log('Login component mounted');
    console.log('Current location:', location.pathname);
  }, [location]);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      toast({
        title: 'Successfully signed in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redirect to home page after successful sign in
    } catch (error) {
      toast({
        title: 'Error signing in',
        description: 'Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signInWithEmail(email, password);
      toast({
        title: 'Successfully signed in!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redirect to home page after successful sign in
    } catch (error: any) {
      let errorMessage = 'Please check your email and password';
      if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      }
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    console.log('Sign Up button clicked');
    navigate('/signup');
  };

  return (
    <Box
      p={8}
      maxWidth="500px"
      borderWidth={1}
      borderRadius={8}
      boxShadow="lg"
      bg="white"
      mx="auto"
      mt={8}
    >
      <VStack spacing={6}>
        <Image
          src="/wordpuzzles-logo.svg"
          alt="WordPuzzles Logo"
          height="60px"
          mb={4}
        />
        <Text fontSize="2xl" fontWeight="bold">
          Welcome to WordPuzzles
        </Text>
        <Text textAlign="center" color="gray.600">
          Sign in to save your game statistics and challenge your friends!
        </Text>

        <form onSubmit={handleEmailSignIn} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </FormControl>
            <Button
              type="submit"
              w="full"
              colorScheme="teal"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </VStack>
        </form>

        <HStack spacing={2}>
          <Text color="gray.600">
            Don't have an account?
          </Text>
          <Button
            variant="link"
            colorScheme="teal"
            onClick={handleSignUpClick}
            textDecoration="underline"
            _hover={{ textDecoration: 'none' }}
            cursor="pointer"
          >
            Sign Up
          </Button>
        </HStack>

        <Text>OR</Text>

        <Button
          w="full"
          variant="outline"
          leftIcon={<FcGoogle />}
          onClick={handleGoogleSignIn}
          size="lg"
          isLoading={isLoading}
        >
          Sign in with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default Login; 