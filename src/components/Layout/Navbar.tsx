import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useAppContext } from '../../context/AppContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAppContext();

  const navLinks = user
    ? [
        { name: 'Home', path: '/' },
        { name: user.role === 'admin' ? 'Admin Dashboard' : 'Dashboard', path: user.role === 'admin' ? '/admin' : '/dashboard' },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Sign In', path: '/signin' },
        { name: 'Sign Up', path: '/signup' },
      ];

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 overflow-hidden group-hover:border-indigo-500/50 transition-colors shadow-sm">
                {/* Fallback icon in case image fails, but we try to load the FCN logo */}
                {/* <HeartPulse className="w-5 h-5 text-indigo-500 absolute" /> */}
                <img 
                  src="../../../assets/hero.png" 
                  alt="FCN Logo" 
                  className="w-full h-full object-cover relative z-10"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-900 font-bold text-lg leading-tight tracking-tight">FCN</span>
                <span className="text-indigo-600 text-[10px] uppercase font-semibold tracking-wider">Amilegbe UITH</span>
              </div>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-rose-600 hover:bg-rose-50 transition-all duration-300"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-slate-900"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl" 
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-600'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-rose-600 hover:bg-rose-50"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
