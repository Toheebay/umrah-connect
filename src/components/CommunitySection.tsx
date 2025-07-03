
import React, { useState, useEffect } from 'react';
import { MessageCircle, Users, Globe, Heart, Star, Send, ThumbsUp, Share2, MoreHorizontal, Filter, Search, UserPlus, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  user_id: string;
  profiles?: {
    username: string;
    email: string;
  };
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    username: string;
    email: string;
  };
}

const CommunitySection = () => {
  const [isJoined, setIsJoined] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'experience' });
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const communityStats = [
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'text-blue-600' },
    { label: 'Posts Today', value: posts.length.toString(), icon: MessageCircle, color: 'text-green-600' },
    { label: 'Countries', value: '45+', icon: Globe, color: 'text-purple-600' },
    { label: 'Success Stories', value: '1.2K', icon: Star, color: 'text-yellow-600' }
  ];

  const filters = [
    { id: 'all', name: 'All Posts', count: posts.length },
    { id: 'experience', name: 'Experiences', count: posts.filter(p => p.category === 'experience').length },
    { id: 'question', name: 'Questions', count: posts.filter(p => p.category === 'question').length },
    { id: 'review', name: 'Reviews', count: posts.filter(p => p.category === 'review').length },
    { id: 'spiritual', name: 'Spiritual', count: posts.filter(p => p.category === 'spiritual').length }
  ];

  useEffect(() => {
    checkUser();
    fetchPosts();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setIsJoined(true);
    }
  };

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('community_posts')
      .select(`
        *,
        profiles(username, email)
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
  };

  const fetchComments = async (postId: string) => {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        profiles(username, email)
      `)
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(prev => ({ ...prev, [postId]: data || [] }));
    }
  };

  const handlePublishPost = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to publish your journey.",
        variant: "destructive"
      });
      return;
    }

    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in both title and content.",
        variant: "destructive"
      });
      return;
    }

    const { error } = await supabase
      .from('community_posts')
      .insert({
        title: newPost.title,
        content: newPost.content,
        category: newPost.category,
        user_id: user.id
      });

    if (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to publish your post. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Post Published!",
        description: "Your sacred journey has been shared with the community.",
      });
      setNewPost({ title: '', content: '', category: 'experience' });
      setShowPostModal(false);
      fetchPosts();
    }
  };

  const handleAddComment = async (postId: string) => {
    if (!user || !newComment[postId]?.trim()) return;

    const { error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        content: newComment[postId],
        user_id: user.id
      });

    if (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment. Please try again.",
        variant: "destructive"
      });
    } else {
      setNewComment(prev => ({ ...prev, [postId]: '' }));
      fetchComments(postId);
      fetchPosts(); // Refresh to update comment count
    }
  };

  const toggleComments = (postId: string) => {
    setShowComments(prev => ({ ...prev, [postId]: !prev[postId] }));
    if (!comments[postId]) {
      fetchComments(postId);
    }
  };

  const filteredPosts = posts.filter(post => 
    (selectedFilter === 'all' || post.category === selectedFilter) &&
    (searchTerm === '' || 
     post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleJoinCommunity = () => {
    setShowJoinModal(true);
  };

  const confirmJoinCommunity = () => {
    setIsJoined(true);
    setShowJoinModal(false);
  };

  if (!isJoined) {
    return (
      <>
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50 relative">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1200&q=80" 
              alt="Community background"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse-glow">
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
                  <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
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
                  className="bg-gradient-islamic hover:opacity-90 text-white px-12 py-6 text-xl font-semibold rounded-2xl transition-all transform hover:scale-105 shadow-2xl animate-bounce-gentle"
                >
                  <UserPlus className="w-6 h-6 mr-3" />
                  Join Community Now
                </Button>
                <p className="text-gray-500 text-sm">
                  Free to join • Respectful community • Moderated content • 24/7 Support
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-3xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <MessageCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Live Chat</h4>
                    <p className="text-sm text-gray-600">Real-time discussions with pilgrims worldwide</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <Share2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Share Stories</h4>
                    <p className="text-sm text-gray-600">Post your experiences and inspire others</p>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                    <Heart className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Get Support</h4>
                    <p className="text-sm text-gray-600">Ask questions and receive helpful guidance</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {showJoinModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <Card className="bg-white max-w-md w-full shadow-2xl">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-islamic rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Welcome to Our Community!</CardTitle>
                <p className="text-gray-600 mt-2">
                  Join thousands of Muslims sharing their spiritual journey
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Share your Hajj & Umrah experiences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Get advice from experienced pilgrims</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Connect with Muslims worldwide</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <span>Access exclusive content and resources</span>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowJoinModal(false)}
                    className="flex-1"
                  >
                    Maybe Later
                  </Button>
                  <Button 
                    onClick={confirmJoinCommunity}
                    className="flex-1 bg-gradient-islamic hover:opacity-90 text-white"
                  >
                    Join Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-islamic rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                Share Your Sacred Journey
              </span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Muslim Community
              <span className="block bg-gradient-islamic bg-clip-text text-transparent">
                Forum & Stories
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Share experiences, ask questions, and connect with fellow pilgrims
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
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

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
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

            <div className="lg:col-span-3 space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search posts, topics..."
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white/80 backdrop-blur-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Share your spiritual journey with the community
                      </div>
                      <Button
                        onClick={() => setShowPostModal(true)}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Share Journey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-islamic rounded-full flex items-center justify-center text-white font-bold">
                            {post.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">{post.profiles?.username || 'Anonymous'}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(post.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          post.category === 'experience' ? 'bg-blue-100 text-blue-700' :
                          post.category === 'question' ? 'bg-orange-100 text-orange-700' :
                          post.category === 'review' ? 'bg-green-100 text-green-700' :
                          'bg-purple-100 text-purple-700'
                        }`}>
                          {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{post.title}</h3>
                        <p className="text-gray-700 leading-relaxed">{post.content}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center space-x-6">
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.likes_count}</span>
                          </button>
                          <button 
                            onClick={() => toggleComments(post.id)}
                            className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">{post.comments_count}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {showComments[post.id] && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="space-y-3 mb-4">
                            {comments[post.id]?.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center space-x-2 mb-1">
                                  <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {comment.profiles?.username?.charAt(0).toUpperCase() || 'U'}
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">
                                    {comment.profiles?.username || 'Anonymous'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700 ml-8">{comment.content}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              placeholder="Add a comment..."
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                              value={newComment[post.id] || ''}
                              onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                            />
                            <Button
                              onClick={() => handleAddComment(post.id)}
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-12 text-center">
                    <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No posts found</h3>
                    <p className="text-gray-600 mb-6">Be the first to share your sacred journey!</p>
                    <Button
                      onClick={() => setShowPostModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Share Your Story
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>

      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="bg-white max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Share Your Sacred Journey</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPostModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="experience">Experience</option>
                  <option value="question">Question</option>
                  <option value="review">Review</option>
                  <option value="spiritual">Spiritual</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Give your story a meaningful title..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share Your Story
                </label>
                <textarea
                  placeholder="Share your Hajj or Umrah experience, spiritual insights, or ask for guidance... السلام عليكم"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
                  rows={6}
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                />
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Your post will be permanently saved and visible to the community
                </div>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowPostModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePublishPost}
                    className="bg-red-600 hover:bg-red-700 text-white px-6"
                    disabled={!newPost.title.trim() || !newPost.content.trim()}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Publish
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default CommunitySection;
