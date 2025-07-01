
import React from 'react';
import { Globe } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

const CurrencySelector: React.FC<CurrencySelectorProps> = ({ selectedCurrency, onCurrencyChange }) => {
  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' }
  ];

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center space-x-2">
        <Globe className="w-4 h-4" />
        <span>Currency</span>
      </label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value)}
        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm transition-all"
      >
        {currencies.map((currency) => (
          <option key={currency.code} value={currency.code}>
            {currency.symbol} {currency.name} ({currency.code})
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
