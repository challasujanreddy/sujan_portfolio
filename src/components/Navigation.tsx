import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#resume' },
  { name: 'Works', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [active, setActive] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);

  // ✅ Optimized scroll handler with useCallback
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);

    // Find active section (reverse order for priority)
    const currentActive = NAV_LINKS.slice().reverse().find((link) => {
      const section = document.querySelector(link.href) as HTMLElement | null;
      if (section) {
        const rect = section.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });

    setActive(currentActive ? currentActive.href : '#hero');
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'backdrop-blur-md bg-black/70 border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-center items-center h-20">
          <motion.div
            layout
            className="
              bg-black/80 border border-indigo-900/40 rounded-full shadow-2xl backdrop-blur-md
              flex items-center
              px-6 sm:px-8 md:px-10 lg:px-12 py-3
              transition-all duration-300
            "
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center space-x-3 sm:space-x-5 md:space-x-7">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.35 }}
                  whileHover={{ 
                    y: -2,
                    scale: 1.05
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    btn-nav text-gray-300 hover:text-white hover:bg-white/5
                    transition-all duration-200
                    ${active === link.href 
                      ? 'text-white font-semibold border-b-2 border-indigo-400 pb-1' 
                      : 'pb-1'
                    }
                  `}
                  aria-current={active === link.href ? 'page' : undefined}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </nav>
    </motion.header>
  );
};