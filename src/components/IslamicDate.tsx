
import React, { useState, useEffect } from 'react';
import { Calendar, Moon, Star } from 'lucide-react';

const IslamicDate = () => {
  const [islamicDate, setIslamicDate] = useState('');
  const [gregorianDate, setGregorianDate] = useState('');

  useEffect(() => {
    const updateDates = () => {
      const now = new Date();
      
      // Gregorian date
      setGregorianDate(now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));

      // More accurate Islamic date calculation
      // This is a simplified calculation - for production, use a proper Islamic calendar library
      const gregorianYear = now.getFullYear();
      const startOfYear = new Date(gregorianYear, 0, 1);
      const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));
      
      // Approximate Islamic year (Hijri calendar started in 622 CE)
      const islamicYear = Math.floor(((gregorianYear - 622) * 365.25) / 354.36) + 1;
      
      const islamicMonths = [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
        'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
      ];
      
      // Approximate current Islamic month and day
      const daysSinceYearStart = dayOfYear % 354;
      const islamicMonth = Math.floor(daysSinceYearStart / 29.5);
      const islamicDay = Math.floor(daysSinceYearStart % 29.5) + 1;
      
      const monthName = islamicMonths[Math.min(islamicMonth, 11)];
      setIslamicDate(`${islamicDay} ${monthName} ${islamicYear} AH`);
    };

    updateDates();
    const interval = setInterval(updateDates, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-100 via-blue-100 to-purple-100 rounded-2xl p-6 shadow-xl border border-emerald-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-islamic rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
            <Moon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-lg">Today's Date</h4>
            <p className="text-sm text-gray-600 flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span>Islamic & Gregorian</span>
            </p>
          </div>
        </div>
        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center animate-bounce-gentle">
          <Calendar className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-emerald-100">
          <div className="text-sm text-emerald-700 font-medium mb-1 flex items-center space-x-2">
            <span className="text-emerald-600">🌙</span>
            <span>Hijrah Date</span>
          </div>
          <div className="font-bold text-emerald-800 text-lg">{islamicDate}</div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-blue-100">
          <div className="text-sm text-blue-700 font-medium mb-1 flex items-center space-x-2">
            <span className="text-blue-600">📅</span>
            <span>Gregorian Date</span>
          </div>
          <div className="font-bold text-blue-800">{gregorianDate}</div>
        </div>
      </div>
    </div>
  );
};

export default IslamicDate;
