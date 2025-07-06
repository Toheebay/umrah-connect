
import React from 'react';
import Header from '@/components/Header';
import Blog from '@/components/Blog';
import IslamicDate from '@/components/IslamicDate';
import Footer from '@/components/Footer';

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-8 sm:py-12 bg-gradient-kaaba relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">📝</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Hajj & Umrah Blog
              </h1>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">✨</span>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Discover inspiring stories, spiritual insights, and practical guidance from fellow pilgrims
            </p>
          </div>

          {/* Islamic Date Display */}
          <div className="max-w-md mx-auto mb-8">
            <IslamicDate />
          </div>
        </div>
      </section>

      {/* Main Blog Section */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <Blog />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;
