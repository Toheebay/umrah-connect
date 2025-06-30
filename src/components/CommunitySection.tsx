
import React, { useState } from 'react';
import { MessageCircle, Users, Globe, Heart, Star, Send, ThumbsUp, Share2, MoreHorizontal, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunitySection = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [newPost, setNewPost] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const communityStats = [
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'text-blue-600' },
    { label: 'Posts Today', value: '234', icon: MessageCircle, color: 'text-green-600' },
    { label: 'Countries', value: '45+', icon: Globe, color: 'text-purple-600' },
    { label: 'Success Stories', value: '1.2K', icon: Star, color: 'text-yellow-600' }
  ];

  const posts = [
    {
      id: 1,
      author: 'Fatima Al-Zahra',
      avatar: '👩‍🦱',
      country: '🇸🇦',
      timeAgo: '2 hours ago',
      content: 'SubhanAllah! Just completed my first Umrah journey. The experience was absolutely life-changing. Special thanks to Brother Ahmed for his guidance throughout the process. May Allah bless all who are planning their sacred journey! 🕋✨',
      likes: 47,
      comments: 12,
      shares: 8,
      tags: ['#Umrah', '#Blessed', '#FirstTime'],
      type: 'experience'
    },
    {
      id: 2,
      author: 'Mohammad Ibrahim',
      avatar: '👨‍🦲',
      country: '🇵🇰',
      timeAgo: '4 hours ago',
      content: 'Planning Hajj 2024 InshaAllah! Looking for recommendations for reliable agents in Karachi. Any suggestions from the community? JazakAllah khair in advance! 🤲',
      likes: 23,
      comments: 18,
      shares: 5,
      tags: ['#Hajj2024', '#Karachi', '#Recommendations'],
      type: 'question'
    },
    {
      id: 3,
      author: 'Aisha Rahman',
      avatar: '👩',
      country: '🇧🇩',
      timeAgo: '6 hours ago',
      content: 'Alhamdulillah! Our group package was amazing. The hotels were clean, food was delicious, and the transportation was comfortable. Highly recommend UmrahConnect agents! 🌟',
      likes: 65,
      comments: 22,
      shares: 15,
      tags: ['#Review', '#Recommended', '#GroupPackage'],
      type: 'review'
    },
    {
      id: 4,
      author: 'Omar Hassan',
      avatar: '👨‍🧔',
      country: '🇪🇬',
      timeAgo: '8 hours ago',
      content: 'Reminder: Don\'t forget to recite Talbiyah frequently during your journey. "Labbayk Allahumma labbayk..." May Allah accept all our prayers and grant us Hajj Mabroor! 🤲📿',
      likes: 89,
      comments: 31,
      shares: 42,
      tags: ['#Talbiyah', '#Reminder', '#Spirituality'],
      type: 'spiritual'
    }
  ];

  const filters = [
    { id: 'all', name: 'All Posts', count: 1234 },
    { id: 'experience', name: 'Experiences', count: 456 },
    { id: 'question', name: 'Questions', count: 234 },
    { id: 'review', name: 'Reviews', count: 123 },
    { id: 'spiritual', name: 'Spiritual', count: 321 }
  ];

  const filteredPosts = posts.filter(post => 
    (selectedFilter === 'all' || post.type === selectedFilter) &&
    (searchTerm === '' || post.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoinCommunity = () => {
    setIsJoined(true);
  };

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      console.log('New post:', newPost);
      setNewPost('');
    }
  };

  if (!isJoined) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Users className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Join Our Global
                <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                  Muslim Community
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Connect with fellow Muslims worldwide, share your experiences, get guidance, 
                and be part of a supportive community on your spiritual journey.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {communityStats.map((stat, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Button 
                onClick={handleJoinCommunity}
                className="bg-gradient-islamic hover:opacity-90 text-white px-12 py-6 text-xl font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-2xl"
              >
                <MessageCircle className="w-6 h-6 mr-3" />
                Join Community Now
              </Button>
              <p className="text-gray-500 text-sm">
                Free to join • Respectful community • Moderated content
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Community Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Muslim Community
              <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                Forum
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Share experiences, ask questions, and connect with fellow pilgrims
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Stats Card */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {communityStats.map((stat, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{stat.value}</div>
                        <div className="text-xs text-gray-600">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Filters */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Filter className="w-5 h-5" />
                    <span>Filter Posts</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        selectedFilter === filter.id
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{filter.name}</span>
                        <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{filter.count}</span>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search and Create Post */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search posts, users, topics..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    {/* Create Post */}
                    <div className="space-y-3">
                      <textarea
                        placeholder="Share your experience, ask a question, or start a discussion... السلام عليكم"
                        className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm resize-none"
                        rows={3}
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                      />
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Be respectful and follow community guidelines
                        </div>
                        <Button
                          onClick={handlePostSubmit}
                          className="bg-gradient-islamic hover:opacity-90 text-white px-6 py-2 rounded-lg"
                          disabled={!newPost.trim()}
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      {/* Post Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <span className="text-3xl">{post.avatar}</span>
                            <span className="absolute -bottom-1 -right-1 text-sm">{post.country}</span>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{post.author}</div>
                            <div className="text-sm text-gray-500">{post.timeAgo}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Post Content */}
                      <div className="mb-4">
                        <p className="text-gray-700 leading-relaxed mb-3">{post.content}</p>
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map((tag, index) => (
                            <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Post Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.shares}</span>
                          </button>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.type === 'experience' ? 'bg-blue-100 text-blue-700' :
                          post.type === 'question' ? 'bg-orange-100 text-orange-700' :
                          post.type === 'review' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {post.type.charAt(0).toUpperCase() + post.type.slice(1)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Load More */}
              <div className="text-center">
                <Button 
                  variant="outline" 
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl"
                >
                  Load More Posts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
