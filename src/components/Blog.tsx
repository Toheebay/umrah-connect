
import React, { useState } from 'react';
import { Edit3, Calendar, User, Eye, Heart, MessageCircle, Share2, BookOpen, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Blog = () => {
  const [isWriting, setIsWriting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'experience' });

  const blogPosts = [
    {
      id: 1,
      title: 'My First Umrah Experience: A Journey of the Heart',
      excerpt: 'SubhanAllah! Words cannot express the overwhelming emotions I felt when I first laid eyes on the Holy Kaaba...',
      content: `SubhanAllah! Words cannot express the overwhelming emotions I felt when I first laid eyes on the Holy Kaaba. The journey to Makkah was not just a physical one, but a spiritual awakening that changed my life forever.

The preparation began months before my departure. I spent countless hours reading about the rituals, learning the duas, and preparing my heart for this sacred journey. Nothing, however, could have prepared me for the actual experience.

As our plane descended into Jeddah, I could feel my heart racing with anticipation. The moment we stepped off the plane, there was something different in the air - a sense of sanctity that I had never experienced before.

The first sight of the Haram was breathtaking. Millions of people from every corner of the world, all united in their faith, all there for the same purpose. It was a beautiful reminder of the unity of our Ummah.

Performing Tawaf for the first time was an indescribable experience. Moving with the crowd, reciting the same prayers that millions before us have recited, feeling connected to every Muslim who has ever made this journey - it was pure magic.

I encourage everyone who has the means to undertake this blessed journey. May Allah accept all our prayers and grant us all the opportunity to visit His House. Ameen.`,
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
      title: 'Essential Duas for Hajj and Umrah',
      excerpt: 'A comprehensive collection of important prayers and supplications for your sacred journey...',
      content: `Here is a collection of essential duas that every pilgrim should know for their Hajj or Umrah journey:

**Talbiyah:**
لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لاَ شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ لاَ شَرِيكَ لَكَ

"Labbayk Allahumma labbayk, labbayka la shareeka laka labbayk, innal hamda wan-ni'mata laka wal-mulk, la shareeka lak"

**Dua when seeing the Kaaba:**
اللَّهُمَّ زِدْ هَذَا الْبَيْتَ تَشْرِيفًا وَتَعْظِيمًا وَتَكْرِيمًا وَمَهَابَةً، وَزِدْ مَنْ شَرَّفَهُ وَكَرَّمَهُ مِمَّنْ حَجَّهُ أَوِ اعْتَمَرَهُ تَشْرِيفًا وَتَكْرِيمًا وَتَعْظِيمًا وَبِرًّا

**Between Rukn Yamani and Hajar Aswad:**
رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ

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
      title: 'Travel Tips for First-Time Pilgrims',
      excerpt: 'Practical advice and tips to make your Hajj or Umrah journey smooth and memorable...',
      content: `Planning your first Hajj or Umrah can be overwhelming. Here are some practical tips to help you prepare:

**Before You Travel:**
1. Get your vaccinations done well in advance
2. Pack comfortable walking shoes - you'll be doing a lot of walking
3. Bring a good quality prayer mat
4. Pack modest, comfortable clothing
5. Learn basic Arabic phrases

**What to Pack:**
- Comfortable shoes (very important!)
- Dates and zamzam water bottles
- Prayer beads (tasbih)
- Small prayer rug
- Modest clothing in light colors
- Personal medications
- Power bank for your phone

**During Your Journey:**
- Stay hydrated - drink lots of water
- Be patient with crowds
- Keep your important documents safe
- Take care of elderly family members
- Make lots of dua

**Health Tips:**
- Wash hands frequently
- Avoid raw foods
- Stay in air-conditioned areas when possible
- Rest when needed

Remember, this is a spiritual journey. Be patient, be kind to fellow pilgrims, and focus on your relationship with Allah.

May Allah make your journey easy and accept all your prayers. Ameen.`,
      author: 'Dr. Aisha Mohammed',
      date: '2024-01-05',
      category: 'tips',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&q=80',
      likes: 312,
      comments: 76,
      views: 2156,
      avatar: '👩'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'experience', name: 'Experiences', count: 8 },
    { id: 'spiritual', name: 'Spiritual', count: 12 },
    { id: 'tips', name: 'Travel Tips', count: 6 },
    { id: 'guides', name: 'Guides', count: 4 }
  ];

  const handlePublishPost = () => {
    if (newPost.title && newPost.content) {
      console.log('Publishing post:', newPost);
      setNewPost({ title: '', content: '', category: 'experience' });
      setIsWriting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Community
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              Blog & Stories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your experiences, tips, and spiritual insights with the global Muslim community
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Write Post Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mb-12">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5 text-emerald-600" />
                  <span>Share Your Story</span>
                </CardTitle>
                <Button
                  onClick={() => setIsWriting(!isWriting)}
                  className="bg-gradient-islamic hover:opacity-90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isWriting ? 'Cancel' : 'Write Post'}
                </Button>
              </div>
            </CardHeader>
            {isWriting && (
              <CardContent className="space-y-4">
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
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-emerald-600" />
                    <span>Categories</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="p-3 rounded-lg hover:bg-emerald-50 cursor-pointer transition-all"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-700">{category.name}</span>
                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">{category.count}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3 space-y-8">
              {blogPosts.map((post) => (
                <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
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
                        <div className="space-y-3">
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl">{post.avatar}</span>
                              <span className="font-medium">{post.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">
                              {post.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 hover:text-emerald-600 cursor-pointer transition-colors">
                            {post.title}
                          </h3>
                        </div>

                        {/* Post Content */}
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>

                        {/* Post Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                              Read More
                            </Button>
                            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
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
