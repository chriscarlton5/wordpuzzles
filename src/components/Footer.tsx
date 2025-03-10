import { FC } from 'react';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { text: 'Privacy Policy', href: '/privacy-policy' },
    { text: 'Terms of Service', href: '/terms-of-service' },
    { text: 'Terms of Sale', href: '/terms-of-sale' },
    { text: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <footer className="w-full border-t border-gray-200 bg-white py-4 px-4 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-baseline md:justify-between text-sm text-gray-600 gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>© {currentYear} Apples</span>
            <span className="hidden md:inline">|</span>
            <a href="https://apples.com" className="hover:text-gray-900">
              Apples.com
            </a>
          </div>
          
          <nav className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            {footerLinks.map((link, index) => (
              <>
                {index > 0 && (
                  <span className="hidden md:inline text-gray-300">|</span>
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