import React, { useState } from 'react';
import { Box, Button, VStack, Text, useToast, Input, FormControl, FormLabel, Image } from '@chakra-ui/react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const { signUpWithEmail } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter your first name',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      await signUpWithEmail(email, password, firstName.trim());
      toast({
        title: 'Account created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/'); // Redirect to home page after successful sign up
    } catch (error: any) {
      let errorMessage = 'Please check your email and password';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Please enter a valid email address.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
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
          Create Your Account
        </Text>
        <Text textAlign="center" color="gray.600">
          Join WordPuzzles to save your game statistics and challenge your friends!
        </Text>

        <form onSubmit={handleSignUp} style={{ width: '100%' }}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </FormControl>
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
                placeholder="Create a password"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </FormControl>
            <Button
              type="submit"
              w="full"
              colorScheme="teal"
              isLoading={isLoading}
            >
              Create Account
            </Button>
          </VStack>
        </form>

        <Button
          variant="link"
          colorScheme="teal"
          onClick={() => navigate('/login')}
          textDecoration="underline"
          _hover={{ textDecoration: 'none' }}
        >
          Already have an account? Sign in
        </Button>
      </VStack>
    </Box>
  );
};

export default SignUp; 