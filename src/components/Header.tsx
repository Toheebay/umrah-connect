
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, MessageSquare, Users, HeadphonesIcon, UserCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Get current user
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    getCurrentUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out"
      });
      navigate('/');
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-islamic rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UC</span>
            </div>
            <span className="text-xl font-bold text-gray-900">UmrahConnect</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/community" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span>Community</span>
            </Link>
            <Link to="/agents" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <Users className="w-4 h-4" />
              <span>Agents</span>
            </Link>
            <Link to="/support" className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors">
              <HeadphonesIcon className="w-4 h-4" />
              <span>Support</span>
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user.email?.split('@')[0]}
                </span>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  onClick={() => navigate('/auth')}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2"
                >
                  <UserCircle className="w-4 h-4" />
                  <span>Sign In</span>
                </Button>
                <Button
                  onClick={() => navigate('/community')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  size="sm"
                >
                  Join Chat
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/community"
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                <span>Community</span>
              </Link>
              <Link
                to="/agents"
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <Users className="w-4 h-4" />
                <span>Agents</span>
              </Link>
              <Link
                to="/support"
                className="flex items-center space-x-2 text-gray-700 hover:text-emerald-600 transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                <HeadphonesIcon className="w-4 h-4" />
                <span>Support</span>
              </Link>
              
              <div className="pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-3">
                    <span className="text-sm text-gray-600 block">
                      Welcome, {user.email?.split('@')[0]}
                    </span>
                    <Button
                      onClick={handleSignOut}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        navigate('/auth');
                        setIsOpen(false);
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full flex items-center justify-center space-x-2"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>Sign In</span>
                    </Button>
                    <Button
                      onClick={() => {
                        navigate('/community');
                        setIsOpen(false);
                      }}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      size="sm"
                    >
                      Join Chat
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
