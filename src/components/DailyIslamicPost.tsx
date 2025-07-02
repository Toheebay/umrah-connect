
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calendar, Share2, Heart, RefreshCw } from 'lucide-react';

const DailyIslamicPost = () => {
  const [currentPost, setCurrentPost] = useState(0);
  
  const islamicPosts = [
    {
      id: 1,
      type: 'Quran',
      arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ ۚ قَدْ جَعَلَ اللَّهُ لِكُلِّ شَيْءٍ قَدْرًا',
      english: 'And whoever fears Allah - He will make for him a way out. And will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose. Allah has already set for everything a [decreed] extent.',
      reference: 'Surah At-Talaq 65:2-3',
      date: new Date().toLocaleDateString(),
      reflection: 'This beautiful verse reminds us that when we have Taqwa (God-consciousness) and trust in Allah, He opens doors we never imagined and provides from sources we never expected. True reliance on Allah brings peace and removes anxiety from our hearts.'
    },
    {
      id: 2,
      type: 'Hadith',
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى، فَمَنْ كَانَتْ هِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ فَهِجْرَتُهُ إِلَى اللَّهِ وَرَسُولِهِ، وَمَنْ كَانَتْ هِجْرَتُهُ لِدُنْيَا يُصِيبُهَا أَوِ امْرَأَةٍ يَنْكِحُهَا فَهِجْرَتُهُ إِلَى مَا هَاجَرَ إِلَيْهِ',
      english: 'Actions are but by intention, and every man shall have only that which he intended. Thus he whose migration (Hijrah) was for Allah and His Messenger, his migration was for Allah and His Messenger, and he whose migration was to achieve some worldly benefit or to take some woman in marriage, his migration was for that for which he migrated.',
      reference: 'Sahih Bukhari & Muslim',
      date: new Date().toLocaleDateString(),
      reflection: 'This fundamental hadith teaches us that the value of our deeds lies in our intentions. Before any action, we should purify our hearts and align our intentions with seeking Allah\'s pleasure. This transforms even mundane activities into acts of worship.'
    },
    {
      id: 3,
      type: 'Dua',
      arabic: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ خَيْرِ مَا سَأَلَكَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا اسْتَعَاذَ مِنْهُ نَبِيُّكَ مُحَمَّدٌ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
      english: 'O Allah, help me to remember You, to thank You, and to worship You in the best manner. O Allah, I ask You for the good that Your Prophet Muhammad (peace be upon him) asked You for, and I seek refuge in You from the evil that Your Prophet Muhammad (peace be upon him) sought refuge from.',
      reference: 'Abu Dawud & At-Tirmidhi',
      date: new Date().toLocaleDateString(),
      reflection: 'This comprehensive dua encompasses remembrance of Allah, gratitude, and excellence in worship. By following the Prophet\'s example in our supplications, we ensure we are asking for the best and seeking protection from the worst.'
    },
    {
      id: 4,
      type: 'Quran',
      arabic: 'وَبَشِّرِ الصَّابِرِينَ الَّذِينَ إِذَا أَصَابَتْهُم مُّصِيبَةٌ قَالُوا إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ أُولَٰئِكَ عَلَيْهِمْ صَلَوَاتٌ مِّن رَّبِّهِمْ وَرَحْمَةٌ ۖ وَأُولَٰئِكَ هُمُ الْمُهْتَدُونَ',
      english: 'And give good tidings to the patient, Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return." Those are the ones upon whom are blessings from their Lord and mercy. And it is those who are the [rightly] guided.',
      reference: 'Surah Al-Baqarah 2:155-157',
      date: new Date().toLocaleDateString(),
      reflection: 'These profound verses teach us the proper response to trials and tribulations. True patience (Sabr) is not passive endurance, but active faith accompanied by the remembrance that we belong to Allah and will return to Him. Such patience brings divine blessings, mercy, and guidance.'
    },
    {
      id: 5,
      type: 'Hadith',
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ جَارَهُ، وَمَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
      english: 'Whoever believes in Allah and the Last Day should speak good or remain silent. Whoever believes in Allah and the Last Day should honor his neighbor. Whoever believes in Allah and the Last Day should honor his guest.',
      reference: 'Sahih Bukhari & Muslim',
      date: new Date().toLocaleDateString(),
      reflection: 'This hadith outlines three fundamental aspects of Islamic character: mindful speech, neighborly kindness, and hospitality. These actions reflect true faith and create a harmonious society built on respect, kindness, and mutual care.'
    },
    {
      id: 6,
      type: 'Dua',
      arabic: 'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي ۚ رَبَّنَا وَتَقَبَّلْ دُعَاءِ رَبَّنَا اغْفِرْ لِي وَلِوَالِدَيَّ وَلِلْمُؤْمِنِينَ يَوْمَ يَقُومُ الْحِسَابُ',
      english: 'My Lord, make me an establisher of prayer, and [many] from my descendants. Our Lord, and accept my supplication. Our Lord, forgive me and my parents and the believers the Day the account is established.',
      reference: 'Surah Ibrahim 14:40-41 (Dua of Ibrahim AS)',
      date: new Date().toLocaleDateString(),
      reflection: 'This beautiful dua of Prophet Ibrahim (AS) shows us the importance of praying for righteousness for ourselves and our descendants, seeking forgiveness for our parents, and remembering the entire ummah in our supplications. It teaches us to think beyond ourselves and pray for the spiritual well-being of our families and community.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPost((prev) => (prev + 1) % islamicPosts.length);
    }, 15000); // Changed to 15 seconds for longer content

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
      const shareText = `${post.english} - ${post.reference}`;
      navigator.clipboard.writeText(shareText);
      alert('Content copied to clipboard!');
    }
  };

  const handleNext = () => {
    setCurrentPost((prev) => (prev + 1) % islamicPosts.length);
  };

  const handlePrevious = () => {
    setCurrentPost((prev) => (prev - 1 + islamicPosts.length) % islamicPosts.length);
  };

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 shadow-lg">
      <CardContent className="p-8">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-emerald-700">
            <BookOpen className="w-5 h-5" />
            <span className="font-semibold">{post.type}</span>
          </div>
          
          <div className="space-y-6">
            <p className="text-2xl font-arabic text-gray-800 leading-relaxed">
              {post.arabic}
            </p>
            
            <p className="text-lg text-gray-700 italic leading-relaxed">
              "{post.english}"
            </p>
            
            <p className="text-sm text-emerald-600 font-medium">
              {post.reference}
            </p>

            {post.reflection && (
              <div className="bg-white/50 p-4 rounded-lg border border-emerald-200">
                <h4 className="font-semibold text-emerald-800 mb-2">Reflection:</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {post.reflection}
                </p>
              </div>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-emerald-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>{post.date}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                ←
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                size="sm"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Next
              </Button>
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

          <div className="flex justify-center space-x-1 pt-2">
            {islamicPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPost(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentPost ? 'bg-emerald-600' : 'bg-emerald-300'
                }`}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyIslamicPost;
