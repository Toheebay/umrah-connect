
import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, Flag, Star, TrendingUp, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CommunityForum = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');

  const forumStats = [
    { label: 'Active Topics', value: '1.2K', icon: MessageCircle, color: 'text-blue-600' },
    { label: 'Members Online', value: '234', icon: Users, color: 'text-green-600' },
    { label: 'Posts Today', value: '89', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Avg Response', value: '< 1hr', icon: Clock, color: 'text-orange-600' }
  ];

  const topics = [
    {
      id: 1,
      title: 'First time Hajj - Need advice on preparation',
      author: 'Ahmad_Believer',
      avatar: '👨‍🦲',
      country: '🇲🇾',
      category: 'Hajj Guidance',
      replies: 23,
      views: 145,
      lastReply: '2 hours ago',
      isPinned: true,
      hasAnswered: true,
      preview: 'Assalamu alaikum brothers and sisters. I have been blessed with the opportunity to perform Hajj this year...'
    },
    {
      id: 2,
      title: 'Best Umrah packages from UK - Recommendations needed',
      author: 'Fatima_UK',
      avatar: '👩‍🦱',
      country: '🇬🇧',
      category: 'Travel Plans',
      replies: 45,
      views: 289,
      lastReply: '1 hour ago',
      isPinned: false,
      hasAnswered: false,
      preview: 'Looking for reliable agents in London for Umrah packages. Budget around £1500 per person...'
    },
    {
      id: 3,
      title: 'Dua during Tawaf - Sharing beautiful supplications',
      author: 'Imam_Abdallah',
      avatar: '👨‍🧔',
      country: '🇸🇦',
      category: 'Spiritual',
      replies: 67,
      views: 412,
      lastReply: '30 minutes ago',
      isPinned: true,
      hasAnswered: true,
      preview: 'Bismillah. Here are some authentic duas that I recommend during Tawaf around the Holy Kaaba...'
    },
    {
      id: 4,
      title: 'Accommodation near Haram - Price comparison 2024',
      author: 'TravelWise_Muslim',
      avatar: '👨',
      country: '🇺🇸',
      category: 'Accommodation',
      replies: 34,
      views: 198,
      lastReply: '3 hours ago',
      isPinned: false,
      hasAnswered: true,
      preview: 'Compiled a list of hotels near Masjid al-Haram with current prices and reviews...'
    },
    {
      id: 5,
      title: 'Medical preparations for elderly pilgrims',
      author: 'Dr_Muslimah',
      avatar: '👩',
      country: '🇪🇬',
      category: 'Health & Safety',
      replies: 28,
      views: 167,
      lastReply: '4 hours ago',
      isPinned: false,
      hasAnswered: true,
      preview: 'Important medical considerations for elderly family members planning Hajj or Umrah...'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', count: 156 },
    { id: 'hajj', name: 'Hajj Guidance', count: 45 },
    { id: 'umrah', name: 'Umrah Tips', count: 38 },
    { id: 'travel', name: 'Travel Plans', count: 29 },
    { id: 'spiritual', name: 'Spiritual', count: 25 },
    { id: 'accommodation', name: 'Accommodation', count: 19 }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      'Hajj Guidance': 'bg-emerald-100 text-emerald-800',
      'Travel Plans': 'bg-blue-100 text-blue-800',
      'Spiritual': 'bg-purple-100 text-purple-800',
      'Accommodation': 'bg-orange-100 text-orange-800',
      'Health & Safety': 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Forum Stats */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        {forumStats.map((stat, index) => (
          <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className={`w-8 h-8 mx-auto mb-2 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedTopic(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedTopic === category.id
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
            </CardContent>
          </Card>

          {/* New Topic Button */}
          <Button className="w-full mt-4 bg-gradient-islamic hover:opacity-90 text-white">
            + Start New Topic
          </Button>
        </div>

        {/* Topics List */}
        <div className="lg:col-span-3 space-y-4">
          {topics.map((topic) => (
            <Card key={topic.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <span className="text-3xl">{topic.avatar}</span>
                      <span className="absolute -bottom-1 -right-1 text-sm">{topic.country}</span>
                    </div>
                  </div>

                  {/* Topic Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          {topic.isPinned && (
                            <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                              <Star className="w-2 h-2 text-white fill-current" />
                            </div>
                          )}
                          <h3 className="font-semibold text-gray-900 hover:text-emerald-600 cursor-pointer">
                            {topic.title}
                          </h3>
                          {topic.hasAnswered && (
                            <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              ✓ Answered
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                          <span>by <strong>{topic.author}</strong></span>
                          <span>•</span>
                          <span>{topic.lastReply}</span>
                        </div>
                        <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(topic.category)}`}>
                          {topic.category}
                        </div>
                      </div>
                    </div>

                    {/* Topic Preview */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{topic.preview}</p>

                    {/* Topic Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{topic.replies} replies</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>👁️</span>
                          <span>{topic.views} views</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-blue-500">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-gray-500 hover:text-gray-700">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Load More */}
          <div className="text-center pt-6">
            <Button variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              Load More Topics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
