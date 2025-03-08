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
  useToast,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  useBreakpointValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
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
  const [isDesktopAboutOpen, setIsDesktopAboutOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const isMobile = useBreakpointValue({ base: true, md: false });

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

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose(); // Close the drawer when navigating
    }
  };

  const NavigationItems = () => (
    <>
      {isMobile ? (
        <VStack spacing={2} align="stretch" width="100%">
          {/* About Section */}
          <Button
            variant="ghost"
            size="sm"
            color="gray.300"
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={2}
            display="flex"
            alignItems="center"
          >
            About
          </Button>
          {isMobileAboutOpen && (
            <VStack align="stretch" spacing={2}>
              {aboutItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  color="gray.300"
                  _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
                  onClick={() => handleNavigation(item.href)}
                  w="full"
                  justifyContent="flex-start"
                  px={8}
                  py={2}
                >
                  {item.label}
                </Button>
              ))}
            </VStack>
          )}
          
          {/* Games and Stats */}
          <Button 
            variant="ghost" 
            size="sm"
            color="gray.300" 
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => handleNavigation('/games')}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={2}
          >
            Games
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            color="gray.300" 
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => handleNavigation('/stats')}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={2}
          >
            Stats
          </Button>

          {/* Action Buttons */}
          <Button 
            colorScheme="teal" 
            size="sm"
            onClick={() => handleNavigation('/new-game')}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={2}
          >
            New Game
          </Button>
          <Button 
            colorScheme="purple" 
            size="sm"
            onClick={() => handleNavigation('/group-challenge')}
            w="full"
            justifyContent="flex-start"
            px={4}
            py={2}
          >
            Group Challenge
          </Button>
        </VStack>
      ) : (
        <>
          <Box 
            position="relative"
            onMouseEnter={() => setIsDesktopAboutOpen(true)}
            onMouseLeave={() => setIsDesktopAboutOpen(false)}
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
              isOpen={isDesktopAboutOpen}
            />
          </Box>
          <Button 
            variant="ghost" 
            size="sm" 
            color="gray.300" 
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => handleNavigation('/games')}
          >
            Games
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            color="gray.300" 
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => handleNavigation('/stats')}
          >
            Stats
          </Button>
        </>
      )}
    </>
  );

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
              {!isMobile && (
                <HStack spacing={6} color="whiteAlpha.800">
                  <NavigationItems />
                </HStack>
              )}
            </HStack>
            
            <HStack spacing={4}>
              {!isMobile && (
                <>
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
                </>
              )}
              {isMobile && (
                <IconButton
                  aria-label="Open menu"
                  icon={<HamburgerIcon />}
                  variant="ghost"
                  color="white"
                  onClick={onOpen}
                />
              )}
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

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              <NavigationItems />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
}; 