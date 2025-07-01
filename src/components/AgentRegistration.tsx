
import React, { useState } from 'react';
import { Crown, Upload, Search, Users, Camera, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import FlutterwavePayment from './FlutterwavePayment';

const AgentRegistration = () => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    specialization: '',
    description: '',
    profileImage: null as File | null,
    adImage: null as File | null,
    license: ''
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic Agent',
      price: 49,
      features: [
        'Up to 3 package listings',
        'Basic profile page',
        'Customer messaging',
        'Community access',
        'Monthly analytics'
      ],
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'premium',
      name: 'Premium Agent',
      price: 99,
      features: [
        'Unlimited package listings',
        'Premium profile with images',
        'Advanced client management',
        'Search & filter clients',
        'Priority support',
        'Custom branding',
        'Detailed analytics',
        'Featured placement'
      ],
      color: 'from-emerald-500 to-teal-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Agent',
      price: 199,
      features: [
        'Everything in Premium',
        'Multi-agent dashboard',
        'API access',
        'White-label solutions',
        'Dedicated support',
        'Custom integrations',
        'Advanced reporting'
      ],
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = () => {
    if (!formData.email) {
      alert('Please provide an email address for payment');
      return;
    }
    setShowPayment(true);
  };

  const handlePaymentSuccess = (response: any) => {
    console.log('Payment successful:', response);
    console.log('Registration data:', { ...formData, selectedPlan });
    alert('Payment successful! Your agent registration is complete.');
    setShowPayment(false);
    // Here you would save the registration data to your database
  };

  const handlePaymentClose = () => {
    setShowPayment(false);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  if (showPayment && selectedPlanData) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center min-h-[60vh]">
          <FlutterwavePayment
            amount={selectedPlanData.price}
            currency="USD"
            email={formData.email}
            phone={formData.phone}
            name={formData.companyName}
            onSuccess={handlePaymentSuccess}
            onClose={handlePaymentClose}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step >= stepNum 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-12 h-1 mx-2 ${
                  step > stepNum ? 'bg-emerald-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Plan Selection */}
      {step === 1 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Agent Plan</h2>
            <p className="text-gray-600">Select the plan that best fits your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <Card 
                key={plan.id}
                className={`cursor-pointer border-2 transition-all transform hover:scale-105 ${
                  selectedPlan === plan.id 
                    ? 'border-emerald-500 ring-2 ring-emerald-200' 
                    : 'border-gray-200 hover:border-emerald-300'
                } ${plan.popular ? 'ring-2 ring-emerald-400' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-yellow-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-emerald-600">
                    ${plan.price}
                    <span className="text-sm text-gray-500 font-normal">/month</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              onClick={() => setStep(2)}
              disabled={!selectedPlan}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg"
            >
              Continue to Registration
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Company Information */}
      {step === 2 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Company Information</h2>
            <p className="text-gray-600">Tell us about your Hajj & Umrah business</p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <Input
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Your Company Name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+234 xxx xxx xxxx"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <Input
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="City, Country"
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                    <Input
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="5 years"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                    <select 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={formData.specialization}
                      onChange={(e) => handleInputChange('specialization', e.target.value)}
                    >
                      <option value="">Select Specialization</option>
                      <option value="hajj">Hajj Packages</option>
                      <option value="umrah">Umrah Packages</option>
                      <option value="both">Both Hajj & Umrah</option>
                      <option value="luxury">Luxury Packages</option>
                      <option value="budget">Budget Packages</option>
                      <option value="family">Family Packages</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Tell us about your company and services..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                  <Input
                    value={formData.license}
                    onChange={(e) => handleInputChange('license', e.target.value)}
                    placeholder="Your business license number"
                    className="w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center space-x-4 mt-8">
            <Button 
              onClick={() => setStep(1)}
              variant="outline"
              className="px-6 py-3"
            >
              Back
            </Button>
            <Button 
              onClick={() => setStep(3)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
            >
              Continue to Media Upload
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Media Upload & Payment */}
      {step === 3 && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upload Media & Complete Registration</h2>
            <p className="text-gray-600">Add your profile and advertisement images</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Media Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>Media Upload</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload profile image</p>
                    {formData.profileImage && (
                      <p className="text-xs text-emerald-600">{formData.profileImage.name}</p>
                    )}
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload('profileImage', e)}
                    />
                  </div>
                </div>

                {selectedPlan !== 'basic' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Advertisement Banner</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer relative">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">Upload your advertisement banner</p>
                      <p className="text-xs text-gray-500 mb-2">Recommended: 1200x400px</p>
                      {formData.adImage && (
                        <p className="text-xs text-emerald-600">{formData.adImage.name}</p>
                      )}
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={(e) => handleFileUpload('adImage', e)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Crown className="w-5 h-5" />
                  <span>Payment Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">{selectedPlanData?.name}</h4>
                      <p className="text-sm text-gray-600">Monthly subscription</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-emerald-600">
                        ${selectedPlanData?.price}
                      </div>
                      <div className="text-sm text-gray-500">/month</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-semibold mb-2">Your Benefits:</h5>
                    <ul className="space-y-2">
                      {selectedPlanData?.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Secured by Flutterwave</span>
                    </div>
                    <p className="text-xs text-blue-600">Your payment is processed securely with bank-level encryption</p>
                  </div>

                  <Button 
                    onClick={handleSubmit}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-3 rounded-lg font-semibold"
                  >
                    Complete Registration & Pay
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mt-8">
            <Button 
              onClick={() => setStep(2)}
              variant="outline"
              className="px-6 py-3"
            >
              Back to Information
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentRegistration;
