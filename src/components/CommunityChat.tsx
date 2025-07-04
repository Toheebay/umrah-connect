import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Heart, Share2, MessageCircle, Clock, MapPin, Wifi, WifiOff, Globe, User, UserPlus, Bell, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ChatNavigator from './ChatNavigator';

interface Message {
  id: string;
  user: string;
  avatar: string;
  country: string;
  location: string;
  message: string;
  time: string;
  likes: number;
  replies: number;
  isOnline: boolean;
  user_id?: string;
  created_at?: string;
  isAnonymous?: boolean;
  isJoinNotification?: boolean;
}

interface OnlineUser {
  name: string;
  avatar: string;
  country: string;
  location: string;
  isOnline: boolean;
  user_id?: string;
  last_seen?: string;
  isAnonymous?: boolean;
}

const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [anonymousUser, setAnonymousUser] = useState<{name: string, avatar: string, country: string, location: string} | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollUp = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollBy({ top: -200, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollBy({ top: 200, behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create join notification when new user enters
  const createJoinNotification = (user: OnlineUser) => {
    const joinMessage: Message = {
      id: `join-${Date.now()}`,
      user: 'System',
      avatar: '🎉',
      country: '🌍',
      location: 'Global',
      message: `${user.name} joined the chat from ${user.location}`,
      time: 'Just now',
      likes: 0,
      replies: 0,
      isOnline: true,
      isJoinNotification: true
    };
    setMessages(prev => [...prev, joinMessage]);
  };

  // Get current user or create anonymous user
  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      
      // If no authenticated user, create anonymous user profile
      if (!user) {
        const savedAnonymousUser = localStorage.getItem('anonymousUser');
        const guestLocation = localStorage.getItem('guestLocation');
        
        if (savedAnonymousUser) {
          const parsedUser = JSON.parse(savedAnonymousUser);
          // Update location if we have a newer one
          if (guestLocation && guestLocation !== parsedUser.location) {
            parsedUser.location = guestLocation;
            localStorage.setItem('anonymousUser', JSON.stringify(parsedUser));
          }
          setAnonymousUser(parsedUser);
          
          // Create join notification for returning guest
          createJoinNotification({
            name: parsedUser.name,
            avatar: parsedUser.avatar,
            country: parsedUser.country,
            location: parsedUser.location,
            isOnline: true,
            isAnonymous: true
          });
        } else {
          const anonymousProfile = {
            name: `Guest${Math.floor(Math.random() * 10000)}`,
            avatar: getRandomAvatar(),
            country: getRandomCountryFlag(),
            location: guestLocation || getRandomLocation()
          };
          setAnonymousUser(anonymousProfile);
          localStorage.setItem('anonymousUser', JSON.stringify(anonymousProfile));
          
          // Create join notification for new guest
          createJoinNotification({
            name: anonymousProfile.name,
            avatar: anonymousProfile.avatar,
            country: anonymousProfile.country,
            location: anonymousProfile.location,
            isOnline: true,
            isAnonymous: true
          });
        }
      }
    };
    
    getCurrentUser();
  }, []);

  // Enhanced location detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // First check if we have a guest location stored
        const guestLocation = localStorage.getItem('guestLocation');
        if (guestLocation) {
          setUserLocation(guestLocation);
          return;
        }

        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                const { latitude, longitude } = position.coords;
                const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`);
                const data = await response.json();
                const location = `${data.city || data.locality || 'Unknown City'}, ${data.countryName || 'Unknown Country'}`;
                setUserLocation(location);
                // Store for future reference
                localStorage.setItem('guestLocation', location);
              } catch (error) {
                console.log('Location API failed, using fallback');
                const locations = [
                  'Lagos, Nigeria', 'London, UK', 'New York, USA', 'Dubai, UAE',
                  'Istanbul, Turkey', 'Cairo, Egypt', 'Riyadh, Saudi Arabia',
                  'Karachi, Pakistan', 'Dhaka, Bangladesh', 'Jakarta, Indonesia'
                ];
                const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                setUserLocation(randomLocation);
                localStorage.setItem('guestLocation', randomLocation);
              }
            },
            (error) => {
              console.log('Geolocation failed, using fallback');
              const locations = [
                'Lagos, Nigeria', 'London, UK', 'New York, USA', 'Dubai, UAE',
                'Istanbul, Turkey', 'Cairo, Egypt', 'Riyadh, Saudi Arabia'
              ];
              const randomLocation = locations[Math.floor(Math.random() * locations.length)];
              setUserLocation(randomLocation);
              localStorage.setItem('guestLocation', randomLocation);
            }
          );
        } else {
          setUserLocation('Location not available');
        }
      } catch (error) {
        setUserLocation('Location not available');
      }
    };

    detectLocation();
  }, []);

  // Load initial messages from localStorage and Supabase with persistent history
  useEffect(() => {
    const loadMessages = async () => {
      try {
        // Load from localStorage first (for persistent history)
        const savedMessages = localStorage.getItem('chatHistory');
        if (savedMessages) {
          const parsedMessages = JSON.parse(savedMessages);
          setMessages(parsedMessages);
        }

        // Then load from Supabase for authenticated messages
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('room_id', 'global-chat')
          .order('created_at', { ascending: true })
          .limit(100); // Increased limit for better history

        if (error) {
          console.error('Error loading messages:', error);
          if (!savedMessages) {
            loadSampleMessages();
          }
        } else if (data && data.length > 0) {
          const formattedMessages = data.map(msg => ({
            id: msg.id,
            user: msg.user_id ? `User ${msg.user_id?.slice(0, 8)}` : 'Anonymous',
            avatar: getRandomAvatar(),
            country: getRandomCountryFlag(),
            location: getRandomLocation(),
            message: msg.message,
            time: formatTime(msg.created_at),
            likes: 0,
            replies: 0,
            isOnline: true,
            user_id: msg.user_id,
            created_at: msg.created_at,
            isAnonymous: !msg.user_id
          }));
          
          // Merge with existing messages
          setMessages(prev => {
            const merged = [...prev, ...formattedMessages];
            // Remove duplicates based on ID
            const unique = merged.filter((msg, index, arr) => 
              arr.findIndex(m => m.id === msg.id) === index
            );
            return unique;
          });
        } else if (!savedMessages) {
          loadSampleMessages();
        }
      } catch (error) {
        console.error('Error:', error);
        if (!localStorage.getItem('chatHistory')) {
          loadSampleMessages();
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Real-time subscription for new messages
  useEffect(() => {
    const channel = supabase
      .channel('global-chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: 'room_id=eq.global-chat'
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMsg = payload.new as any;
          const formattedMessage: Message = {
            id: newMsg.id,
            user: newMsg.user_id === currentUser?.id ? 'You' : 
                  newMsg.user_id ? `User ${newMsg.user_id?.slice(0, 8)}` : 'Anonymous',
            avatar: getRandomAvatar(),
            country: getRandomCountryFlag(),
            location: getRandomLocation(),
            message: newMsg.message,
            time: 'Just now',
            likes: 0,
            replies: 0,
            isOnline: true,
            user_id: newMsg.user_id,
            created_at: newMsg.created_at,
            isAnonymous: !newMsg.user_id
          };
          
          setMessages(prev => {
            const updated = [...prev, formattedMessage];
            // Save to localStorage for persistence
            localStorage.setItem('chatHistory', JSON.stringify(updated));
            return updated;
          });
          
          if (newMsg.user_id !== currentUser?.id) {
            toast({
              title: "New message",
              description: `${formattedMessage.user}: ${newMsg.message.slice(0, 50)}...`,
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser, toast]);

  // Initialize global chat room
  useEffect(() => {
    const initializeChatRoom = async () => {
      try {
        const { data: existingRoom } = await supabase
          .from('chat_rooms')
          .select('*')
          .eq('id', 'global-chat')
          .single();

        if (!existingRoom) {
          const { error } = await supabase
            .from('chat_rooms')
            .insert({
              id: 'global-chat',
              name: 'Global Community Chat',
              description: 'Connect with Muslims worldwide',
              room_type: 'public',
              is_active: true,
              created_by: currentUser?.id || null
            });

          if (error && error.code !== '23505') { // Ignore duplicate key error
            console.error('Error creating chat room:', error);
          }
        }
      } catch (error) {
        console.error('Error initializing chat room:', error);
      }
    };

    initializeChatRoom();
  }, [currentUser]);

  const loadSampleMessages = () => {
    const sampleMessages: Message[] = [
      {
        id: '1',
        user: 'Ahmed Al-Rashid',
        avatar: '👨‍💼',
        country: '🇸🇦',
        location: 'Riyadh, Saudi Arabia',
        message: 'Assalamu alaikum everyone! Just completed my Hajj journey. What an incredible experience!',
        time: '2 minutes ago',
        likes: 12,
        replies: 3,
        isOnline: true
      },
      {
        id: '2',
        user: 'Guest4562',
        avatar: '👩‍💼',
        country: '🇪🇬',
        location: 'Cairo, Egypt',
        message: 'MashAllah! Could you share some tips for first-time pilgrims?',
        time: '5 minutes ago',
        likes: 8,
        replies: 1,
        isOnline: true,
        isAnonymous: true
      },
      {
        id: '3',
        user: 'Guest7891',
        avatar: '👨‍🦲',
        country: '🇦🇪',
        location: 'Dubai, UAE',
        message: 'For those planning Umrah, I recommend booking early for better prices.',
        time: '10 minutes ago',
        likes: 15,
        replies: 5,
        isOnline: false,
        isAnonymous: true
      }
    ];
    setMessages(sampleMessages);
    localStorage.setItem('chatHistory', JSON.stringify(sampleMessages));
    
    setOnlineUsers([
      { name: 'Ahmed Al-Rashid', avatar: '👨‍💼', country: '🇸🇦', location: 'Riyadh, Saudi Arabia', isOnline: true },
      { name: 'Guest4562', avatar: '👩‍💼', country: '🇪🇬', location: 'Cairo, Egypt', isOnline: true, isAnonymous: true },
      { name: 'Guest7891', avatar: '👨‍🦲', country: '🇦🇪', location: 'Dubai, UAE', isOnline: false, isAnonymous: true },
      { name: 'Guest2345', avatar: '👩‍🦱', country: '🇵🇰', location: 'Karachi, Pakistan', isOnline: true, isAnonymous: true },
      { name: 'Guest9876', avatar: '👨‍🧔', country: '🇧🇩', location: 'Dhaka, Bangladesh', isOnline: true, isAnonymous: true }
    ]);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    
    const effectiveUser = currentUser || anonymousUser;
    if (!effectiveUser) return;

    try {
      // For anonymous users, add message directly to state without database
      if (!currentUser && anonymousUser) {
        const anonymousMessage: Message = {
          id: `anon-${Date.now()}`,
          user: anonymousUser.name,
          avatar: anonymousUser.avatar,
          country: anonymousUser.country,
          location: anonymousUser.location,
          message: newMessage,
          time: 'Just now',
          likes: 0,
          replies: 0,
          isOnline: true,
          isAnonymous: true
        };
        
        setMessages(prev => {
          const updated = [...prev, anonymousMessage];
          // Save to localStorage for persistence
          localStorage.setItem('chatHistory', JSON.stringify(updated));
          return updated;
        });
        setNewMessage('');
        
        toast({
          title: "Message sent",
          description: `Shared from ${anonymousUser.location}`,
        });
        return;
      }

      // For authenticated users, save to database
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          message: newMessage,
          user_id: currentUser.id,
          room_id: 'global-chat',
          message_type: 'text'
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive"
        });
        return;
      }

      setNewMessage('');
      toast({
        title: "Message sent",
        description: `Shared from ${userLocation}`,
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLike = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  // Helper functions
  const getRandomAvatar = () => {
    const avatars = ['👨‍💼', '👩‍💼', '👨‍🦲', '👩‍🦱', '👨‍🧔', '👩‍🎓', '👨‍💻', '👩‍⚕️'];
    return avatars[Math.floor(Math.random() * avatars.length)];
  };

  const getRandomCountryFlag = () => {
    const flags = ['🇸🇦', '🇪🇬', '🇦🇪', '🇵🇰', '🇧🇩', '🇲🇦', '🇮🇩', '🇳🇬', '🇹🇷', '🇮🇳'];
    return flags[Math.floor(Math.random() * flags.length)];
  };

  const getRandomLocation = () => {
    const locations = [
      'Riyadh, Saudi Arabia', 'Cairo, Egypt', 'Dubai, UAE', 'Karachi, Pakistan',
      'Dhaka, Bangladesh', 'Casablanca, Morocco', 'Jakarta, Indonesia', 
      'Lagos, Nigeria', 'Istanbul, Turkey', 'Mumbai, India'
    ];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const formatTime = (timestamp: string | null) => {
    if (!timestamp) return 'Just now';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / 1440)} days ago`;
  };

  const onlineCount = onlineUsers.filter(user => user.isOnline).length;
  const currentUserInfo = currentUser || anonymousUser;

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg font-medium">Connecting to global chat...</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6 relative">
      {/* Main Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-blue-200 shadow-2xl">
          <CardHeader className="border-b-2 border-blue-200 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">Global Community Chat</span>
              <div className="flex items-center space-x-2 text-white/90">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="font-semibold">{onlineCount + 100} online worldwide</span>
              </div>
              {userLocation && (
                <div className="flex items-center space-x-1 text-white/80">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{userLocation}</span>
                </div>
              )}
            </CardTitle>
            {currentUserInfo && (
              <div className="flex items-center space-x-3 text-white/90 pt-2">
                <span className="text-2xl">{currentUserInfo.avatar || '👤'}</span>
                <span className="font-medium">Chatting as: {currentUserInfo.name || currentUserInfo.username}</span>
                {!currentUser && (
                  <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-bold">Guest</span>
                )}
                {currentUserInfo.location && (
                  <span className="text-sm text-yellow-300 font-medium">from {currentUserInfo.location}</span>
                )}
              </div>
            )}
          </CardHeader>

          {/* Messages */}
          <CardContent 
            ref={messagesContainerRef}
            className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50"
          >
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex space-x-4 ${message.isJoinNotification ? 'justify-center' : ''}`}>
                  {message.isJoinNotification ? (
                    <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2">
                      <UserPlus className="w-5 h-5" />
                      <span className="font-medium">{message.message}</span>
                      <Bell className="w-4 h-4 animate-pulse" />
                    </div>
                  ) : (
                    <>
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl shadow-lg">
                          {message.avatar}
                        </div>
                        <div className="absolute -bottom-1 -right-1">
                          {message.isOnline ? (
                            <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md">
                              <Wifi className="w-3 h-3 text-white absolute top-0 left-0" />
                            </div>
                          ) : (
                            <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white">
                              <WifiOff className="w-3 h-3 text-white absolute top-0 left-0" />
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1 bg-white rounded-3xl p-5 shadow-lg border-2 border-blue-100 hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center space-x-3 mb-3">
                          <span className="font-bold text-gray-900 text-lg">{message.user}</span>
                          {message.isAnonymous && (
                            <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold">Guest</span>
                          )}
                          <span className="text-2xl">{message.country}</span>
                          <div className="flex items-center space-x-1 text-sm text-gray-600">
                            <MapPin className="w-4 h-4 text-blue-500" />
                            <span className="font-medium">{message.location}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{message.time}</span>
                          </div>
                          {message.isOnline ? (
                            <span className="text-sm text-green-600 font-bold flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span>Online</span>
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400 flex items-center space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                              <span>Offline</span>
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-800 leading-relaxed mb-4 text-lg">{message.message}</p>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <button 
                            onClick={() => handleLike(message.id)}
                            className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full"
                          >
                            <Heart className="w-5 h-5" />
                            <span className="font-medium">{message.likes}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-full">
                            <MessageCircle className="w-5 h-5" />
                            <span className="font-medium">{message.replies}</span>
                          </button>
                          <button className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full">
                            <Share2 className="w-5 h-5" />
                            <span className="font-medium">Share</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-6 border-t-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex space-x-4">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your thoughts with the global community..."
                className="flex-1 border-2 border-blue-300 focus:border-purple-500 rounded-2xl px-6 py-4 text-lg bg-white shadow-lg"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-3 flex items-center space-x-4 font-medium">
              <span className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-500" />
                <span>Connect with Muslims worldwide instantly - no registration required!</span>
              </span>
              {userLocation && (
                <span className="flex items-center space-x-2">
                  <span>•</span>
                  <MapPin className="w-4 h-4 text-purple-500" />
                  <span>Chatting from {userLocation}</span>
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 border-2 border-blue-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardTitle className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span>Global Members ({onlineUsers.length + 100})</span>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {onlineUsers.map((user, index) => (
                <div key={index} className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                  user.isOnline ? 'hover:bg-green-50 bg-white shadow-md border-2 border-green-200' : 'hover:bg-gray-50 bg-gray-100 border-2 border-gray-200'
                }`}>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl shadow-lg">
                      {user.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {user.isOnline ? (
                        <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-gray-900 flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.isAnonymous && (
                        <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white px-2 py-1 rounded-full font-bold">Guest</span>
                      )}
                      {user.isOnline ? (
                        <span className="text-sm text-green-600 font-bold">●</span>
                      ) : (
                        <span className="text-sm text-gray-400">●</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="text-lg">{user.country}</span>
                      <MapPin className="w-3 h-3 text-blue-500" />
                      <span className="font-medium">{user.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200">
              <h4 className="font-bold text-green-800 mb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Community Guidelines</span>
              </h4>
              <ul className="text-sm text-green-700 space-y-2 font-medium">
                <li>• Be respectful and kind</li>
                <li>• Share authentic experiences</li>
                <li>• Help fellow pilgrims</li>
                <li>• Keep discussions Islamic</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-blue-200">
              <h4 className="font-bold text-blue-800 mb-3 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                <span>Global Reach</span>
              </h4>
              <p className="text-sm text-blue-700 font-medium leading-relaxed">
                Your location is shared to show the global nature of our community. Connect with Muslims from around the world!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chat Navigator */}
      <ChatNavigator
        onScrollToTop={scrollToTop}
        onScrollToBottom={scrollToBottom}
        onScrollUp={scrollUp}
        onScrollDown={scrollDown}
      />
    </div>
  );
};

export default CommunityChat;
