
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Heart, Share2, Calendar } from 'lucide-react';

const DailyIslamicPost = () => {
  const [currentPost, setCurrentPost] = useState(0);
  const [liked, setLiked] = useState(false);

  const dailyPosts = [
    {
      id: 1,
      title: "The Importance of Intention (Niyyah)",
      arabicTitle: "أهمية النية",
      content: "The Prophet (peace be upon him) said: 'Actions are but by intention and every man shall have only that which he intended.' (Bukhari & Muslim)\n\nThis hadith teaches us that our intentions matter greatly in Islam. Before embarking on Hajj or Umrah, purify your intention and make it solely for the sake of Allah.",
      arabicText: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      category: "Hadith",
      date: "2025-01-01",
      reflection: "Today, take a moment to examine your intentions. Are your actions done for Allah's pleasure or for worldly gain? Let this be a reminder to purify our hearts before we act."
    },
    {
      id: 2,
      title: "The Blessed Month of Dhul Hijjah",
      arabicTitle: "شهر ذو الحجة المبارك",
      content: "The Prophet (peace be upon him) said: 'There are no days in which righteous deeds are more beloved to Allah than these ten days.' (Bukhari)\n\nThe first ten days of Dhul Hijjah are among the most sacred times in Islam. Even if you're not performing Hajj, you can still gain immense rewards through worship, charity, and remembrance of Allah.",
      arabicText: "مَا مِنْ أَيَّامٍ الْعَمَلُ الصَّالِحُ فِيهَا أَحَبُّ إِلَى اللَّهِ مِنْ هَذِهِ الْأَيَّامِ",
      category: "Hadith",
      date: "2025-01-02",
      reflection: "How can you make the most of these blessed days? Consider increasing your dhikr, giving charity, and helping others prepare for their spiritual journey."
    },
    {
      id: 3,
      title: "The House of Allah",
      arabicTitle: "بيت الله الحرام",
      content: "And it is upon the people for Allah to make pilgrimage to the House - for whoever is able to find a way. (Quran 3:97)\n\nThe Kaaba stands as a symbol of unity for Muslims worldwide. Five times a day, over a billion Muslims face this sacred house in prayer, creating an invisible bond of brotherhood that transcends all boundaries.",
      arabicText: "وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا",
      category: "Quran",
      date: "2025-01-03",
      reflection: "Every prayer connects you to the Kaaba and to Muslims around the world. Feel this connection and let it remind you of our unity as an Ummah."
    },
    {
      id: 4,
      title: "The Reward of Hajj Mabrur",
      arabicTitle: "ثواب الحج المبرور",
      content: "The Prophet (peace be upon him) said: 'Whoever performs Hajj and does not commit any obscenity or transgression, he returns as pure as the day his mother gave birth to him.' (Bukhari & Muslim)\n\nHajj is not just a physical journey, but a spiritual transformation. It's an opportunity to return to Allah with a clean slate.",
      arabicText: "مَنْ حَجَّ فَلَمْ يَرْفُثْ وَلَمْ يَفْسُقْ رَجَعَ كَمَا وَلَدَتْهُ أُمُّهُ",
      category: "Hadith",
      date: "2025-01-04",
      reflection: "Think about what spiritual baggage you'd like to leave behind. Use today to seek forgiveness and prepare your heart for renewal."
    },
    {
      id: 5,
      title: "The Talbiyah - A Call of Devotion",
      arabicTitle: "التلبية - نداء الإخلاص",
      content: "The Talbiyah is the pilgrim's declaration: 'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed, all praise, favor and sovereignty belong to You. You have no partner.'\n\nThis powerful declaration removes all barriers between the servant and Allah.",
      arabicText: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لَا شَرِيكَ لَكَ",
      category: "Dua",
      date: "2025-01-05",
      reflection: "Even if you're not on Hajj, you can say the Talbiyah and feel the spiritual connection to Allah. Let it remind you of your purpose in life."
    }
  ];

  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    setCurrentPost(dayOfYear % dailyPosts.length);
  }, []);

  const post = dailyPosts[currentPost];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.content,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(`${post.title}\n\n${post.content}\n\n${window.location.href}`);
    }
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <div>
              <CardTitle className="text-xl">Daily Islamic Reflection</CardTitle>
              <p className="text-sm text-gray-600">For the Ummah</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-lg font-arabic text-emerald-600">{post.arabicTitle}</p>
            <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium mt-2">
              {post.category}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-800 leading-relaxed whitespace-pre-line">{post.content}</p>
          </div>

          {post.arabicText && (
            <div className="bg-emerald-50 p-4 rounded-lg text-center">
              <p className="text-xl font-arabic text-emerald-800 leading-relaxed">{post.arabicText}</p>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Daily Reflection:</h4>
            <p className="text-blue-800 leading-relaxed">{post.reflection}</p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLiked(!liked)}
              className={`flex items-center space-x-2 ${liked ? 'text-red-500' : 'text-gray-500'}`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              <span>{liked ? 'Liked' : 'Like'}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="flex items-center space-x-2 text-gray-500"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyIslamicPost;
