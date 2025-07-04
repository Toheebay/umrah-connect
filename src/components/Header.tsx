
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@umrahconnect.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Serving Worldwide</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-islamic rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">U</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">UmrahConnect</h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Your Sacred Journey Partner</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Home</a>
            <a href="/community" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Community</a>
            <a href="/agents" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Agents</a>
            <a href="/support" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors">Support</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              <a href="/auth">Sign In</a>
            </Button>
            <Button className="bg-gradient-islamic hover:opacity-90 text-white">
              <a href="/auth">Get Started</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="/" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-2 py-1">Home</a>
              <a href="/community" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-2 py-1">Community</a>
              <a href="/agents" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-2 py-1">Agents</a>
              <a href="/support" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-2 py-1">Support</a>
              <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 w-full">
                  <a href="/auth">Sign In</a>
                </Button>
                <Button className="bg-gradient-islamic hover:opacity-90 text-white w-full">
                  <a href="/auth">Get Started</a>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
