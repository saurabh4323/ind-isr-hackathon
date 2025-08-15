'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { Menu, X, Trophy, Gamepad2, BarChart3, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-lg border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <Gamepad2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">RehabGames</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/games" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Games
            </Link>
            <Link href="/progress" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Progress
            </Link>
            <Link href="/achievements" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
              Achievements
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login" className="text-gray-700 hover:text-green-600 transition-colors duration-200">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-green-100">
              <Link href="/games" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                Games
              </Link>
              <Link href="/progress" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                Progress
              </Link>
              <Link href="/achievements" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                Achievements
              </Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                    Login
                  </Link>
                  <Link href="/register" className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors duration-200">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
