
import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
    { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩' }
  ];

  const selectedLanguage = languages.find(lang => lang.code === selectedLang);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Globe className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium">{selectedLanguage?.flag}</span>
        <span className="text-sm text-gray-700">{selectedLanguage?.name}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => {
                  setSelectedLang(language.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center space-x-3 ${
                  selectedLang === language.code ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium">{language.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
