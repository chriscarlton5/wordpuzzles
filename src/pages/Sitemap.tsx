import { FC } from 'react';
import { Box, Container, Heading, VStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sitemap: FC = () => {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { name: 'Home', path: '/' },
        { name: 'How to Play', path: '/how-to-play' },
        { name: 'What is This?', path: '/what-is-this' },
        { name: 'Why Build This?', path: '/why-build-this' },
      ]
    },
    {
      title: 'User Account',
      links: [
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
        { name: 'Stats', path: '/stats' },
        { name: 'Group Challenge', path: '/group-challenge' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Terms of Service', path: '/terms-of-service' },
        { name: 'Terms of Sale', path: '/terms-of-sale' },
      ]
    }
  ];

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading as="h1" size="xl">Sitemap</Heading>
        
        {sections.map((section) => (
          <Box key={section.title}>
            <Heading as="h2" size="lg" mb={4}>{section.title}</Heading>
            <VStack spacing={2} align="stretch" pl={4}>
              {section.links.map((link) => (
                <Link
                  key={link.path}
                  as={RouterLink}
                  to={link.path}
                  color="blue.600"
                  _hover={{ color: 'blue.800', textDecoration: 'underline' }}
                >
                  {link.name}
                </Link>
              ))}
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Sitemap; 