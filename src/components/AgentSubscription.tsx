
import React, { useState } from 'react';
import { Check, Crown, Star, Zap, Shield, Users, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AgentSubscription = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Basic',
      icon: Star,
      price: { monthly: 5, yearly: 50 },
      description: 'Perfect for new agents starting their journey',
      features: [
        'Up to 50 bookings per month',
        'Basic customer management',
        'Standard support',
        'Community access',
        'Mobile app access',
        'Basic analytics'
      ],
      color: 'from-blue-500 to-indigo-600',
      popular: false
    },
    {
      name: 'Premium',
      icon: Crown,
      price: { monthly: 10, yearly: 100 },
      description: 'Most popular choice for growing agencies',
      features: [
        'Unlimited bookings',
        'Advanced customer management',
        'Priority support 24/7',
        'Premium community features',
        'White-label mobile app',
        'Advanced analytics & reports',
        'Marketing tools',
        'API access',
        'Custom branding'
      ],
      color: 'from-emerald-500 to-teal-600',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Award,
      price: { monthly: 20, yearly: 200 },
      description: 'For large agencies and tour operators',
      features: [
        'Everything in Premium',
        'Multi-agent dashboard',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced security features',
        'Training & onboarding',
        'Custom reporting',
        'SLA guarantee',
        'Multi-language support'
      ],
      color: 'from-purple-500 to-pink-600',
      popular: false
    }
  ];

  const testimonials = [
    {
      name: 'Hassan Al-Mahmoud',
      role: 'Travel Agency Owner',
      company: 'Sacred Journeys',
      avatar: '👨‍💼',
      country: '🇸🇦',
      text: 'UmrahConnect transformed our business. We increased our bookings by 300% in just 6 months!'
    },
    {
      name: 'Fatima Khatun',
      role: 'Hajj Coordinator',
      company: 'Blessed Travels',
      avatar: '👩‍💼',
      country: '🇧🇩',
      text: 'The platform is so user-friendly. Our customers love the booking experience and community features.'
    },
    {
      name: 'Omar Bin Rashid',
      role: 'Tour Operator',
      company: 'Makkah Express',
      avatar: '👨‍🦲',
      country: '🇦🇪',
      text: 'Best investment we made. The analytics help us understand our customers better than ever.'
    }
  ];

  const stats = [
    { label: 'Active Agents', value: '2,500+', icon: Users },
    { label: 'Avg. Revenue Increase', value: '250%', icon: TrendingUp },
    { label: 'Customer Satisfaction', value: '98%', icon: Shield },
    { label: 'Success Rate', value: '99.9%', icon: Zap }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-800/50 text-emerald-200 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-medium mb-4 sm:mb-6">
            <Crown className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Agent Subscription Plans</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 px-4">
            Grow Your Hajj & Umrah
            <span className="block bg-gradient-to-r from-emerald-400 to-yellow-400 bg-clip-text text-transparent">
              Business with Us
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 sm:mb-8 px-4">
            Join thousands of successful agents who have transformed their business 
            with our comprehensive platform and tools.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800 rounded-xl p-1 mb-8 sm:mb-12">
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                billingCycle === 'monthly'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                billingCycle === 'yearly'
                  ? 'bg-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="ml-2 bg-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-emerald-500 transition-all duration-300 hover:scale-105 ${
                plan.popular ? 'ring-2 ring-emerald-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-emerald-500 to-yellow-500 text-gray-900 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-6 sm:pb-8 p-4 sm:p-6">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                  <plan.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {plan.name}
                </CardTitle>
                <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{plan.description}</p>
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    ${plan.price[billingCycle]}
                    <span className="text-base sm:text-lg text-gray-400 font-normal">
                      /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-xs sm:text-sm text-emerald-400">
                      Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start space-x-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  className={`w-full py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all transform hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-yellow-500 text-gray-900 hover:opacity-90'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 lg:mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2 group-hover:text-emerald-400 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-gray-700">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              What Our Agents Say
            </h3>
            <p className="text-base sm:text-lg text-gray-400">
              Join successful agents who are growing their business with us
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl p-4 sm:p-6 border border-gray-700">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-2xl sm:text-3xl">{testimonial.avatar}</span>
                  <div>
                    <div className="font-semibold text-white text-sm sm:text-base">{testimonial.name}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{testimonial.role}</div>
                    <div className="text-xs text-emerald-400">{testimonial.company} {testimonial.country}</div>
                  </div>
                </div>
                <p className="text-sm sm:text-base text-gray-300 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentSubscription;
