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
  HStack
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const handleSignUpClick = () => {
    onClose(); // Close the modal first
    navigate('/signup'); // Then navigate to signup
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
              alt="WordPuzzles Logo"
              height="60px"
              mx="auto"
            />
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">
              Welcome Back
            </Text>
            <Text textAlign="center" color="gray.600">
              Sign in to save your game statistics and challenge your friends!
            </Text>

            <form onSubmit={(e) => {
              e.preventDefault();
              // Handle email sign in
            }}>
              <VStack spacing={4}>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                    />
                  </InputRightElement>
                </InputGroup>
                <Button type="submit" colorScheme="teal" width="full">
                  Sign In
                </Button>
              </VStack>
            </form>

            <HStack spacing={2} justify="center">
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

            <Divider />

            <Button
              leftIcon={<FcGoogle />}
              variant="outline"
              onClick={handleGoogleSignIn}
              width="full"
            >
              Sign in with Google
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}; 