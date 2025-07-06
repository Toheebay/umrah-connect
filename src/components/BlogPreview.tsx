
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, User, Eye, Heart, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BlogPreview = () => {
  const featuredPosts = [
    {
      id: 1,
      title: 'My First Umrah Experience: A Journey of the Heart',
      excerpt: 'SubhanAllah! Words cannot express the overwhelming emotions I felt when I first laid eyes on the Holy Kaaba. The journey to Makkah was not just a physical one, but a spiritual awakening...',
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
      excerpt: 'A comprehensive collection of important prayers and supplications for your sacred journey, with Arabic text, transliteration, and deep meanings...',
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
      excerpt: 'Comprehensive practical advice and tips to make your Hajj or Umrah journey smooth, safe, and memorable. From packing to performing rituals...',
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

  return (
    <section className="py-12 bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 bg-clip-text text-transparent">
              Latest Stories & Insights
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Read inspiring journeys and spiritual guidance from fellow pilgrims
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border-0">
              <div className="relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    post.category === 'experience' ? 'bg-green-500 text-white' :
                    post.category === 'spiritual' ? 'bg-purple-500 text-white' :
                    'bg-orange-500 text-white'
                  }`}>
                    {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                  </span>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <span className="text-lg">{post.avatar}</span>
                  <span className="font-medium">{post.author}</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <CardTitle className="text-lg font-bold text-gray-800 line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blog">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-8 py-3 text-lg font-bold shadow-lg">
              View All Posts
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
