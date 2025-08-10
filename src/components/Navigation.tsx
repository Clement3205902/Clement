'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, MessageSquare, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            Clement Ahorsu
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="#about" className="hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-orange-500 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-orange-500 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="hover:text-orange-500 transition-colors">
              Contact
            </Link>
            
            {/* Auth Buttons */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/chat" 
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Chat with Clement</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
                <span className="text-sm text-gray-300">
                  {currentUser.displayName || currentUser.email}
                </span>
              </div>
            ) : (
              <Link 
                href="/auth/login" 
                className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
              >
                <LogIn size={16} />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-4">
            <Link href="/" className="block hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="#about" className="block hover:text-orange-500 transition-colors">
              About
            </Link>
            <Link href="#skills" className="block hover:text-orange-500 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="block hover:text-orange-500 transition-colors">
              Projects
            </Link>
            <Link href="#contact" className="block hover:text-orange-500 transition-colors">
              Contact
            </Link>
            
            {currentUser ? (
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Link 
                  href="/chat" 
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <MessageSquare size={16} />
                  <span>Chat with Clement</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 border border-white/20 hover:bg-white/10 px-4 py-2 rounded-lg transition-colors w-full"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
                <div className="text-sm text-gray-300">
                  {currentUser.displayName || currentUser.email}
                </div>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10">
                <Link 
                  href="/auth/login" 
                  className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded-lg transition-colors"
                >
                  <LogIn size={16} />
                  <span>Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}