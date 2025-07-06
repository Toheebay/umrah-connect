
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Menu, X, MessageCircle, Users } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-emerald-100">
      {/* Top Bar */}
      <div className="bg-gradient-islamic text-white py-2 hidden sm:block">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 animate-fade-in">
              <Phone className="w-4 h-4 animate-sparkle" />
              <span>+1 (555) HAJJ-HELP</span>
            </div>
            <div className="flex items-center space-x-2 animate-fade-in">
              <Mail className="w-4 h-4 animate-sparkle" />
              <span>support@hajjcommunity.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 animate-fade-in">
            <MapPin className="w-4 h-4 animate-sparkle" />
            <span>Serving Muslims Worldwide 🌍</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 hover-lift cursor-pointer">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-islamic rounded-2xl flex items-center justify-center shadow-lg animate-pulse-glow">
              <span className="text-white font-bold text-xl sm:text-2xl">🕋</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-islamic bg-clip-text text-transparent">
                Hajj Community
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                ✨ Your Sacred Journey Companion
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-all hover-lift">
              <MessageCircle className="w-4 h-4" />
              <span>Live Chat</span>
            </a>
            <a href="/community" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-all hover-lift">
              <Users className="w-4 h-4" />
              <span>Community</span>
            </a>
            <a href="/agents" className="text-gray-700 hover:text-emerald-600 font-medium transition-all hover-lift">Agents</a>
            <a href="/support" className="text-gray-700 hover:text-emerald-600 font-medium transition-all hover-lift">Support</a>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-all hover-lift">
              <a href="/auth">Sign In</a>
            </Button>
            <Button className="bg-gradient-islamic hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all hover-lift">
              <a href="/auth">Join Community ✨</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 text-gray-700 hover:text-emerald-600 transition-colors hover:bg-emerald-50 rounded-xl"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 animate-slide-up">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="/" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">
                <MessageCircle className="w-4 h-4" />
                <span>Live Chat</span>
              </a>
              <a href="/community" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">
                <Users className="w-4 h-4" />
                <span>Community</span>
              </a>
              <a href="/agents" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">Agents</a>
              <a href="/support" className="text-gray-700 hover:text-emerald-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-emerald-50">Support</a>
              <div className="flex flex-col space-y-3 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 w-full transition-all">
                  <a href="/auth">Sign In</a>
                </Button>
                <Button className="bg-gradient-islamic hover:opacity-90 text-white w-full shadow-lg transition-all">
                  <a href="/auth">Join Community ✨</a>
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
