import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  HStack, 
  Text, 
  Avatar, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  useToast 
} from '@chakra-ui/react';
import { useState } from 'react';
import { NavDropdown } from './NavDropdown';
import { useAuth } from '../firebase/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LoginModal } from './LoginModal';

const aboutItems = [
  { label: 'How Do I Play?', href: '/how-to-play' },
  { label: 'What Is This?', href: '/what-is-this' },
  { label: 'Why Build This?', href: '/why-build-this' },
  { label: 'Where is the community?', href: '/community' },
];

export const Navbar = () => {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
      toast({
        title: 'Successfully logged out',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error logging out',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Box bg="gray.800" py={2} borderBottom="1px solid" borderColor="whiteAlpha.200">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <HStack spacing={8}>
              <Flex align="center" cursor="pointer" onClick={() => navigate('/')}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  <Text as="span" color="cyan.400">W</Text>
                  <Text as="span" color="green.400">O</Text>
                  <Text as="span" color="yellow.400">R</Text>
                  <Text as="span" color="red.400">D</Text>
                  <Text as="span" color="white">Puzzles</Text>
                </Text>
              </Flex>
              <HStack spacing={6} color="whiteAlpha.800">
                <Box 
                  position="relative"
                  onMouseEnter={() => setIsAboutOpen(true)}
                  onMouseLeave={() => setIsAboutOpen(false)}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    color="gray.300"
                    _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  >
                    About
                  </Button>
                  <NavDropdown
                    items={aboutItems}
                    isOpen={isAboutOpen}
                  />
                </Box>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  color="gray.300" 
                  _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  onClick={() => navigate('/games')}
                >
                  Games
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  color="gray.300" 
                  _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  onClick={() => navigate('/stats')}
                >
                  Stats
                </Button>
              </HStack>
            </HStack>
            
            <HStack spacing={4}>
              <Button 
                colorScheme="teal" 
                size="sm"
                onClick={() => navigate('/new-game')}
              >
                New Game
              </Button>
              <Button 
                colorScheme="purple" 
                size="sm"
                onClick={() => navigate('/group-challenge')}
              >
                Group Challenge
              </Button>
              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    variant="ghost"
                    size="sm"
                    color="gray.300"
                    _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  >
                    <HStack spacing={2}>
                      <Avatar size="xs" name={user.displayName || undefined} src={user.photoURL || undefined} />
                      <Text>{user.displayName}</Text>
                    </HStack>
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                    <MenuItem onClick={() => navigate('/stats')}>My Stats</MenuItem>
                    <MenuItem onClick={handleLogout}>Log Out</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  color="gray.300" 
                  _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log In
                </Button>
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}; 