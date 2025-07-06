import React from 'react';
import { Link } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
          Hajj Community
        </Link>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-white hover:text-emerald-200 transition-colors font-medium"
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="text-white hover:text-emerald-200 transition-colors font-medium"
          >
            Blog
          </Link>
          <Link 
            to="/community" 
            className="text-white hover:text-emerald-200 transition-colors font-medium"
          >
            Community
          </Link>
          <Link 
            to="/agents" 
            className="text-white hover:text-emerald-200 transition-colors font-medium"
          >
            Agents
          </Link>
          <Link 
            to="/support" 
            className="text-white hover:text-emerald-200 transition-colors font-medium"
          >
            Support
          </Link>
          <Link 
            to="/auth" 
            className="bg-white text-emerald-700 px-4 py-2 rounded-full hover:bg-emerald-50 transition-colors font-medium"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent side="left" className="sm:w-64">
            <SheetHeader>
              <SheetTitle>Hajj Community</SheetTitle>
              <SheetDescription>
                Explore and connect with our community.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="text-gray-900 hover:text-emerald-700 transition-colors font-medium block py-2">
                Home
              </Link>
              <Link to="/blog" className="text-gray-900 hover:text-emerald-700 transition-colors font-medium block py-2">
                Blog
              </Link>
              <Link to="/community" className="text-gray-900 hover:text-emerald-700 transition-colors font-medium block py-2">
                Community
              </Link>
              <Link to="/agents" className="text-gray-900 hover:text-emerald-700 transition-colors font-medium block py-2">
                Agents
              </Link>
              <Link to="/support" className="text-gray-900 hover:text-emerald-700 transition-colors font-medium block py-2">
                Support
              </Link>
              <Link to="/auth" className="bg-emerald-600 text-white px-4 py-2 rounded-full hover:bg-emerald-700 transition-colors font-medium block text-center">
                Login
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
