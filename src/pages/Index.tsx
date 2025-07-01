
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import Marketplace from '@/components/Marketplace';
import Blog from '@/components/Blog';
import AgentSubscription from '@/components/AgentSubscription';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <Marketplace />
      <Blog />
      <AgentSubscription />
      
      {/* Enhanced Footer with Updated Contact Info */}
      <footer className="relative bg-gray-900 text-white py-16 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200&q=80" 
            alt="Mosque architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center shadow-xl">
                  <span className="text-white font-bold text-xl">حج</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">UmrahConnect</h3>
                  <p className="text-gray-400">Your trusted Hajj & Umrah platform</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
                Connecting millions of Muslims worldwide with certified agents 
                for their sacred journey to Makkah and Madinah. Join our community
                of pilgrims sharing their spiritual experiences.
              </p>
              
              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📱</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">WhatsApp</p>
                    <a href="https://wa.me/2347067412852" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      +234 706 741 2852
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">📧</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a href="mailto:adebayoajani23@toheebay.online" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                      adebayoajani23@toheebay.online
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer transform hover:scale-110">
                  <span className="text-sm">📱</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer transform hover:scale-110">
                  <span className="text-sm">📧</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors cursor-pointer transform hover:scale-110">
                  <span className="text-sm">🌐</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Hajj Packages</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Umrah Packages</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Agent Marketplace</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Travel Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Live Chat</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Agent Portal</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Community Guidelines</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm mb-2">
                  © 2025 UmrahConnect. All rights reserved. | Made with ❤️ for the Muslim Ummah
                </p>
                <p className="text-emerald-400 text-sm font-medium">
                  Proudly Powered by <span className="text-white font-bold">Toheebay</span> @ Adebayo
                </p>
              </div>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
