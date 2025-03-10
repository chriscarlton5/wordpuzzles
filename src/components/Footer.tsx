import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: 'Privacy Policy', href: '/privacy-policy' },
    { text: 'Terms of Service', href: '/terms-of-service' },
    { text: 'Terms of Sale', href: '/terms-of-sale' },
    { text: 'Sitemap', href: '/sitemap' },
    { text: 'Contact', href: '/contact' }
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-4 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center text-sm text-gray-600 gap-4">
          <div className="flex items-center gap-4">
            <span>© {currentYear} WordPuzzles.org</span>
          </div>
          
          <nav className="flex flex-wrap justify-center items-center gap-4">
            {footerLinks.map((link, index) => (
              <>
                {index > 0 && (
                  <span className="text-gray-300 mx-2">|</span>
                )}
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-gray-900 transition-colors"
                >
                  {link.text}
                </a>
              </>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 