import React, { useState } from 'react';
import { Book, Play, Download, Star, Search, Filter, Globe, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const IslamicResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources', count: 32 },
    { id: 'hajj', name: 'Hajj Guide', count: 8 },
    { id: 'umrah', name: 'Umrah Guide', count: 8 },
    { id: 'duas', name: 'Duas & Prayers', count: 5 },
    { id: 'history', name: 'Islamic History', count: 6 },
    { id: 'quran', name: 'Complete Quran', count: 3 },
    { id: 'hadith', name: 'Hadith Collections', count: 2 }
  ];

  const resources = [
    // Complete Quran Resources
    {
      id: 1,
      title: 'Complete Quran - Arabic Text',
      category: 'quran',
      type: 'Text',
      description: 'Complete Holy Quran in original Arabic with beautiful calligraphy and proper Tajweed marks.',
      rating: 4.9,
      downloads: 25600,
      size: '4.2 MB',
      languages: ['Arabic'],
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Complete Quran - English Translation',
      category: 'quran',
      type: 'Text',
      description: 'Complete Quran with accurate English translation by multiple renowned scholars including Sahih International.',
      rating: 4.8,
      downloads: 18900,
      size: '3.8 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Quran - Arabic & English Combined',
      category: 'quran',
      type: 'Interactive',
      description: 'Interactive Quran with side-by-side Arabic text and English translation, verse-by-verse navigation.',
      rating: 4.9,
      downloads: 32100,
      size: '6.5 MB',
      languages: ['Arabic', 'English'],
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    // Hadith Collections
    {
      id: 4,
      title: 'Riyad as-Salihin - Complete Arabic Text',
      category: 'hadith',
      type: 'Text',
      description: 'Complete collection of Riyad as-Salihin in original Arabic with proper diacritics and chapter divisions.',
      rating: 4.9,
      downloads: 15400,
      size: '2.8 MB',
      languages: ['Arabic'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 5,
      title: 'Riyad as-Salihin - English Translation',
      category: 'hadith',
      type: 'Text',
      description: 'Complete English translation of Riyad as-Salihin with detailed explanations and commentary.',
      rating: 4.8,
      downloads: 12800,
      size: '3.2 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    // Complete Umrah Guides
    {
      id: 6,
      title: 'Complete Umrah Guide - Arabic',
      category: 'umrah',
      type: 'Text',
      description: 'Comprehensive Umrah guide in Arabic covering all rituals, supplications, and practical instructions.',
      rating: 4.9,
      downloads: 9800,
      size: '2.1 MB',
      languages: ['Arabic'],
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 7,
      title: 'Complete Umrah Guide - English',
      category: 'umrah',
      type: 'Text',
      description: 'Step-by-step Umrah guide in English with detailed explanations, maps, and practical tips for pilgrims.',
      rating: 4.8,
      downloads: 11200,
      size: '2.5 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 8,
      title: 'Umrah Rituals Explained',
      category: 'umrah',
      type: 'Video',
      description: 'Visual guide explaining each step of Umrah with practical demonstrations and Arabic pronunciations.',
      rating: 4.8,
      downloads: 8900,
      duration: '45 min',
      languages: ['Arabic', 'English'],
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=300&q=80'
    },
    // Islamic History Books
    {
      id: 9,
      title: 'Men Around The Messenger - Complete',
      category: 'history',
      type: 'Text',
      description: 'Complete book about the companions of Prophet Muhammad (PBUH) - inspiring stories and biographies.',
      rating: 4.9,
      downloads: 7600,
      size: '4.8 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 10,
      title: 'History of the Holy Kaaba',
      category: 'history',
      type: 'Text',
      description: 'Detailed historical account of the Holy Kaaba from the time of Prophet Ibrahim (AS) to present day.',
      rating: 4.7,
      downloads: 7800,
      size: '1.8 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 11,
      title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
      category: 'history',
      type: 'Text',
      description: 'Complete biography of Prophet Muhammad (PBUH) - authentic and comprehensive life story.',
      rating: 4.9,
      downloads: 13400,
      size: '5.2 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    // Essential Hajj Resources
    {
      id: 12,
      title: 'Complete Hajj Guide',
      category: 'hajj',
      type: 'PDF',
      description: 'Comprehensive step-by-step guide for Hajj pilgrimage including rituals, duas, and practical tips.',
      rating: 4.9,
      downloads: 12500,
      size: '2.5 MB',
      languages: ['English'],
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 13,
      title: 'Essential Duas for Pilgrimage',
      category: 'duas',
      type: 'Audio',
      description: 'Collection of important duas for Hajj and Umrah with Arabic text, transliteration, and meanings.',
      rating: 4.9,
      downloads: 15600,
      duration: '1.2 hours',
      languages: ['Arabic', 'English'],
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const filteredResources = resources.filter(resource => 
    (selectedCategory === 'all' || resource.category === selectedCategory) &&
    (searchTerm === '' || resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return '📄';
      case 'Video': return '🎥';
      case 'Audio': return '🎧';
      case 'Interactive': return '💻';
      case 'Text': return '📖';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'Video': return 'bg-blue-100 text-blue-700';
      case 'Audio': return 'bg-green-100 text-green-700';
      case 'Interactive': return 'bg-purple-100 text-purple-700';
      case 'Text': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                <span>Categories</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Categories */}
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{category.count}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Featured Dua */}
          <Card className="bg-gradient-to-br from-emerald-500 to-blue-600 text-white border-0 shadow-xl mt-6">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-2">Daily Dua</h3>
              <div className="text-right mb-2 text-xl font-arabic">
                رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ
              </div>
              <p className="text-sm opacity-90">
                "Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <Card key={resource.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(resource.type)}`}>
                    {getTypeIcon(resource.type)} {resource.type}
                  </div>
                  {resource.languages && (
                    <div className="absolute top-4 left-4 flex space-x-1">
                      {resource.languages.map((lang, idx) => (
                        <span key={idx} className="bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                          {lang === 'Arabic' ? '🇸🇦' : '🇺🇸'} {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium text-sm">{resource.rating}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {resource.downloads.toLocaleString()} downloads
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {resource.size || resource.duration}
                    </div>
                    <div className="flex space-x-2">
                      {resource.type === 'Video' && (
                        <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" className="bg-gradient-islamic hover:opacity-90 text-white">
                        <Download className="w-4 h-4 mr-1" />
                        Get
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'PDF': return '📄';
    case 'Video': return '🎥';
    case 'Audio': return '🎧';
    case 'Interactive': return '💻';
    case 'Text': return '📖';
    default: return '📚';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'PDF': return 'bg-red-100 text-red-700';
    case 'Video': return 'bg-blue-100 text-blue-700';
    case 'Audio': return 'bg-green-100 text-green-700';
    case 'Interactive': return 'bg-purple-100 text-purple-700';
    case 'Text': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export default IslamicResources;
