import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, CheckCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FlutterwavePayment from './FlutterwavePayment';

interface AgentRegistrationProps {
  onRegistrationSuccess?: () => void;
}

const AgentRegistration: React.FC<AgentRegistrationProps> = ({ onRegistrationSuccess }) => {
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const { toast } = useToast();

  const plans = [
    { 
      id: 'basic', 
      name: 'Basic Plan', 
      price: { USD: 50, EUR: 45, NGN: 85000 }, 
      features: ['Basic listing', 'Customer support', 'Basic analytics'] 
    },
    { 
      id: 'premium', 
      name: 'Premium Plan', 
      price: { USD: 100, EUR: 90, NGN: 160000 }, 
      features: ['Priority listing', 'Advanced analytics', 'Marketing tools', 'Priority support'] 
    },
    { 
      id: 'enterprise', 
      name: 'Enterprise Plan', 
      price: { USD: 200, EUR: 180, NGN: 320000 }, 
      features: ['Top listing', 'Full analytics suite', 'Custom branding', 'Dedicated support', 'API access'] 
    }
  ];

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' }
  ];

  const countries = [
    { label: 'Saudi Arabia', value: 'SA' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'Qatar', value: 'QA' },
    { label: 'Oman', value: 'OM' },
    { label: 'Kuwait', value: 'KW' },
    { label: 'Bahrain', value: 'BH' },
    { label: 'Nigeria', value: 'NG' },
    { label: 'USA', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'Ghana', value: 'GH' },
    { label: 'Kenya', value: 'KE' }
  ];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setUploadedFiles(files);
    }
  };

  const handleFileUpload = async () => {
    setUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Files Uploaded!",
        description: "Your files have been successfully uploaded.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload Failed!",
        description: "There was an error uploading your files. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!paymentSuccessful) {
      toast({
        variant: "destructive",
        title: "Subscription Payment Required",
        description: "Please complete the subscription payment to proceed with the registration.",
      });
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Registration Successful!",
        description: "Your agent registration has been submitted and your subscription is active.",
      });

      // Reset form fields
      setCompanyName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setWebsite('');
      setDescription('');
      setLicenseNumber('');
      setUploadedFiles([]);
      setPaymentSuccessful(false);
      setSelectedCountry('');
      setSelectedPlan('basic');

      onRegistrationSuccess?.();

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration Failed!",
        description: "There was an error submitting your registration. Please try again.",
      });
    }
  };

  const handlePaymentSuccess = (response: any) => {
    setPaymentSuccessful(true);
    toast({
      title: "Subscription Payment Successful!",
      description: "Your subscription is now active. You can complete your registration.",
    });
  };

  const handlePaymentError = () => {
    setPaymentSuccessful(false);
    toast({
      variant: "destructive",
      title: "Payment Failed!",
      description: "There was an error processing your subscription payment. Please try again.",
    });
  };

  const getCurrentPlan = () => plans.find(p => p.id === selectedPlan) || plans[0];
  const getCurrentPrice = () => {
    const plan = getCurrentPlan();
    return plan.price[selectedCurrency as keyof typeof plan.price];
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Agent Registration</CardTitle>
        <p className="text-center text-gray-600">Choose your subscription plan and register your agency</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="plan">Select Subscription Plan</Label>
              <Select onValueChange={setSelectedPlan} defaultValue={selectedPlan}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subscription plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((plan) => (
                    <SelectItem key={plan.id} value={plan.id}>
                      {plan.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Currency</Label>
              <Select onValueChange={setSelectedCurrency} defaultValue={selectedCurrency}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border border-emerald-200">
            <h4 className="font-semibold mb-2 text-emerald-800">{getCurrentPlan().name}</h4>
            <p className="text-2xl font-bold text-emerald-600 mb-2">
              {currencies.find(c => c.code === selectedCurrency)?.symbol}{getCurrentPrice().toLocaleString()}
              <span className="text-sm font-normal text-gray-600"> /month</span>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              {getCurrentPlan().features.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Registration Form Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                type="text"
                id="contactName"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="country">Country</Label>
            <Select onValueChange={setSelectedCountry} defaultValue={selectedCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.value} value={country.value}>
                    {country.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="website">Website URL</Label>
            <Input
              type="url"
              id="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div>
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tell us about your company and services..."
            />
          </div>

          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              type="text"
              id="licenseNumber"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="upload">Upload Documents (License, etc.)</Label>
            <Input
              type="file"
              id="upload"
              multiple
              onChange={handleFileSelect}
              className="hidden"
            />
            <Label htmlFor="upload" className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md cursor-pointer">
              <Upload className="w-5 h-5" />
              <span>{uploadedFiles.length > 0 ? `Selected ${uploadedFiles.length} files` : 'Select Files'}</span>
            </Label>
            {uploadedFiles.length > 0 && (
              <Button type="button" size="sm" variant="secondary" onClick={handleFileUpload} disabled={uploading} className="ml-2">
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
            )}
          </div>

          {/* Subscription Payment Section */}
          <div className="border p-4 rounded-md bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
            <h4 className="font-semibold mb-2 flex items-center space-x-2 text-emerald-800">
              <CreditCard className="w-5 h-5" />
              <span>Subscription Payment</span>
            </h4>
            {paymentSuccessful ? (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="w-5 h-5" />
                <span>Subscription Payment Successful!</span>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-600 mb-3">
                  Monthly subscription fee: {currencies.find(c => c.code === selectedCurrency)?.symbol}{getCurrentPrice().toLocaleString()} {selectedCurrency}
                </p>
                <FlutterwavePayment
                  amount={getCurrentPrice()}
                  currency={selectedCurrency}
                  email={email}
                  phone={phone}
                  name={contactName}
                  onPaymentSuccess={handlePaymentSuccess}
                  onPaymentError={handlePaymentError}
                  loading={paymentLoading}
                  setLoading={setPaymentLoading}
                />
              </>
            )}
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 text-white" disabled={!paymentSuccessful}>
            Complete Registration
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentRegistration;
