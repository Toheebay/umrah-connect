
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import AgentMarketplace from '@/components/AgentMarketplace';
import IslamicResources from '@/components/IslamicResources';
import DailyIslamicPost from '@/components/DailyIslamicPost';
import CommunitySection from '@/components/CommunitySection';
import Blog from '@/components/Blog';
import IslamicDate from '@/components/IslamicDate';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-emerald-50">
      <Header />
      <HeroSection />
      <FeaturesSection />
      
      {/* Daily Islamic Post Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Daily Islamic Reflection
            </h2>
            <p className="text-xl text-gray-600">
              Strengthen your faith with daily inspirations from Quran and Hadith
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <DailyIslamicPost />
          </div>
        </div>
      </section>

      {/* Agent Marketplace Section */}
      <section id="agent-marketplace" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Certified Agent
              <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                Marketplace
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse through our verified agents and find the perfect package for your sacred journey
            </p>
          </div>
          <AgentMarketplace />
        </div>
      </section>

      <IslamicResources />
      <CommunitySection />
      <Blog />
      <IslamicDate />
      <Footer />
    </div>
  );
};

export default Index;
