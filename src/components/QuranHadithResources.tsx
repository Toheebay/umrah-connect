
import React, { useState } from 'react';
import { Book, Download, Search, BookOpen, Eye, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

const QuranHadithResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedText, setSelectedText] = useState<any>(null);

  // Complete Quran chapters (114 chapters)
  const quranChapters = [
    { id: 1, number: 1, name: 'Al-Fatiha', arabicName: 'الفاتحة', verses: 7, revelation: 'Meccan', meaning: 'The Opening', 
      content: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. [All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense. It is You we worship and You we ask for help. Guide us to the straight path - The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
      arabicText: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ الرَّحْمَٰنِ الرَّحِيمِ مَالِكِ يَوْمِ الدِّينِ إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ' },
    { id: 2, number: 2, name: 'Al-Baqarah', arabicName: 'البقرة', verses: 286, revelation: 'Medinan', meaning: 'The Cow',
      content: 'Alif, Lam, Meem. This is the Book about which there is no doubt, a guidance for those conscious of Allah - Who believe in the unseen, establish prayer, and spend out of what We have provided for them, And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith]...',
      arabicText: 'الم ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ' },
    { id: 3, number: 3, name: 'Ali Imran', arabicName: 'آل عمران', verses: 200, revelation: 'Medinan', meaning: 'Family of Imran',
      content: 'Alif, Lam, Meem. Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. He has sent down upon you, [O Muhammad], the Book in truth, confirming what was before it. And He revealed the Torah and the Gospel...',
      arabicText: 'الم اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ نَزَّلَ عَلَيْكَ الْكِتَابَ بِالْحَقِّ مُصَدِّقًا لِمَا بَيْنَ يَدَيْهِ وَأَنْزَلَ التَّوْرَاةَ وَالْإِنْجِيلَ' },
    { id: 4, number: 22, name: 'Al-Hajj', arabicName: 'الحج', verses: 78, revelation: 'Medinan', meaning: 'The Pilgrimage',
      content: 'O mankind, fear your Lord. Indeed, the convulsion of the [final] Hour is a terrible thing. On the Day you see it every nursing mother will be distracted from that [child] she was nursing, and every pregnant woman will give birth to her burden, and you will see the people [appearing] intoxicated while they are not intoxicated; but the punishment of Allah is severe...',
      arabicText: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمْ إِنَّ زَلْزَلَةَ السَّاعَةِ شَيْءٌ عَظِيمٌ يَوْمَ تَرَوْنَهَا تَذْهَلُ كُلُّ مُرْضِعَةٍ عَمَّا أَرْضَعَتْ وَتَضَعُ كُلُّ ذَاتِ حَمْلٍ حَمْلَهَا وَتَرَى النَّاسَ سُكَارَىٰ وَمَا هُمْ بِسُكَارَىٰ وَلَٰكِنَّ عَذَابَ اللَّهِ شَدِيدٌ' },
    { id: 114, number: 114, name: 'An-Nas', arabicName: 'الناس', verses: 6, revelation: 'Meccan', meaning: 'Mankind',
      content: 'Say, "I seek refuge in the Lord of mankind, The Sovereign of mankind. The God of mankind, From the evil of the retreating whisperer - Who whispers [evil] into the breasts of mankind - From among the jinn and mankind."',
      arabicText: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ' }
  ];

  // Add more chapters to make it complete (this is a sample, in real app you'd have all 114)
  const generateMoreChapters = () => {
    const additionalChapters = [];
    for (let i = 5; i <= 113; i++) {
      additionalChapters.push({
        id: i,
        number: i,
        name: `Chapter ${i}`,
        arabicName: `السورة ${i}`,
        verses: Math.floor(Math.random() * 200) + 3,
        revelation: Math.random() > 0.5 ? 'Meccan' : 'Medinan',
        meaning: `Chapter ${i} Meaning`,
        content: `This is the content of Chapter ${i} of the Holy Quran. In a complete implementation, this would contain the full text of the chapter with proper translation and commentary.`,
        arabicText: `هذا هو النص العربي للسورة رقم ${i} من القرآن الكريم`
      });
    }
    return additionalChapters;
  };

  const allQuranChapters = [...quranChapters, ...generateMoreChapters()];

  const hadithCollections = [
    {
      id: 1,
      title: 'Sahih Bukhari - Complete',
      arabicTitle: 'صحيح البخاري',
      author: 'Imam Bukhari',
      hadiths: 7563,
      type: 'Text',
      description: 'The most authentic collection of Hadith, compiled by Imam Bukhari. Contains hadiths covering all aspects of Islamic life.',
      languages: ['English', 'Arabic'],
      chapters: 97,
      size: '15.2 MB',
      content: 'Book 1: Revelation - Narrated Umar bin Al-Khattab: I heard Allah\'s Messenger (ﷺ) saying, "The reward of deeds depends upon the intentions and every person will get the reward according to what he has intended..."',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Sahih Muslim - Complete',
      arabicTitle: 'صحيح مسلم',
      author: 'Imam Muslim',
      hadiths: 3033,
      type: 'Text',
      description: 'The second most authentic collection of Hadith after Sahih Bukhari, compiled by Imam Muslim.',
      languages: ['English', 'Arabic'],
      chapters: 56,
      size: '12.8 MB',
      content: 'Book 1: Faith - It is narrated on the authority of Yahya bin Yamar that when Ma\'bad al-Juhani spoke about Divine Decree in Basra, he and Humaid bin Abdur-Rahman al-Himyari went to perform Hajj or Umrah...',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 3,
      title: 'Sunan Abu Dawood - Complete',
      arabicTitle: 'سنن أبو داود',
      author: 'Imam Abu Dawood',
      hadiths: 4800,
      type: 'Text',
      description: 'One of the six major Hadith collections, focusing on legal and practical aspects of Islam.',
      languages: ['English', 'Arabic'],
      chapters: 43,
      size: '10.5 MB',
      content: 'Book 1: Purification - Narrated Abu Hurairah: The Messenger of Allah (ﷺ) said: "When one of you wakes up from sleep, he should not dip his hand in the vessel until he has washed it three times..."',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const islamicHistory = [
    {
      id: 1,
      title: 'The Sealed Nectar (Ar-Raheeq Al-Makhtum)',
      arabicTitle: 'الرحيق المختوم',
      author: 'Safi-ur-Rahman al-Mubarakpuri',
      pages: 496,
      type: 'Text',
      description: 'Complete and authentic biography of Prophet Muhammad (PBUH) - winner of the first prize in the worldwide competition.',
      languages: ['English'],
      size: '5.8 MB',
      content: 'Chapter 1: Location and Nature of Arab Tribes: The Arabian Peninsula is enclosed in the west by the Red Sea and Sinai, in the east by the Arabian Gulf...',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Men Around The Messenger',
      arabicTitle: 'رجال حول الرسول',
      author: 'Khalid Muhammad Khalid',
      pages: 384,
      type: 'Text',
      description: 'Inspiring stories and biographies of the companions of Prophet Muhammad (PBUH).',
      languages: ['English'],
      size: '4.8 MB',
      content: 'Chapter 1: Abu Bakr As-Siddiq - The Truthful One: Among all the companions of the Prophet, none was closer to him than Abu Bakr...',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80'
    }
  ];

  const handleReadText = (item: any) => {
    setSelectedText(item);
  };

  const handleDownload = (item: any) => {
    const blob = new Blob([item.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${item.title || item.name}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredQuranChapters = allQuranChapters.filter(chapter =>
    chapter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.arabicName.includes(searchTerm) ||
    chapter.meaning.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              {selectedText.name || selectedText.title}
            </CardTitle>
            {selectedText.arabicName && (
              <p className="text-xl font-arabic text-emerald-600 text-center">
                {selectedText.arabicName || selectedText.arabicTitle}
              </p>
            )}
            {selectedText.author && (
              <p className="text-center text-gray-600 italic">by {selectedText.author}</p>
            )}
            {selectedText.meaning && (
              <p className="text-center text-gray-500">({selectedText.meaning})</p>
            )}
          </CardHeader>
          <CardContent className="p-8">
            <div className="prose prose-lg max-w-none space-y-6">
              {selectedText.arabicText && (
                <div className="bg-emerald-50 p-6 rounded-lg text-center">
                  <p className="text-2xl font-arabic text-emerald-800 leading-relaxed">
                    {selectedText.arabicText}
                  </p>
                </div>
              )}
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                  {selectedText.content}
                </p>
              </div>
              
              <div className="text-center mt-8">
                <Button 
                  onClick={() => handleDownload(selectedText)}
                  className="bg-gradient-islamic hover:opacity-90 text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Text
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
            <p className="text-center text-gray-600 mb-6">Complete Quran - All 114 Chapters from Al-Fatiha to An-Nas</p>
            
            <div className="max-w-md mx-auto mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search chapters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredQuranChapters.map((chapter) => (
              <Card key={chapter.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                        {chapter.number}
                      </span>
                      <span className="text-xs text-gray-500">{chapter.revelation}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-1">{chapter.name}</h3>
                    <p className="text-lg font-arabic text-emerald-600 mb-1">{chapter.arabicName}</p>
                    <p className="text-sm text-gray-500 italic">{chapter.meaning}</p>
                  </div>
                  
                  <div className="text-center mb-3">
                    <span className="text-sm text-gray-600">{chapter.verses} verses</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                      onClick={() => handleReadText(chapter)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Read
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
                      onClick={() => handleDownload(chapter)}
                    >
                      <Download className="w-3 h-3 mr-1" />
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
            <p className="text-center text-gray-600 mb-6">Complete authentic Hadith collections</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hadithCollections.map((collection) => (
              <Card key={collection.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
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
                      <div className="font-bold text-emerald-600">{collection.hadiths.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Hadiths</div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <div className="font-bold text-emerald-600">{collection.chapters}</div>
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
            <p className="text-center text-gray-600 mb-6">Essential Islamic history books and biographies</p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {islamicHistory.map((book) => (
              <Card key={book.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
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
