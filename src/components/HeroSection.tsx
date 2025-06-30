
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Star, ArrowRight, Plane, Clock, Shield, Award, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [selectedPackage, setSelectedPackage] = useState('umrah');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedGuests, setSelectedGuests] = useState(2);
  const [isSubscribed, setIsSubscribed] = useState(false); // Demo state

  const packages = [
    {
      id: 'umrah',
      name: 'Umrah Package',
      price: '$1,299',
      duration: '7 Days',
      rating: 4.8,
      features: ['Visa Processing', 'Hotel Booking', 'Transportation', 'Guide Support'],
      available: true,
      description: 'Complete Umrah experience with premium services'
    },
    {
      id: 'hajj',
      name: 'Hajj Package',
      price: '$3,499',
      duration: '14 Days',
      rating: 4.9,
      features: ['Complete Hajj Support', 'Premium Hotels', 'Group Guide', 'All Meals'],
      available: isSubscribed,
      description: 'Exclusive Hajj package for subscribed agents only',
      premium: true
    }
  ];

  const handleBooking = () => {
    if (selectedPackage === 'hajj' && !isSubscribed) {
      alert('Hajj packages are only available for subscribed agents. Please subscribe to access premium packages.');
      return;
    }
    console.log('Booking package:', selectedPackage);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-yellow-50 islamic-pattern overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full opacity-20 animate-float blur-sm"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full opacity-20 animate-float blur-sm" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-20 animate-float blur-sm" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-400 rounded-full opacity-15 animate-float blur-sm" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Left Column */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <Star className="w-4 h-4" />
                  <span>Trusted by 50,000+ Pilgrims</span>
                </div>
                <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                  <Award className="w-4 h-4" />
                  <span>Premium Experience</span>
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your Sacred Journey
                <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                  Begins Here
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Connect with certified Hajj & Umrah agents, join our vibrant Muslim community, 
                and embark on your spiritual journey with complete peace of mind and premium service.
              </p>
            </div>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-1">2M+</div>
                <div className="text-sm text-gray-600">Happy Pilgrims</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-1">500+</div>
                <div className="text-sm text-gray-600">Certified Agents</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-1">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                <div className="text-2xl font-bold text-emerald-600 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-islamic hover:opacity-90 text-white px-8 py-6 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 shadow-2xl"
              >
                <Plane className="w-5 h-5 mr-2" />
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-emerald-300 bg-white/80 backdrop-blur-sm text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>
          </div>

          {/* Enhanced Right Column - Booking Card */}
          <div className="lg:pl-8">
            <Card className="bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-gray-900">Book Your Package</h3>
                    <p className="text-gray-600">Start your spiritual journey today</p>
                  </div>

                  {/* Enhanced Package Selection */}
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-gray-700">Select Package</label>
                    <div className="space-y-3">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all transform hover:scale-[1.02] ${
                            selectedPackage === pkg.id
                              ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100 shadow-lg'
                              : 'border-gray-200 hover:border-emerald-300 bg-white hover:shadow-md'
                          } ${!pkg.available ? 'opacity-60' : ''}`}
                          onClick={() => pkg.available && setSelectedPackage(pkg.id)}
                        >
                          {pkg.premium && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              PREMIUM
                            </div>
                          )}
                          {!pkg.available && (
                            <div className="absolute top-4 right-4">
                              <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-lg text-gray-900">{pkg.name}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-600 font-medium">{pkg.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{pkg.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="text-emerald-600 font-bold text-2xl">{pkg.price}</div>
                              <div className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                <Clock className="w-3 h-3" />
                                <span>{pkg.duration}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {pkg.features.map((feature, index) => (
                                <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Travel Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm transition-all"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Number of Guests</label>
                      <div className="flex items-center space-x-4 p-4 border-2 border-gray-300 rounded-xl bg-white/80 backdrop-blur-sm">
                        <Users className="w-5 h-5 text-gray-400" />
                        <select
                          className="flex-1 bg-transparent focus:outline-none text-gray-900"
                          value={selectedGuests}
                          onChange={(e) => setSelectedGuests(Number(e.target.value))}
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Search Button */}
                  <Button 
                    onClick={handleBooking}
                    className="w-full bg-gradient-islamic hover:opacity-90 text-white py-6 text-lg font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    <Plane className="w-5 h-5 mr-2" />
                    {selectedPackage === 'hajj' && !isSubscribed ? 'Subscribe to Book Hajj' : 'Search Packages'}
                  </Button>

                  {/* Subscription Notice */}
                  {selectedPackage === 'hajj' && !isSubscribed && (
                    <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border border-purple-200">
                      <div className="flex items-center space-x-2 text-purple-800">
                        <Shield className="w-5 h-5" />
                        <span className="font-medium">Premium Access Required</span>
                      </div>
                      <p className="text-sm text-purple-700 mt-1">
                        Hajj packages are exclusively available for subscribed agents. Join our premium service to access all features.
                      </p>
                    </div>
                  )}
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
