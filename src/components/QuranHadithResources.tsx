
import React, { useState } from 'react';
import { Book, Play, Download, Star, Search, Filter, Volume2, BookOpen, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QuranHadithResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('both');

  const quranSections = [
    {
      id: 1,
      title: 'Complete Quran - English Translation',
      arabicTitle: 'القرآن الكريم',
      chapters: 114,
      type: 'Text',
      description: 'Complete Quran with English translation by Sahih International',
      languages: ['English', 'Arabic'],
      audioAvailable: true,
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Quran Audio Recitation',
      arabicTitle: 'تلاوة القرآن الكريم',
      reciter: 'Sheikh Abdul Rahman Al-Sudais',
      type: 'Audio',
      description: 'Beautiful recitation of the complete Quran with Tajweed',
      languages: ['Arabic'],
      duration: '18 hours',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Quran for Hajj & Umrah',
      arabicTitle: 'آيات الحج والعمرة',
      chapters: 'Selected Verses',
      type: 'Interactive',
      description: 'Specific verses and duas for Hajj and Umrah with explanations',
      languages: ['English', 'Arabic'],
      audioAvailable: true,
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const hadithCollections = [
    {
      id: 1,
      title: 'Riyad as-Salihin (Complete)',
      arabicTitle: 'رياض الصالحين',
      author: 'Imam An-Nawawi',
      hadiths: 1896,
      type: 'Text',
      description: 'Complete collection of Riyad as-Salihin with English translation',
      languages: ['English', 'Arabic'],
      chapters: 19,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Sahih Bukhari - Hajj & Umrah',
      arabicTitle: 'صحيح البخاري - كتاب الحج',
      author: 'Imam Bukhari',
      hadiths: 234,
      type: 'Text',
      description: 'Authentic hadiths about Hajj and Umrah from Sahih Bukhari',
      languages: ['English', 'Arabic'],
      chapters: 8,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Sahih Muslim - Hajj Collection',
      arabicTitle: 'صحيح مسلم - كتاب الحج',
      author: 'Imam Muslim',
      hadiths: 428,
      type: 'Text',
      description: 'Comprehensive Hajj and Umrah hadiths from Sahih Muslim',
      languages: ['English', 'Arabic'],
      chapters: 12,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      title: 'Fortress of the Muslim (Hisn al-Muslim)',
      arabicTitle: 'حصن المسلم',
      author: 'Said bin Ali bin Wahf Al-Qahtani',
      hadiths: 280,
      type: 'Duas',
      description: 'Comprehensive collection of authentic duas and supplications',
      languages: ['English', 'Arabic'],
      audioAvailable: true,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 5,
      title: 'Bulugh al-Maram',
      arabicTitle: 'بلوغ المرام',
      author: 'Ibn Hajar al-Asqalani',
      hadiths: 1358,
      type: 'Text',
      description: 'Collection of hadiths on Islamic jurisprudence',
      languages: ['English', 'Arabic'],
      chapters: 16,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Text': return '📖';
      case 'Audio': return '🎧';
      case 'Interactive': return '💻';
      case 'Duas': return '🤲';
      default: return '📚';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Text': return 'bg-blue-100 text-blue-700';
      case 'Audio': return 'bg-green-100 text-green-700';
      case 'Interactive': return 'bg-purple-100 text-purple-700';
      case 'Duas': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="quran" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="quran" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Holy Quran</span>
          </TabsTrigger>
          <TabsTrigger value="hadith" className="flex items-center space-x-2">
            <Book className="w-4 h-4" />
            <span>Hadith Collections</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quran">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-islamic bg-clip-text text-transparent">Holy Quran</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">Complete Quran in Arabic and English with audio recitations</p>
            
            {/* Search and Language Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search in Quran..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="both">Arabic & English</option>
                <option value="arabic">Arabic Only</option>
                <option value="english">English Only</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {quranSections.map((section) => (
              <Card key={section.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative">
                  <img 
                    src={section.image} 
                    alt={section.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(section.type)}`}>
                    {getTypeIcon(section.type)} {section.type}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg mb-1">{section.title}</h3>
                    <p className="text-xl font-arabic text-emerald-600 mb-2">{section.arabicTitle}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 text-center">{section.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-gray-500">
                      {section.chapters ? `${section.chapters} Chapters` : section.reciter}
                    </div>
                    {section.audioAvailable && (
                      <div className="flex items-center space-x-1 text-green-600">
                        <Volume2 className="w-4 h-4" />
                        <span className="text-xs">Audio</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    {section.audioAvailable && (
                      <Button size="sm" variant="outline" className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        <Play className="w-4 h-4 mr-1" />
                        Listen
                      </Button>
                    )}
                    <Button size="sm" className="flex-1 bg-gradient-islamic hover:opacity-90 text-white">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hadith">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-islamic bg-clip-text text-transparent">Hadith Collections</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">Authentic Hadith collections including Riyad as-Salihin and other major works</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hadithCollections.map((collection) => (
              <Card key={collection.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(collection.type)}`}>
                    {getTypeIcon(collection.type)} {collection.type}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg mb-1">{collection.title}</h3>
                    <p className="text-lg font-arabic text-emerald-600 mb-1">{collection.arabicTitle}</p>
                    <p className="text-sm text-gray-500 italic">by {collection.author}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 text-center">{collection.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="font-bold text-emerald-600">{collection.hadiths}</div>
                      <div className="text-xs text-gray-500">Hadiths</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-lg">
                      <div className="font-bold text-emerald-600">{collection.chapters || 'N/A'}</div>
                      <div className="text-xs text-gray-500">Chapters</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {collection.audioAvailable && (
                      <Button size="sm" variant="outline" className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        <Play className="w-4 h-4 mr-1" />
                        Audio
                      </Button>
                    )}
                    <Button size="sm" className="flex-1 bg-gradient-islamic hover:opacity-90 text-white">
                      <Book className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuranHadithResources;
