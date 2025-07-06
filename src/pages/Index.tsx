
import React from 'react';
import Header from '@/components/Header';
import CommunityChat from '@/components/CommunityChat';
import IslamicDate from '@/components/IslamicDate';
import DonationSection from '@/components/DonationSection';
import HajjExperienceShare from '@/components/HajjExperienceShare';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section - Chat First */}
      <section className="py-8 sm:py-12 bg-gradient-kaaba relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">🕋</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                Hajj Community
              </h1>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl">🤲</span>
              </div>
            </div>
            <p className="text-lg sm:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Share your sacred journey experiences • Connect with fellow pilgrims • Get real-time guidance
            </p>
          </div>

          {/* Islamic Date Display */}
          <div className="max-w-md mx-auto mb-8">
            <IslamicDate />
          </div>
        </div>
      </section>

      {/* Main Chat Section - Primary Focus */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              💬 Live Hajj & Umrah Chat
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with pilgrims worldwide • Share experiences • Ask questions • Get support
            </p>
          </div>
          <CommunityChat />
        </div>
      </section>

      {/* Hajj Experience Sharing */}
      <section className="py-12 bg-gradient-to-r from-emerald-50 to-blue-50">
        <div className="container mx-auto px-4">
          <HajjExperienceShare />
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <DonationSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
