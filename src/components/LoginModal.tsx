import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Button,
  VStack,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  Divider,
  Box,
  HStack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="400px" p={4}>
        <ModalBody>
          <VStack spacing={6} align="stretch">
            {/* Logo */}
            <Image
              src="/wordpuzzles-logo.svg"
              alt="WordPuzzles.org Logo"
              mx="auto"
              h="60px"
              objectFit="contain"
            />

            {/* Welcome Text */}
            <VStack spacing={2}>
              <Text fontSize="2xl" fontWeight="medium">Welcome</Text>
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Log in to WordPuzzles.org to continue to WordPuzzles.org.
              </Text>
            </VStack>

            {/* Login Form */}
            <VStack spacing={4}>
              <Input
                placeholder="Email address*"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="lg"
              />

              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    variant="ghost"
                  />
                </InputRightElement>
              </InputGroup>

              <Text
                color="blue.500"
                fontSize="sm"
                cursor="pointer"
                alignSelf="flex-start"
                _hover={{ textDecoration: 'underline' }}
              >
                Forgot password?
              </Text>

              <Button
                colorScheme="blue"
                size="lg"
                width="100%"
                onClick={() => {/* TODO: Implement email/password login */}}
              >
                Continue
              </Button>
            </VStack>

            {/* Sign Up Link */}
            <HStack spacing={1} justify="center">
              <Text fontSize="sm">Don't have an account?</Text>
              <Text
                fontSize="sm"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
              >
                Sign up
              </Text>
            </HStack>

            {/* Divider */}
            <HStack>
              <Divider />
              <Text fontSize="sm" color="gray.500" px={4}>
                OR
              </Text>
              <Divider />
            </HStack>

            {/* Google Sign In */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleGoogleSignIn}
              leftIcon={
                <Image
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google"
                  w="18px"
                  h="18px"
                />
              }
            >
              Continue with Google
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 