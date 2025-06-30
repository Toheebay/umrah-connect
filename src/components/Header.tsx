
import React, { useState } from 'react';
import { Menu, X, Globe, User, Bell, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const location = useLocation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' }
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-emerald-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-islamic rounded-full flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold text-lg">حج</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold bg-gradient-islamic bg-clip-text text-transparent">
                UmrahConnect
              </h1>
              <p className="text-xs text-gray-600">Hajj & Umrah Platform</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/community" 
              className={`font-medium transition-colors ${
                isActive('/community') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Community
            </Link>
            <Link 
              to="/agents" 
              className={`font-medium transition-colors ${
                isActive('/agents') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Agents
            </Link>
            <Link 
              to="/support" 
              className={`font-medium transition-colors ${
                isActive('/support') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
              }`}
            >
              Support
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-gray-700 hover:text-emerald-600"
                onClick={() => {
                  const nextLang = languages[(languages.findIndex(l => l.code === language) + 1) % languages.length];
                  setLanguage(nextLang.code);
                }}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{languages.find(l => l.code === language)?.flag}</span>
              </Button>
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4 text-gray-700 hover:text-emerald-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="sm" className="relative">
              <MessageCircle className="w-4 h-4 text-gray-700 hover:text-emerald-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full"></span>
            </Button>

            {/* User Profile */}
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <User className="w-4 h-4 text-gray-700" />
              <span className="hidden sm:inline text-gray-700">Profile</span>
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-emerald-100">
            <nav className="flex flex-col space-y-3 pt-4">
              <Link 
                to="/" 
                className={`font-medium transition-colors py-2 ${
                  isActive('/') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/community" 
                className={`font-medium transition-colors py-2 ${
                  isActive('/community') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link 
                to="/agents" 
                className={`font-medium transition-colors py-2 ${
                  isActive('/agents') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Agents
              </Link>
              <Link 
                to="/support" 
                className={`font-medium transition-colors py-2 ${
                  isActive('/support') ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
                }`}
                onClick={() => setIsMenuO(false)}
              >
                Support
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
