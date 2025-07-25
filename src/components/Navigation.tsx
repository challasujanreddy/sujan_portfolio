import React, { useEffect, useRef, useState } from 'react';

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#resume' },
  { name: 'Works', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const Navigation = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll to add blur effect
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Observe Hero section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroVisible(entry.isIntersecting),
      {
        root: null,
        threshold: 0.2, // adjust sensitivity
      }
    );

    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);

    return () => {
      if (hero) observer.unobserve(hero);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hide navbar if hero not visible
  if (!isHeroVisible) return null;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-black/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center h-20">
          <div className="bg-black/80 border border-gray-700 rounded-full px-6 py-2 flex space-x-4 shadow-xl backdrop-blur-md">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-gray-300 hover:text-white font-semibold px-5 py-2 transition-all duration-300 rounded-full 
                  hover:scale-105 hover:shadow-md hover:bg-white/10"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
