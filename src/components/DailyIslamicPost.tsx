
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Share2 } from 'lucide-react';

const DailyIslamicPost = () => {
  const [currentPost, setCurrentPost] = useState(0);
  
  const islamicPosts = [
    {
      id: 1,
      type: 'Quran',
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا',
      english: 'And whoever fears Allah - He will make for him a way out',
      reference: 'Surah At-Talaq 65:2',
      date: new Date().toLocaleDateString()
    },
    {
      id: 2,
      type: 'Hadith',
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
      english: 'Actions are but by intention',
      reference: 'Sahih Bukhari',
      date: new Date().toLocaleDateString()
    },
    {
      id: 3,
      type: 'Quran',
      arabic: 'وَبَشِّرِ الصَّابِرِينَ',
      english: 'And give good tidings to the patient',
      reference: 'Surah Al-Baqarah 2:155',
      date: new Date().toLocaleDateString()
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPost((prev) => (prev + 1) % islamicPosts.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [islamicPosts.length]);

  const post = islamicPosts[currentPost];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Islamic Reflection',
        text: `${post.english} - ${post.reference}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${post.english} - ${post.reference}`;
      navigator.clipboard.writeText(shareText);
      alert('Content copied to clipboard!');
    }
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-emerald-700">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">{post.type}</span>
          </div>
          
          <div className="space-y-4">
            <p className="text-2xl font-arabic text-gray-800 leading-relaxed">
              {post.arabic}
            </p>
            
            <p className="text-lg text-gray-700 italic leading-relaxed">
              "{post.english}"
            </p>
            
            <p className="text-sm text-emerald-600 font-medium">
              {post.reference}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-emerald-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <Share2 className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyIslamicPost;
