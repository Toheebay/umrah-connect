
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, ArrowRight, Plane, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [selectedPackage, setSelectedPackage] = useState('umrah');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(2);

  const packages = [
    {
      id: 'umrah',
      name: 'Umrah Package',
      price: '$1,299',
      duration: '7 Days',
      rating: 4.8,
      features: ['Visa Processing', 'Hotel Booking', 'Transportation', 'Guide Support']
    },
    {
      id: 'hajj',
      name: 'Hajj Package',
      price: '$3,499',
      duration: '14 Days',
      rating: 4.9,
      features: ['Complete Hajj Support', 'Premium Hotels', 'Group Guide', 'All Meals']
    }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 islamic-pattern">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-yellow-200 rounded-full opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium">
                <Star className="w-4 h-4" />
                <span>Trusted by 50,000+ Pilgrims</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Sacred Journey
                <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                  Begins Here
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Connect with certified Hajj & Umrah agents, join our Muslim community, 
                and embark on your spiritual journey with complete peace of mind.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">2M+</div>
                <div className="text-sm text-gray-600">Happy Pilgrims</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">500+</div>
                <div className="text-sm text-gray-600">Certified Agents</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-islamic hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all transform hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Join Community
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:pl-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Book Your Package</h3>
                    <p className="text-gray-600">Start your spiritual journey today</p>
                  </div>

                  {/* Package Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">Select Package</label>
                    <div className="grid grid-cols-2 gap-3">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPackage === pkg.id
                              ? 'border-emerald-500 bg-emerald-50'
                              : 'border-gray-200 hover:border-emerald-300'
                          }`}
                          onClick={() => setSelectedPackage(pkg.id)}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs text-gray-600">{pkg.rating}</span>
                              </div>
                            </div>
                            <div className="text-emerald-600 font-bold text-lg">{pkg.price}</div>
                            <div className="flex items-center space-x-1 text-xs text-gray-600">
                              <Clock className="w-3 h-3" />
                              <span>{pkg.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Travel Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                      <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  {/* Guests Selection */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Number of Guests</label>
                    <div className="flex items-center space-x-4 p-4 border border-gray-300 rounded-xl">
                      <Users className="w-5 h-5 text-gray-400" />
                      <select
                        className="flex-1 bg-transparent focus:outline-none"
                        value={selectedGuests}
                        onChange={(e) => setSelectedGuests(Number(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Search Button */}
                  <Button className="w-full bg-gradient-islamic hover:opacity-90 text-white py-4 text-lg font-semibold rounded-xl transition-all transform hover:scale-105">
                    <Plane className="w-5 h-5 mr-2" />
                    Search Packages
                  </Button>

                  {/* Features */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      {packages.find(p => p.id === selectedPackage)?.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
