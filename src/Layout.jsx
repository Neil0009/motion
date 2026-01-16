import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { createPageUrl } from './utils';
import { base44 } from '@/api/base44Client';

const navItems = [
  { name: 'Services', href: '#services' },
  { name: 'Process', href: '#process' },
  { name: 'Portfolio', href: createPageUrl('Portfolio') },
  { name: 'Industries', href: '#industries' },
  { name: 'Contact', href: '#contact' },
  { name: 'Client Portal', href: createPageUrl('ClientPortal'), requireAuth: true },
];

export default function Layout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await base44.auth.isAuthenticated();
      setIsAuthenticated(authStatus);
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', sans-serif;
        }
        
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #0a0a0a;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #444;
        }

        ::selection {
          background: rgba(0, 212, 255, 0.3);
          color: white;
        }
      `}</style>

      {/* Navigation */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-400 flex items-center justify-center">
                <span className="text-black font-bold text-lg">SN</span>
              </div>
              <span className="text-xl font-bold text-white">
                studio<span className="text-cyan-400">nakxal</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                if (item.requireAuth && !isAuthenticated) return null;
                
                return item.name === 'Portfolio' || item.name === 'Client Portal' ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm font-medium transition-colors relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                  </a>
                );
              })}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold text-sm hover:from-cyan-400 hover:to-cyan-300 transition-all"
              >
                Get Quote
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06]"
            >
              <div className="px-6 py-6 space-y-4">
                {navItems.map((item) => {
                  if (item.requireAuth && !isAuthenticated) return null;
                  
                  return item.name === 'Portfolio' || item.name === 'Client Portal' ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-400 hover:text-white text-lg font-medium py-2 transition-colors"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-gray-400 hover:text-white text-lg font-medium py-2 transition-colors"
                    >
                      {item.name}
                    </a>
                  );
                })}
                <button className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 text-black font-semibold">
                  Get Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
}