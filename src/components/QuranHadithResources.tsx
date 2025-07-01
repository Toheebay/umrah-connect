
import React, { useState } from 'react';
import { Book, Download, Star, Search, BookOpen, Eye, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const QuranHadithResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('both');
  const [selectedText, setSelectedText] = useState<any>(null);

  const quranSections = [
    {
      id: 1,
      title: 'Complete Quran - English Translation',
      arabicTitle: 'القرآن الكريم',
      chapters: 114,
      verses: 6236,
      type: 'Text',
      description: 'Complete Quran with English translation by Sahih International. Read verse by verse with clear formatting.',
      languages: ['English', 'Arabic'],
      size: '4.2 MB',
      content: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense...',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Quran - Arabic Text Only',
      arabicTitle: 'القرآن الكريم - النص العربي',
      chapters: 114,
      verses: 6236,
      type: 'Text',
      description: 'Complete Quran in original Arabic with beautiful calligraphy and proper Tajweed marks.',
      languages: ['Arabic'],
      size: '3.8 MB',
      content: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ...',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Quran for Hajj & Umrah',
      arabicTitle: 'آيات الحج والعمرة',
      chapters: 'Selected Verses',
      verses: 156,
      type: 'Text',
      description: 'Specific verses and duas for Hajj and Umrah with explanations and context.',
      languages: ['English', 'Arabic'],
      size: '1.2 MB',
      content: 'And [mention, O Muhammad], when We designated for Abraham the site of the House, [saying], "Do not associate anything with Me..."',
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
      description: 'Complete collection of Riyad as-Salihin with English translation and commentary.',
      languages: ['English', 'Arabic'],
      chapters: 19,
      size: '5.2 MB',
      content: 'Chapter 1: On Sincerity and Having Pure Intention in All Acts of Worship, Apparent and Hidden. Allah the Exalted says: "And they were not commanded except to worship Allah, [being] sincere to Him in religion..."',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Sahih Bukhari - Hajj & Umrah',
      arabicTitle: 'صحيح البخاري - كتاب الحج',
      author: 'Imam Bukhari',
      hadiths: 234,
      type: 'Text',
      description: 'Authentic hadiths about Hajj and Umrah from Sahih Bukhari with detailed explanations.',
      languages: ['English', 'Arabic'],
      chapters: 8,
      size: '2.8 MB',
      content: 'Book of Hajj: Narrated Ibn Abbas: The Prophet (ﷺ) said, "This is Mecca, Allah has made it sacred since the day He created the heavens and the earth..."',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Sahih Muslim - Hajj Collection',
      arabicTitle: 'صحيح مسلم - كتاب الحج',
      author: 'Imam Muslim',
      hadiths: 428,
      type: 'Text',
      description: 'Comprehensive Hajj and Umrah hadiths from Sahih Muslim with authentic chains.',
      languages: ['English', 'Arabic'],
      chapters: 12,
      size: '3.6 MB',
      content: 'Chapter: The Virtue of Hajj and Umrah: It is narrated on the authority of Abu Huraira that the Messenger of Allah (ﷺ) said: "Umrah is an expiation for the sins committed between it and the previous one..."',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 4,
      title: 'Fortress of the Muslim (Hisn al-Muslim)',
      arabicTitle: 'حصن المسلم',
      author: 'Said bin Ali bin Wahf Al-Qahtani',
      hadiths: 280,
      type: 'Text',
      description: 'Comprehensive collection of authentic duas and supplications for daily life.',
      languages: ['English', 'Arabic'],
      size: '1.8 MB',
      content: 'Chapter 1: When waking up - الاستيقاظ من النوم: الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ - All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection.',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const islamicHistory = [
    {
      id: 1,
      title: 'Men Around The Messenger - Complete',
      arabicTitle: 'رجال حول الرسول',
      author: 'Khalid Muhammad Khalid',
      pages: 384,
      type: 'Text',
      description: 'Inspiring stories and biographies of the companions of Prophet Muhammad (PBUH). Learn about their faith, sacrifice, and dedication.',
      languages: ['English'],
      size: '4.8 MB',
      content: 'Chapter 1: Abu Bakr As-Siddiq - The Truthful One: Among all the companions of the Prophet, none was closer to him than Abu Bakr. He was the first man to believe in Islam and remained the Prophet\'s most trusted friend throughout his life...',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'History of the Holy Kaaba',
      arabicTitle: 'تاريخ الكعبة المشرفة',
      author: 'Dr. Muhammad Ilyas Abdul Ghani',
      pages: 256,
      type: 'Text',
      description: 'Detailed historical account of the Holy Kaaba from the time of Prophet Ibrahim (AS) to present day.',
      languages: ['English'],
      size: '3.2 MB',
      content: 'Chapter 1: The Foundation by Ibrahim (AS): The Holy Kaaba, known as Bayt Allah (House of Allah), was first built by Prophet Ibrahim (Abraham) and his son Ismail (Ishmael) upon Allah\'s command...',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
      arabicTitle: 'الرحيق المختوم',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      pages: 496,
      type: 'Text',
      description: 'Complete and authentic biography of Prophet Muhammad (PBUH) - winner of the first prize in the worldwide competition on the biography of the Prophet.',
      languages: ['English'],
      size: '5.8 MB',
      content: 'Chapter 1: Location and Nature of Arab Tribes: The Arabian Peninsula is enclosed in the west by the Red Sea and Sinai, in the east by the Arabian Gulf, in the south by the Arabian Sea, which is an extension of the Indian Ocean...',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleReadText = (item: any) => {
    setSelectedText(item);
  };

  const handleDownload = (item: any) => {
    // Create a blob with the text content
    const blob = new Blob([item.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getTypeIcon = (type: string) => {
    return '📖';
  };

  const getTypeColor = (type: string) => {
    return 'bg-blue-100 text-blue-700';
  };

  if (selectedText) {
    return (
      <div className="max-w-4xl mx-auto">
        <Button 
          onClick={() => setSelectedText(null)} 
          variant="outline" 
          className="mb-4"
        >
          ← Back to Resources
        </Button>
        
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {selectedText.title}
            </CardTitle>
            {selectedText.arabicTitle && (
              <p className="text-xl font-arabic text-emerald-600 text-center">
                {selectedText.arabicTitle}
              </p>
            )}
            {selectedText.author && (
              <p className="text-center text-gray-600 italic">
                by {selectedText.author}
              </p>
            )}
          </CardHeader>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedText.content}
                </p>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => handleDownload(selectedText)}
                  className="bg-gradient-islamic hover:opacity-90 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Text ({selectedText.size})
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Tabs defaultValue="quran" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="quran" className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4" />
            <span>Holy Quran</span>
          </TabsTrigger>
          <TabsTrigger value="hadith" className="flex items-center space-x-2">
            <Book className="w-4 h-4" />
            <span>Hadith Collections</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Islamic History</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="quran">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-islamic bg-clip-text text-transparent">Holy Quran</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">Complete Quran text in Arabic and English - Read and Download</p>
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
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-center text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{section.chapters}</div>
                      <div className="text-xs text-gray-500">Chapters</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{section.verses}</div>
                      <div className="text-xs text-gray-500">Verses</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => handleReadText(section)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
                      onClick={() => handleDownload(section)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
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
            <p className="text-center text-gray-600 mb-6">Authentic Hadith collections - Read complete texts and download</p>
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
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-center text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{collection.hadiths}</div>
                      <div className="text-xs text-gray-500">Hadiths</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{collection.chapters || 'N/A'}</div>
                      <div className="text-xs text-gray-500">Chapters</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => handleReadText(collection)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
                      onClick={() => handleDownload(collection)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-center mb-4">
              <span className="bg-gradient-islamic bg-clip-text text-transparent">Islamic History</span>
            </h2>
            <p className="text-center text-gray-600 mb-6">Essential Islamic history books - Read inspiring stories and download complete texts</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {islamicHistory.map((book) => (
              <Card key={book.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
                <div className="relative">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-bold ${getTypeColor(book.type)}`}>
                    {getTypeIcon(book.type)} {book.type}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="font-bold text-lg mb-1">{book.title}</h3>
                    {book.arabicTitle && (
                      <p className="text-lg font-arabic text-emerald-600 mb-1">{book.arabicTitle}</p>
                    )}
                    <p className="text-sm text-gray-500 italic">by {book.author}</p>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 text-center">{book.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 mb-4 text-center text-sm">
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{book.pages}</div>
                      <div className="text-xs text-gray-500">Pages</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{book.size}</div>
                      <div className="text-xs text-gray-500">File Size</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => handleReadText(book)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Read
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
                      onClick={() => handleDownload(book)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
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
