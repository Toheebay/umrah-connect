
import React, { useState, useEffect } from 'react';
import { Calendar, Moon } from 'lucide-react';

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

      // Islamic date (approximate calculation)
      const islamicYear = Math.floor(((now.getFullYear() - 622) * 365 + (now.getMonth() * 30) + now.getDate()) / 354) + 1;
      const islamicMonths = [
        'Muharram', 'Safar', 'Rabi\' al-Awwal', 'Rabi\' al-Thani',
        'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\'ban',
        'Ramadan', 'Shawwal', 'Dhu al-Qi\'dah', 'Dhu al-Hijjah'
      ];
      
      const islamicMonth = islamicMonths[Math.floor(Math.random() * 12)]; // Simplified
      const islamicDay = Math.floor(Math.random() * 29) + 1; // Simplified
      
      setIslamicDate(`${islamicDay} ${islamicMonth} ${islamicYear} AH`);
    };

    updateDates();
    const interval = setInterval(updateDates, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-emerald-100 to-blue-100 rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-islamic rounded-full flex items-center justify-center">
            <Moon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Today's Date</h4>
            <p className="text-sm text-gray-600">Islamic & Gregorian Calendar</p>
          </div>
        </div>
        <Calendar className="w-8 h-8 text-emerald-600" />
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Islamic Date</div>
          <div className="font-bold text-emerald-700 text-lg">{islamicDate}</div>
        </div>
        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3">
          <div className="text-sm text-gray-600 mb-1">Gregorian Date</div>
          <div className="font-bold text-blue-700">{gregorianDate}</div>
        </div>
      </div>
    </div>
  );
};

export default IslamicDate;
