
import React, { useState } from 'react';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FlutterwavePaymentProps {
  amount: number;
  currency?: string;
  email: string;
  phone?: string;
  name?: string;
  onPaymentSuccess?: (response: any) => void;
  onPaymentError?: () => void;
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
}

const FlutterwavePayment: React.FC<FlutterwavePaymentProps> = ({
  amount,
  currency = 'USD',
  email,
  phone,
  name,
  onPaymentSuccess,
  onPaymentError,
  loading,
  setLoading
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = () => {
    const loadingState = loading !== undefined ? setLoading : setIsLoading;
    loadingState?.(true);
    
    // Flutterwave inline payment configuration
    const flutterwaveConfig = {
      public_key: "FLWPUBK-3d0e062fa50b5b538affc64535245178-X",
      tx_ref: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      amount: amount,
      currency: currency,
      payment_options: "card, banktransfer, ussd, mobilemoney",
      customer: {
        email: email,
        phone_number: phone || "",
        name: name || email.split('@')[0],
      },
      customizations: {
        title: "Hajj & Umrah Registration Payment",
        description: "Payment for agent registration",
        logo: "https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=100&q=80",
      },
      callback: (response: any) => {
        loadingState?.(false);
        if (response.status === "successful") {
          console.log("Payment successful:", response);
          onPaymentSuccess?.(response);
        } else {
          onPaymentError?.();
        }
      },
      onclose: () => {
        loadingState?.(false);
        onPaymentError?.();
      },
    };

    // Initialize Flutterwave payment
    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout(flutterwaveConfig);
    } else {
      // Load Flutterwave script if not already loaded
      const script = document.createElement('script');
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.onload = () => {
        window.FlutterwaveCheckout(flutterwaveConfig);
      };
      document.head.appendChild(script);
    }
  };

  const currentLoading = loading !== undefined ? loading : isLoading;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Secure Payment</CardTitle>
        <p className="text-gray-600">Complete your payment with Flutterwave</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Amount:</span>
            <span className="text-2xl font-bold text-emerald-600">
              {currency} {amount.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Email:</span>
            <span className="text-sm">{email}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Secured by Flutterwave</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Bank-level security</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Multiple payment options</span>
          </div>
        </div>

        <Button
          onClick={handlePayment}
          disabled={currentLoading}
          className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {currentLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </div>
          ) : (
            `Pay ${currency} ${amount.toLocaleString()}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By clicking "Pay", you agree to our terms and conditions. 
          Your payment is processed securely by Flutterwave.
        </p>
      </CardContent>
    </Card>
  );
};

export default FlutterwavePayment;
