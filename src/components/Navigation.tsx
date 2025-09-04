import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#resume' },
  { name: 'Works', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  // Note: The 'active' state logic is no longer used for styling but is kept
  // in case you want to use it for other things, like ARIA attributes.
  const [active, setActive] = useState('#hero');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      const currentActive = NAV_LINKS.slice()
        .reverse()
        .find((link) => {
          const section = document.querySelector(link.href) as HTMLElement | null;
          if (section) {
            return section.getBoundingClientRect().top <= 150;
          }
          return false;
        });
      if (currentActive) {
        setActive(currentActive.href);
      } else {
        setActive('#hero');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md bg-black/70' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-center items-center h-20">
          <motion.div
            layout
            className="
              bg-black/80 border border-indigo-900/40 rounded-full shadow-2xl backdrop-blur-md
              flex items-center
              px-8 sm:px-10 lg:px-12 py-3
            "
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
          >
            <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.35 }}
                  whileHover={{ y: -2 }}
                  // CHANGED: All buttons now have the same consistent style
                  className="btn-nav text-gray-300 hover:text-white hover:bg-white/5"
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