'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { name: 'Introducción', href: '#intro' },
    { name: 'CSR', href: '#csr' },
    { name: 'SSG', href: '#ssg' },
    { name: 'ISR', href: '#isr' },
    { name: 'SSR', href: '#ssr' },
    { name: 'Streaming', href: '#streaming' },
    { name: 'PPR', href: '#ppr' },
    { name: 'RSC', href: '#rsc' },
    { name: 'Conclusiones', href: '#conclusion' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            🚀 RPTI DxP 🚀
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            >
              {item.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Endikaorve/renderizados-web"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-700 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
            aria-label="GitHub Repository"
          >
            <Github className="h-5 w-5" />
          </a>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950"
          >
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map(item => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
