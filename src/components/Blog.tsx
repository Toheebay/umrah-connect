import React, { useState } from 'react';
import { Edit3, Calendar, User, Eye, Heart, MessageCircle, Share2, BookOpen, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'experience' });
  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);

  const togglePostExpansion = (postId: number) => {
    setExpandedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const blogPosts = [
    {
      id: 1,
      title: 'My First Umrah Experience: A Journey of the Heart',
      excerpt: 'SubhanAllah! Words cannot express the overwhelming emotions I felt when I first laid eyes on the Holy Kaaba. The journey to Makkah was not just a physical one, but a spiritual awakening that changed my life forever...',
      content: `SubhanAllah! Words cannot express the overwhelming emotions I felt when I first laid eyes on the Holy Kaaba. The journey to Makkah was not just a physical one, but a spiritual awakening that changed my life forever.

**PREPARATION PHASE:**
The preparation began months before my departure. I spent countless hours reading about the rituals, learning the duas, and preparing my heart for this sacred journey. I read books like "In the Footsteps of the Prophet" and watched documentaries about the Hajj and Umrah. Nothing, however, could have prepared me for the actual experience.

I made sure to:
- Learn all the essential duas in Arabic with proper pronunciation
- Understand the significance of each ritual
- Pack appropriate ihram clothing and comfortable walking shoes
- Get all required vaccinations well in advance
- Arrange for someone to handle my affairs back home

**THE JOURNEY BEGINS:**
As our plane descended into Jeddah, I could feel my heart racing with anticipation. The moment we stepped off the plane, there was something different in the air - a sense of sanctity that I had never experienced before. The airport itself felt blessed, with pilgrims from every corner of the world all united in their purpose.

**FIRST SIGHT OF THE HARAM:**
The first sight of the Haram was breathtaking. Millions of people from every corner of the world, all united in their faith, all there for the same purpose. It was a beautiful reminder of the unity of our Ummah. The diversity was incredible - people of all colors, languages, and backgrounds, but all brothers and sisters in Islam.

**PERFORMING TAWAF:**
Performing Tawaf for the first time was an indescribable experience. Moving with the crowd, reciting the same prayers that millions before us have recited, feeling connected to every Muslim who has ever made this journey - it was pure magic. The Kaaba seemed to pull you towards it like a magnet. I felt like I was in a different dimension, completely absorbed in worship.

During each round, I made different duas:
- For my family's health and guidance
- For the Muslim Ummah worldwide
- For forgiveness of my sins
- For success in this life and the hereafter
- For peace in the world
- For strength to be a better Muslim
- For Allah's mercy and blessings

**SA'I BETWEEN SAFA AND MARWAH:**
The Sa'i was physically challenging but spiritually uplifting. Walking in the footsteps of Hajar (AS), remembering her struggle and trust in Allah, gave me a new perspective on patience and reliance on Allah. Each step reminded me of her courage and faith.

**SPIRITUAL TRANSFORMATION:**
What struck me most was the sense of equality. Rich and poor, young and old, all dressed in simple white clothing, all equal before Allah. It was a powerful reminder that worldly distinctions mean nothing in the sight of Allah.

**LESSONS LEARNED:**
This journey taught me:
- The importance of intention (Niyyah) in all our actions  
- True brotherhood transcends race, language, and nationality
- Patience is a virtue that must be practiced constantly
- Gratitude for Allah's countless blessings
- The temporary nature of this worldly life
- The power of collective worship and unity

**ADVICE FOR FUTURE PILGRIMS:**
- Make lots of dua - this is a time when prayers are answered
- Be patient with crowds and delays
- Focus on your spiritual journey, not the physical discomforts
- Learn basic Arabic phrases
- Bring comfortable shoes - you'll walk A LOT
- Keep yourself in a state of wudu as much as possible
- Remember this experience for the rest of your life

I encourage everyone who has the means to undertake this blessed journey. May Allah accept all our prayers and grant us all the opportunity to visit His House repeatedly. Ameen.

The memories of those blessed days still bring tears to my eyes. It was truly a life-changing experience that I will cherish forever.`,
      author: 'Fatima Al-Zahra',
      date: '2024-01-15',
      category: 'experience',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80',
      likes: 245,
      comments: 58,
      views: 1842,
      avatar: '👩‍🦱'
    },
    {
      id: 2,
      title: 'Complete Spiritual Guide: Essential Duas for Hajj and Umrah',
      excerpt: 'A comprehensive collection of important prayers and supplications for your sacred journey, with Arabic text, transliteration, and deep meanings...',
      content: `Here is a comprehensive collection of essential duas that every pilgrim should know for their Hajj or Umrah journey:

**1. TALBIYAH - THE CALL OF THE PILGRIM:**
**Arabic:**
لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لاَ شَرِيكَ لَكَ

**Transliteration:**
"Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk, innal hamda wan-ni'mata laka wal-mulk, la shareeka lak"

**Meaning:**
"Here I am O Allah, here I am. Here I am, You have no partner, here I am. Verily all praise, grace and dominion belong to You. You have no partner."

**When to recite:** Continuously during Ihram, especially when starting journey, seeing the Kaaba, between rituals.

**2. DUA WHEN SEEING THE KAABA:**
**Arabic:**
اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا

**Transliteration:**
"Allahumma zid hadha al-baita tashrīfan wa ta'zīman wa takrīman wa mahābatan, wa zid man sharrafahu wa karramahu mimman hajjahu awi'tamarahu tashrīfan wa takrīman wa ta'zīman wa birran"

**Meaning:**
"O Allah, increase this House in honor, reverence, nobility and awe. And increase those who honor it and hold it in reverence - those who perform Hajj or Umrah - in honor, nobility, reverence and righteousness."

**3. DUA DURING TAWAF (Between Rukn Yamani and Hajar Aswad):**
**Arabic:**
رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ

**Transliteration:**
"Rabbana atina fi'd-dunya hasanatan wa fi'l-akhirati hasanatan wa qina 'adhab an-nar"

**Meaning:**
"Our Lord, give us good in this world and good in the hereafter, and save us from the punishment of the Fire."

**4. DUA AT MAQAM IBRAHIM:**
**Arabic:**
وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى

**Transliteration:**
"Wattakhidhu min maqami Ibrahima musallan"

**Meaning:**
"And take the station of Ibrahim as a place of prayer."

**5. DUA DURING SA'I:**
**Arabic:**
إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَآئِرِ اللَّهِ ۖ فَمَنْ حَجَّ الْبَيْتَ أَوِ اعْتَمَرَ فَلَا جُنَاحَ عَلَيْهِ أَن يَطَّوَّفَ بِهِمَا ۚ وَمَن تَطَوَّعَ خَيْرًا فَإِنَّ اللَّهَ شَاكِرٌ عَلِيمٌ

**6. DUA FOR FORGIVENESS:**
**Arabic:**
اللَّهُمَّ اغْفِرْ لِي ذَنْبِي وَخَطَئِي وَجَهْلِي

**Transliteration:**
"Allahumma ghfir li dhanbi wa khata'i wa jahli"

**Meaning:**
"O Allah, forgive my sins, my mistakes, and my ignorance."

**7. DUA FOR PARENTS:**
**Arabic:**
رَّبِّ اغْفِرْ لِي وَلِوَالِدَيَّ

**Transliteration:**
"Rabbi ghfir li wa li walidayya"

**Meaning:**
"My Lord, forgive me and my parents."

**SPIRITUAL BENEFITS:**
- These duas connect us directly with Allah
- They purify the heart and soul  
- They bring inner peace and tranquility
- They help us remember our purpose in life
- They strengthen our relationship with Allah

**TIPS FOR EFFECTIVE DUA:**
- Make dua with presence of heart
- Understand the meanings of what you're saying
- Be persistent and don't give up
- Make dua for others as well as yourself
- Choose the best times (between Maghrib and Isha, last third of night)

May Allah accept all our duas and grant us success in this life and the hereafter. Ameen.`,
      author: 'Sheikh Ahmad Rahman',
      date: '2024-01-10',
      category: 'spiritual',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=600&q=80',
      likes: 189,
      comments: 34,
      views: 1234,
      avatar: '👨‍🦲'
    },
    {
      id: 3,
      title: 'Complete Travel Guide: Essential Tips for First-Time Pilgrims',
      excerpt: 'Comprehensive practical advice and tips to make your Hajj or Umrah journey smooth, safe, and memorable. From packing to performing rituals...',
      content: `Planning your first Hajj or Umrah can be overwhelming. Here's a comprehensive guide with practical tips to help you prepare:

**BEFORE YOU TRAVEL - 3 MONTHS AHEAD:**

**Medical Preparations:**
1. Get your vaccinations done well in advance (Meningitis, Yellow Fever if required)
2. Consult your doctor about any medications you're taking
3. Get a complete health checkup
4. Carry a first aid kit with basic medicines
5. If you have chronic conditions, bring extra medication

**Documentation:**
1. Ensure your passport has at least 6 months validity
2. Apply for Umrah/Hajj visa through authorized agents only
3. Make photocopies of all important documents
4. Keep digital copies in cloud storage
5. Carry emergency contact information

**WHAT TO PACK - THE ULTIMATE CHECKLIST:**

**Essential Clothing:**
- 2-3 sets of Ihram for men (seamless white cloth)
- Modest, loose-fitting clothes for women (covering everything except hands and face)
- Comfortable walking shoes (very important!)
- Flip-flops for easy removal
- Light jacket for air-conditioned areas
- Undergarments (white for men during Ihram)

**Religious Items:**
- Small prayer rug (travel-sized)
- Tasbeeh (prayer beads)
- Copy of Quran (pocket-sized)
- Dua book with English translation
- Compass for Qibla direction

**Personal Care:**
- Unscented soap and shampoo (during Ihram)
- Toothbrush and toothpaste
- Sunscreen (unscented)
- Lip balm
- Personal hygiene items
- Small towels

**Health & Safety:**
- Personal medications
- Paracetamol for headaches
- Oral rehydration salts
- Band-aids and antiseptic
- Face masks
- Hand sanitizer

**DURING YOUR JOURNEY - PRACTICAL TIPS:**

**Health Management:**
- Stay hydrated - drink lots of water (but not too much at once)
- Avoid raw foods and street vendors
- Eat from reputable restaurants
- Rest when needed - don't overexert yourself
- Wash hands frequently
- Wear comfortable shoes to prevent blisters

**Navigating Crowds:**
- Be patient with crowds - remember everyone is there for the same purpose
- Stay close to your group
- Have emergency contact numbers memorized
- Keep some money in different pockets
- Use landmarks to remember locations

**During Rituals:**
- Learn the rituals beforehand but don't stress about perfection
- Focus on the spiritual aspect, not just the physical actions
- Make lots of dua - this is a blessed time
- Be respectful of others performing their rituals
- Help elderly and disabled pilgrims when possible

**ACCOMMODATION TIPS:**
- Book through reputable agents only
- Hotels closer to Haram are more expensive but save time and energy
- Bring earplugs - it can be noisy
- Keep your room key and hotel address with you always
- Don't leave valuables in the room

**FOOD AND WATER:**
- Stick to bottled water initially until your stomach adjusts
- Try local cuisine gradually
- Dates and Zamzam water are readily available
- Many hotels provide buffet meals
- Keep some snacks for long days

**MONEY MATTERS:**
- Inform your bank about travel plans
- Carry some cash in Saudi Riyals
- Keep money in different places
- Budget for extras like souvenirs and donations
- Most places accept credit cards now

**SPIRITUAL PREPARATION:**
- Increase your prayers and dhikr before traveling
- Seek forgiveness from those you may have wronged
- Make a list of people to pray for
- Learn the significance of each ritual
- Prepare your heart for this spiritual journey

**SAFETY PRECAUTIONS:**
- Stay with your group
- Keep important phone numbers saved
- Don't accept food or drinks from strangers
- Be aware of pickpockets in crowded areas
- Follow local laws and customs strictly

**TECHNOLOGY TIPS:**
- Download offline maps and translation apps
- Bring portable chargers/power banks
- Get a local SIM card or international roaming
- Take photos mindfully and respectfully
- Use apps for prayer times and Qibla direction

**COMMON MISTAKES TO AVOID:**
- Don't overpack - you'll be walking a lot
- Don't wear new shoes - break them in first
- Don't skip meals due to excitement
- Don't forget to make dua for family and friends
- Don't get frustrated with language barriers

**RETURNING HOME:**
- Bring Zamzam water for family (follow airline regulations)
- Buy meaningful souvenirs, not just expensive ones
- Share your experience with others
- Continue the spiritual momentum you've gained
- Pray for opportunity to return

**FINAL ADVICE:**
Remember, this is a spiritual journey. Be patient, be kind to fellow pilgrims, focus on your relationship with Allah, and don't let minor inconveniences ruin this blessed experience.

May Allah make your journey easy, accept all your prayers, and grant you a Hajj Mabroor or Umrah Mabroor. Ameen.

"And whoever Allah guides - he is the [rightly] guided; but whoever He sends astray - you will never find for them protectors besides Him." - Quran 17:97`,
      author: 'Dr. Aisha Mohammed',
      date: '2024-01-05',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&q=80',
      likes: 312,
      comments: 76,
      views: 2156,
      avatar: '👩'
    },
    {
      id: 4,
      title: 'Hajj 2024: Complete Step-by-Step Ritual Guide',
      excerpt: 'Detailed guide covering all Hajj rituals from Day 1 to completion. Learn the proper way to perform each step with spiritual significance...',
      content: `This comprehensive guide covers all the essential steps of Hajj, helping you understand both the physical actions and spiritual significance of each ritual.

**DAY 1 - 8TH DHUL HIJJAH (YAWM AT-TARWIYAH):**

**Morning Preparation:**
- Enter state of Ihram before Fajr if not already
- Make intention (Niyyah) for Hajj: "Labbayk Allahumma Hajjan"
- Recite Talbiyah frequently throughout the day
- Perform Fajr prayer in Makkah

**Journey to Mina:**
- Travel to Mina after sunrise (not before)
- Stay in assigned camp/tent
- Perform Dhuhr, Asr, Maghrib, and Isha prayers in Mina
- Spend the night in Mina (Wajib - necessary)
- Rest well - prepare for the challenging day ahead

**Spiritual Focus:**
- Remember Prophet Ibrahim's (AS) willingness to sacrifice
- Make dua for forgiveness and guidance
- Reflect on the unity of Muslim Ummah

**DAY 2 - 9TH DHUL HIJJAH (YAWM ARAFAH):**

**Early Morning:**
- Perform Fajr prayer in Mina
- After sunrise, head to Arafat
- This is the most important day of Hajj

**At Arafat (9am - Sunset):**
- Must be present in Arafat boundary between Dhuhr and Maghrib
- Perform Dhuhr and Asr prayers combined and shortened
- The entire time should be spent in worship:
  - Reciting Quran
  - Making dua
  - Seeking forgiveness
  - Remembering Allah

**Recommended Duas at Arafat:**
- "La ilaha illa Allah wahdahu la sharika lah, lahul mulku wa lahul hamd, wa huwa ala kulli shay'in qadeer"
- Dua of Prophet Yunus (AS): "La ilaha illa anta subhanaka inni kuntu mina dhalimeen"
- Seek forgiveness for all sins

**After Sunset:**
- Head immediately to Muzdalifah (don't pray Maghrib in Arafat)
- Maintain dignity and avoid rushing

**DAY 2 NIGHT - AT MUZDALIFAH:**

**Evening Activities:**
- Arrive at Muzdalifah before midnight
- Perform Maghrib and Isha prayers combined
- Collect 70 pebbles for stoning (size of chickpeas)
- Rest under the open sky
- Make dua during this blessed night

**DAY 3 - 10TH DHUL HIJJAH (EID AL-ADHA):**

**Pre-Dawn:**
- Perform Fajr prayer at Muzdalifah
- Make dua until just before sunrise
- Head to Mina before sunrise

**At Mina - Four Main Activities:**
1. **Stone Jamrat Al-Aqaba (Big Pillar):**
   - Throw 7 pebbles at the big pillar only
   - Say "Allahu Akbar" with each throw
   - Can be done anytime from dawn to sunset

2. **Animal Sacrifice (Qurbani):**
   - Sacrifice animal (or arrange through agent)
   - Can be done after stoning until sunset of 12th Dhul Hijjah

3. **Shaving/Cutting Hair:**
   - Men: Complete shaving preferred, or cutting all hair
   - Women: Cut fingertip length from all hair
   - This releases you from most Ihram restrictions

4. **Tawaf Al-Ifadah:**
   - Return to Makkah for this obligatory Tawaf
   - Can be done anytime after hair cutting
   - Followed by Sa'i if you haven't done it during Umrah

**DAYS 4-5 (11TH-12TH DHUL HIJJAH) - DAYS OF TASHREEQ:**

**Daily Routine:**
- Stone all three pillars in order:
  1. Small pillar (7 stones)
  2. Medium pillar (7 stones)  
  3. Large pillar (7 stones)
- Must be done between Dhuhr and sunset
- Make dua after stoning first two pillars
- Spend nights in Mina

**Option to Leave:**
- Can leave after stoning on 12th Dhul Hijjah
- Or stay for 13th Dhul Hijjah (more reward)

**FINAL RITUALS:**

**Farewell Tawaf (Tawaf Al-Wada):**
- Must be done before leaving Makkah
- Seven rounds around Kaaba
- This should be your last act in Makkah
- Very emotional moment for most pilgrims

**SPIRITUAL LESSONS FROM HAJJ:**

**Unity:** All pilgrims wear same clothes, perform same rituals
**Equality:** Rich and poor are treated the same
**Sacrifice:** Remember Ibrahim's willingness to sacrifice
**Patience:** Dealing with crowds teaches patience
**Humility:** Standing before Allah in simple clothes
**Gratitude:** Appreciating Allah's countless blessings

**COMMON MISTAKES TO AVOID:**

1. Not staying overnight in Mina (8th night)
2. Leaving Arafat before sunset
3. Not reaching Muzdalifah before midnight
4. Rushing during stoning (take your time)
5. Not performing Farewell Tawaf
6. Getting angry or frustrated with crowds

**TIPS FOR SUCCESS:**

- Learn the rituals beforehand
- Stay hydrated and eat regularly
- Be patient with crowds
- Help fellow pilgrims when possible
- Focus on worship, not photography
- Make lots of dua for everyone
- Remember this is once-in-a-lifetime experience

**DUA FOR ACCEPTED HAJJ:**
"Allahumma taqabbal hajji wa magfir dhanbi wa ajib da'wati"
(O Allah, accept my Hajj, forgive my sins, and answer my prayers)

May Allah accept your Hajj and grant you Hajj Mabroor. May this blessed journey transform your life and bring you closer to Allah. Ameen.

Remember: The real test begins after Hajj - maintaining the spiritual level you achieved during these blessed days.`,
      author: 'Imam Hassan Al-Makki',
      date: '2024-01-20',
      category: 'guides',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80',
      likes: 428,
      comments: 89,
      views: 3142,
      avatar: '👨‍🧔'
    },
    {
      id: 5,
      title: 'Life After Umrah: Maintaining Your Spiritual Momentum',
      excerpt: 'How to preserve and build upon the spiritual high achieved during Umrah. Practical steps to maintain your connection with Allah...',
      content: `Returning from Umrah often brings a spiritual high that many pilgrims struggle to maintain. Here's how to preserve and build upon that blessed experience:

**THE POST-UMRAH CHALLENGE:**
Many pilgrims experience what scholars call "spiritual nostalgia" - a longing to return to the blessed state they experienced in Makkah and Madinah. This is natural and actually a sign that your Umrah was spiritually beneficial.

**IMMEDIATE STEPS (First 40 Days):**

**1. Maintain Regular Prayer Schedule:**
- Continue praying at the earliest possible times
- Make extra du'a after each prayer
- Try to pray some Sunnah prayers you might have skipped before
- Remember how you felt praying in the Haram

**2. Increase Quran Recitation:**
- Set a daily minimum (even if just one page)
- Try to understand meanings, not just recite
- Reflect on verses that touched you during Umrah
- Join a Quran study group

**3. Regular Dhikr (Remembrance of Allah):**
- Set specific times for dhikr each day
- Use the tasbih you brought from Makkah
- Teach family members dhikr you learned
- Remember how peaceful dhikr made you feel in Haram

**BUILDING NEW HABITS:**

**Weekly Spiritual Goals:**
- Fast one day per week (Mondays or Thursdays)
- Give charity regularly, even small amounts
- Visit local mosque for community prayers
- Share your Umrah experience with others

**Monthly Commitments:**
- Attend Islamic lectures or study circles
- Read Islamic books that inspire you
- Connect with other pilgrims from your group
- Plan acts of service for community

**DEALING WITH SPIRITUAL LOWS:**

**When Faith Feels Weak:**
- Remember specific moments from your Umrah
- Look at photos/videos from your journey
- Read duas you made at the Kaaba
- Connect with other pilgrims who understand

**Overcoming Daily Distractions:**
- Limit social media and entertainment
- Choose Islamic content when possible
- Surround yourself with righteous company
- Remember death and accountability regularly

**SHARING YOUR BLESSINGS:**

**With Family:**
- Teach children about Hajj and Umrah
- Share stories and lessons learned
- Bring Islamic practices into daily family life
- Plan family's future pilgrimage

**With Community:**
- Volunteer at local Islamic organizations
- Share practical tips with future pilgrims
- Participate in community service projects
- Become a positive influence on others

**LONG-TERM SPIRITUAL DEVELOPMENT:**

**Year 1 Goals:**
- Complete reading entire Quran with understanding
- Learn basic Arabic to better understand prayers
- Establish strong relationship with local mosque
- Plan return visit to Makkah if possible

**Ongoing Development:**
- Study Islamic history and biography of Prophet (PBUH)
- Learn more about Islamic jurisprudence (Fiqh)
- Develop expertise in area of Islamic knowledge
- Mentor new Muslims or young people

**PREPARING FOR RETURN:**
- Start saving for next Umrah/Hajj immediately
- Bring family members on future trips
- Improve physical fitness for next journey
- Learn more Arabic before returning

May Allah accept your Umrah and help you maintain the spiritual benefits throughout your life. Ameen.`,
      author: 'Dr. Amina Khalil',
      date: '2024-01-25',
      category: 'spiritual',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=600&q=80',
      likes: 267,
      comments: 52,
      views: 1876,
      avatar: '👩‍💼'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'experience', name: 'Experiences', count: 12 },
    { id: 'spiritual', name: 'Spiritual', count: 18 },
    { id: 'tips', name: 'Travel Tips', count: 14 },
    { id: 'guides', name: 'Guides', count: 8 }
  ];

  const handlePublishPost = () => {
    if (newPost.title && newPost.content) {
      console.log('Publishing post:', newPost);
      setNewPost({ title: '', content: '', category: 'experience' });
      setIsWriting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Community Stories & Wisdom
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Discover inspiring journeys, spiritual insights, and practical guidance from fellow pilgrims who have walked the sacred path
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Write Post Section */}
          <Card className="bg-gradient-to-r from-white to-emerald-50 backdrop-blur-sm border-2 border-emerald-200 shadow-2xl mb-12">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3 text-2xl">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Edit3 className="w-5 h-5 text-white" />
                  </div>
                  <span className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent font-bold">
                    Share Your Sacred Journey
                  </span>
                </CardTitle>
                <Button
                  onClick={() => setIsWriting(!isWriting)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-8 py-3 text-lg shadow-lg transform hover:scale-105 transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  {isWriting ? 'Cancel' : 'Write Story'}
                </Button>
              </div>
            </CardHeader>
            {isWriting && (
              <CardContent className="space-y-6 p-8">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter your post title..."
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-lg font-semibold"
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <select
                    className="p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  >
                    <option value="experience">Personal Experience</option>
                    <option value="spiritual">Spiritual Insights</option>
                    <option value="tips">Travel Tips</option>
                    <option value="guides">Guides</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <textarea
                    placeholder="Share your story, experiences, tips, or spiritual insights... You can paste content from anywhere!"
                    className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                    rows={8}
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setIsWriting(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePublishPost}
                    className="bg-gradient-islamic hover:opacity-90 text-white"
                    disabled={!newPost.title || !newPost.content}
                  >
                    Publish Post
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm border-2 border-blue-200 shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent font-bold">
                      Categories
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 cursor-pointer transition-all transform hover:scale-105 border border-blue-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800">{category.name}</span>
                        <span className="text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold">
                          {category.count}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3 space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-gradient-to-br from-white to-gray-50 backdrop-blur-sm border border-gray-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover rounded-l-2xl"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="space-y-6">
                        {/* Post Header */}
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-3">
                              <span className="text-3xl">{post.avatar}</span>
                              <span className="font-bold text-gray-800">{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              post.category === 'experience' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800' :
                              post.category === 'spiritual' ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800' :
                              post.category === 'tips' ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800' :
                              'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800'
                            }`}>
                              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent hover:from-emerald-600 hover:to-teal-600 cursor-pointer transition-all">
                            {post.title}
                          </h3>
                        </div>

                        {/* Post Content */}
                        <div className="prose prose-lg max-w-none">
                          {expandedPosts.includes(post.id) ? (
                            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                              {post.content}
                            </div>
                          ) : (
                            <p className="text-gray-700 leading-relaxed">
                              {post.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Post Stats */}
                        <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
                          <div className="flex items-center space-x-6 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <Eye className="w-5 h-5 text-blue-500" />
                              <span className="font-semibold">{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Heart className="w-5 h-5 text-red-500" />
                              <span className="font-semibold">{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MessageCircle className="w-5 h-5 text-green-500" />
                              <span className="font-semibold">{post.comments}</span>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <Button 
                              onClick={() => togglePostExpansion(post.id)}
                              className={`font-bold px-6 py-2 rounded-lg transition-all transform hover:scale-105 ${
                                expandedPosts.includes(post.id)
                                  ? 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white'
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white'
                              }`}
                            >
                              {expandedPosts.includes(post.id) ? (
                                <>
                                  <ChevronUp className="w-4 h-4 mr-2" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4 mr-2" />
                                  Read More
                                </>
                              )}
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-2 border-blue-400 text-blue-700 hover:bg-blue-50 font-bold px-4 py-2 rounded-lg transition-all transform hover:scale-105"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
