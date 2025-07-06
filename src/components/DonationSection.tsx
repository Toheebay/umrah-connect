
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Users, Globe, DollarSign, Gift, Zap, Target } from 'lucide-react';
import FlutterwavePayment from './FlutterwavePayment';

const DonationSection = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [customAmount, setCustomAmount] = useState('');

  const quickAmounts = [10, 25, 50, 100, 250, 500];
  
  const causes = [
    {
      title: "Hajj Fund for the Needy",
      description: "Help underprivileged Muslims fulfill their dream of performing Hajj",
      raised: 15420,
      target: 50000,
      icon: "🕋",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Umrah Support Program",
      description: "Sponsor Umrah journeys for those who cannot afford it",
      raised: 8750,
      target: 25000,
      icon: "🤲",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Islamic Education Fund",
      description: "Support Islamic education and Quran learning programs",
      raised: 12300,
      target: 30000,
      icon: "📚",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const handleDonate = (amount: number) => {
    setSelectedAmount(amount);
    setShowPayment(true);
  };

  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount);
    if (amount > 0) {
      handleDonate(amount);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center animate-pulse-glow">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
            Support Our Ummah
          </h2>
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse-glow">
            <Gift className="w-6 h-6 text-white" />
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          "The believer's shade on the Day of Resurrection will be his charity" - Prophet Muhammad (PBUH)
        </p>
      </div>

      {/* Causes Grid */}
      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {causes.map((cause, index) => {
          const progress = (cause.raised / cause.target) * 100;
          
          return (
            <Card key={index} className="hover-lift transition-all duration-300 overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${cause.color} text-white`}>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{cause.icon}</span>
                  <CardTitle className="text-lg font-bold">{cause.title}</CardTitle>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <p className="text-gray-600 text-sm mb-4">{cause.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Raised</span>
                    <span className="font-bold text-emerald-600">${cause.raised.toLocaleString()}</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${cause.color} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{progress.toFixed(1)}% funded</span>
                    <span className="text-gray-600">Goal: ${cause.target.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Donation Form */}
      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-2 border-emerald-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center space-x-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            <span>Make a Donation</span>
            <Zap className="w-6 h-6 text-yellow-500" />
          </CardTitle>
          <p className="text-gray-600">Choose an amount to support our causes</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!showPayment ? (
            <>
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {quickAmounts.map((amount) => (
                  <Button
                    key={amount}
                    onClick={() => handleDonate(amount)}
                    variant="outline"
                    className="bg-white hover:bg-emerald-50 border-emerald-300 hover:border-emerald-500 transition-all"
                  >
                    ${amount}
                  </Button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <Button
                  onClick={handleCustomDonate}
                  disabled={!customAmount || parseFloat(customAmount) <= 0}
                  className="bg-gradient-islamic hover:opacity-90 text-white px-6 py-3"
                >
                  Donate
                </Button>
              </div>

              {/* Impact Stats */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-emerald-600">1,247</div>
                  <div className="text-sm text-gray-600">People Helped</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600">47</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600">89%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto">
              <FlutterwavePayment
                amount={selectedAmount || 0}
                currency="USD"
                email="donor@example.com"
                name="Anonymous Donor"
                onPaymentSuccess={() => {
                  setShowPayment(false);
                  setSelectedAmount(null);
                  setCustomAmount('');
                }}
                onPaymentError={() => {
                  setShowPayment(false);
                }}
              />
              <Button
                onClick={() => setShowPayment(false)}
                variant="outline"
                className="w-full mt-4"
              >
                Back to Donation Options
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationSection;
