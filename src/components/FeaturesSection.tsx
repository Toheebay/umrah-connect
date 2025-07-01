
import React from 'react';
import { Shield, MessageSquare, CreditCard, Globe, Users, Clock, Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Agents',
      description: 'All our agents are certified and verified for your safety and trust',
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: MessageSquare,
      title: 'Community Chat',
      description: 'Connect with fellow Muslims and share your spiritual journey',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security',
      color: 'bg-purple-500',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Available in Arabic, English, Urdu and more languages',
      color: 'bg-orange-500',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Users,
      title: 'Group Bookings',
      description: 'Special packages for families and groups',
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock assistance for your peace of mind',
      color: 'bg-yellow-500',
      gradient: 'from-yellow-500 to-amber-600'
    }
  ];

  const stats = [
    { label: 'Success Rate', value: '99.8%', icon: Star },
    { label: 'Customer Satisfaction', value: '4.9/5', icon: Heart },
    { label: 'Years of Experience', value: '15+', icon: Clock },
    { label: 'Countries Served', value: '50+', icon: Globe }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-6 py-3 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            <span>Why Choose UmrahConnect</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for Your
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              Sacred Journey
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and support you need 
            for a seamless Hajj or Umrah experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Stats Section */}
        <div className="bg-gradient-to-br from-emerald-600 via-blue-600 to-purple-700 backdrop-blur-sm rounded-3xl p-8 lg:p-16 border border-emerald-100 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-yellow-300 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>

          <div className="text-center mb-12 relative z-10">
            <h3 className="text-4xl lg:text-5xl font-black text-white mb-6 drop-shadow-2xl">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-white bg-clip-text text-transparent">
                Trusted by Millions
              </span>
              <span className="block text-3xl lg:text-4xl font-extrabold text-white mt-2">
                Worldwide
              </span>
            </h3>
            <p className="text-white/90 text-xl font-semibold drop-shadow-lg">
              Our commitment to excellence speaks through our numbers
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center group-hover:scale-125 transition-all duration-300 border-2 border-white/30 shadow-2xl">
                  <stat.icon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-white mb-3 group-hover:text-yellow-300 transition-colors drop-shadow-2xl">
                  {stat.value}
                </div>
                <div className="text-white/90 font-bold text-lg drop-shadow-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Highlight */}
        <div className="mt-20 bg-gradient-kaaba rounded-3xl p-8 lg:p-12 text-white overflow-hidden relative">
          <div className="absolute inset-0">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-emerald-400/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold mb-6">
                Join Our Global Muslim Community
              </h3>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Connect with fellow believers, share experiences, get advice, 
                and support each other on your spiritual journey.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-gray-300">Active Members</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">100+</div>
                  <div className="text-sm text-gray-300">Daily Discussions</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-gray-300">Community Support</div>
                </div>
              </div>
            </div>
            
            <div className="lg:text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <MessageSquare className="w-12 h-12 text-emerald-400 mb-4 mx-auto lg:mx-0 lg:ml-auto" />
                <p className="text-gray-200 italic">
                  "The community here helped me prepare for my first Umrah. 
                  The guidance and support I received was invaluable."
                </p>
                <div className="mt-4 text-sm text-gray-300">
                  - Fatima, Malaysia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
