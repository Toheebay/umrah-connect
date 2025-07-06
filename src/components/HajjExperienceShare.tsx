
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, MapPin, Calendar, Star } from 'lucide-react';

const HajjExperienceShare = () => {
  const [experiences] = useState([
    {
      id: 1,
      user: "Ahmad from Malaysia",
      title: "My First Hajj Journey - Alhamdulillah!",
      content: "SubhanAllah! Standing at Arafat was the most spiritual moment of my life. The feeling of unity with millions of Muslims from around the world is indescribable. May Allah accept our Hajj.",
      location: "Makkah, Saudi Arabia",
      date: "10 Dhul Hijjah 1445",
      likes: 24,
      comments: 8,
      type: "hajj",
      featured: true
    },
    {
      id: 2,
      user: "Fatima from Nigeria",
      title: "Tips for First-Time Umrah Pilgrims",
      content: "Alhamdulillah for the opportunity to perform Umrah. Here are some practical tips: bring comfortable shoes, stay hydrated, and most importantly, make lots of dua. The Kaaba is truly breathtaking!",
      location: "Madinah, Saudi Arabia",
      date: "15 Rajab 1445",
      likes: 18,
      comments: 12,
      type: "umrah",
      featured: false
    },
    {
      id: 3,
      user: "Ibrahim from Bangladesh",
      title: "The Beauty of Madinah",
      content: "Visiting the Prophet's Mosque was incredibly peaceful. The serenity you feel when praying there is unmatched. May Allah grant us all the chance to visit again and again.",
      location: "Madinah, Saudi Arabia",
      date: "20 Safar 1445",
      likes: 31,
      comments: 15,
      type: "umrah",
      featured: true
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-3 mb-4">
          <span className="text-3xl">✨</span>
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-islamic bg-clip-text text-transparent">
            Share Your Sacred Journey
          </h2>
          <span className="text-3xl">✨</span>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Inspire others with your Hajj & Umrah experiences • Spread the blessings • Build our community
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {experiences.map((experience) => (
          <Card 
            key={experience.id} 
            className={`hover-lift transition-all duration-300 ${
              experience.featured 
                ? 'ring-2 ring-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50' 
                : 'hover:shadow-xl'
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge 
                  variant={experience.type === 'hajj' ? 'default' : 'secondary'}
                  className={
                    experience.type === 'hajj' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                  }
                >
                  {experience.type === 'hajj' ? '🕋 Hajj' : '🤲 Umrah'}
                </Badge>
                {experience.featured && (
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-medium">Featured</span>
                  </div>
                )}
              </div>
              <CardTitle className="text-lg font-bold text-gray-900 leading-tight">
                {experience.title}
              </CardTitle>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">{experience.user}</span>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                {experience.content}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span>{experience.date}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{experience.likes}</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{experience.comments}</span>
                  </button>
                </div>
                <button className="text-gray-600 hover:text-emerald-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button className="bg-gradient-islamic hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Share Your Experience ✨
        </Button>
      </div>
    </div>
  );
};

export default HajjExperienceShare;
