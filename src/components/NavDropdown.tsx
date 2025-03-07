import { Box, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

interface NavDropdownProps {
  items: {
    label: string;
    href: string;
  }[];
  isOpen: boolean;
}

export const NavDropdown = ({ items, isOpen }: NavDropdownProps) => {
  if (!isOpen) return null;

  return (
    <Box
      position="absolute"
      top="calc(100% - 5px)"
      left="0"
      bg="white"
      boxShadow="md"
      borderRadius="md"
      py={2}
      minW="200px"
      zIndex={10}
    >
      <VStack align="stretch" spacing={0}>
        {items.map((item) => (
          <Link key={item.href} to={item.href}>
            <Text
              px={4}
              py={2}
              fontSize="sm"
              color="gray.700"
              _hover={{ bg: 'gray.50', color: 'gray.900' }}
              cursor="pointer"
              transition="all 0.2s"
            >
              {item.label}
            </Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );
}; 