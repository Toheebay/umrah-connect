
import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Heart, Share2, MessageCircle, Clock, MapPin, Wifi, WifiOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const CommunityChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Ahmed Al-Rashid',
      avatar: '👨‍💼',
      country: '🇸🇦',
      location: 'Riyadh, Saudi Arabia',
      message: 'Assalamu alaikum everyone! Just completed my Hajj journey. What an incredible experience! The organization was perfect.',
      time: '2 minutes ago',
      likes: 12,
      replies: 3,
      isOnline: true
    },
    {
      id: 2,
      user: 'Fatima Hassan',
      avatar: '👩‍💼',
      country: '🇪🇬',
      location: 'Cairo, Egypt',
      message: 'MashAllah brother Ahmed! Could you share which agent you used? I\'m planning for next year InshaAllah.',
      time: '5 minutes ago',
      likes: 8,
      replies: 1,
      isOnline: true
    },
    {
      id: 3,
      user: 'Omar Bin Said',
      avatar: '👨‍🦲',
      country: '🇦🇪',
      location: 'Dubai, UAE',
      message: 'For those planning Umrah, I highly recommend booking early. The prices are much better and you get better accommodation options.',
      time: '10 minutes ago',
      likes: 15,
      replies: 5,
      isOnline: false
    },
    {
      id: 4,
      user: 'Aisha Malik',
      avatar: '👩‍🦱',
      country: '🇵🇰',
      location: 'Karachi, Pakistan',
      message: 'SubhanAllah! I\'m so excited for my first Umrah next month. Any tips for first-time pilgrims?',
      time: '15 minutes ago',
      likes: 6,
      replies: 8,
      isOnline: true
    },
    {
      id: 5,
      user: 'Ibrahim Khan',
      avatar: '👨‍🧔',
      country: '🇧🇩',
      location: 'Dhaka, Bangladesh',
      message: 'Remember to make lots of dua for the Ummah when you\'re there. May Allah accept all our pilgrimages. Ameen!',
      time: '20 minutes ago',
      likes: 25,
      replies: 12,
      isOnline: true
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [onlineUsers] = useState([
    { name: 'Ahmed Al-Rashid', avatar: '👨‍💼', country: '🇸🇦', location: 'Riyadh, Saudi Arabia', isOnline: true },
    { name: 'Fatima Hassan', avatar: '👩‍💼', country: '🇪🇬', location: 'Cairo, Egypt', isOnline: true },
    { name: 'Aisha Malik', avatar: '👩‍🦱', country: '🇵🇰', location: 'Karachi, Pakistan', isOnline: true },
    { name: 'Ibrahim Khan', avatar: '👨‍🧔', country: '🇧🇩', location: 'Dhaka, Bangladesh', isOnline: true },
    { name: 'Yusuf Ahmed', avatar: '👨‍💻', country: '🇮🇩', location: 'Jakarta, Indonesia', isOnline: true },
    { name: 'Khadija Omar', avatar: '👩‍🎓', country: '🇲🇦', location: 'Casablanca, Morocco', isOnline: false }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect user location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              // Simulate reverse geocoding (in real app, use actual geocoding service)
              const locations = [
                'Lagos, Nigeria',
                'London, UK', 
                'New York, USA',
                'Dubai, UAE',
                'Istanbul, Turkey'
              ];
              const randomLocation = locations[Math.floor(Math.random() * locations.length)];
              setUserLocation(randomLocation);
            },
            (error) => {
              setUserLocation('Location not available');
            }
          );
        }
      } catch (error) {
        setUserLocation('Location not available');
      }
    };

    detectLocation();
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        avatar: '👤',
        country: '🌍',
        location: userLocation || 'Unknown Location',
        message: newMessage,
        time: 'Just now',
        likes: 0,
        replies: 0,
        isOnline: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleLike = (messageId: number) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  const onlineCount = onlineUsers.filter(user => user.isOnline).length;

  return (
    <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6">
      {/* Main Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Community Chat</span>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{onlineCount} online</span>
              </div>
              {userLocation && (
                <div className="flex items-center space-x-1 text-xs text-gray-500">
                  <MapPin className="w-3 h-3" />
                  <span>{userLocation}</span>
                </div>
              )}
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex space-x-3">
                  <div className="relative">
                    <span className="text-2xl">{message.avatar}</span>
                    <div className="absolute -bottom-1 -right-1">
                      {message.isOnline ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white">
                          <Wifi className="w-2 h-2 text-white absolute top-0 left-0" />
                        </div>
                      ) : (
                        <div className="w-3 h-3 bg-gray-400 rounded-full border-2 border-white">
                          <WifiOff className="w-2 h-2 text-white absolute top-0 left-0" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-semibold text-gray-900">{message.user}</span>
                      <span className="text-lg">{message.country}</span>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{message.location}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{message.time}</span>
                      </div>
                      {message.isOnline ? (
                        <span className="text-xs text-green-600 font-medium flex items-center space-x-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Online</span>
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400 flex items-center space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          <span>Offline</span>
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-3">{message.message}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <button 
                        onClick={() => handleLike(message.id)}
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        <span>{message.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        <span>{message.replies}</span>
                      </button>
                      <button className="flex items-center space-x-1 text-gray-500 hover:text-emerald-500 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Share your Hajj & Umrah experience..."
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 flex items-center space-x-2">
              <span>Share your experiences, ask questions, and connect with fellow pilgrims</span>
              {userLocation && (
                <span className="flex items-center space-x-1">
                  <span>•</span>
                  <MapPin className="w-3 h-3" />
                  <span>Chatting from {userLocation}</span>
                </span>
              )}
            </p>
          </div>
        </Card>
      </div>

      {/* Online Users Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>Members ({onlineUsers.length})</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="space-y-3">
              {onlineUsers.map((user, index) => (
                <div key={index} className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  user.isOnline ? 'hover:bg-green-50' : 'hover:bg-gray-50'
                }`}>
                  <div className="relative">
                    <span className="text-lg">{user.avatar}</span>
                    <div className="absolute -bottom-1 -right-1">
                      {user.isOnline ? (
                        <div className="w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full border border-white"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm text-gray-900 flex items-center space-x-2">
                      <span>{user.name}</span>
                      {user.isOnline ? (
                        <span className="text-xs text-green-600 font-bold">●</span>
                      ) : (
                        <span className="text-xs text-gray-400">●</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <span>{user.country}</span>
                      <MapPin className="w-3 h-3" />
                      <span>{user.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
              <h4 className="font-semibold text-emerald-800 mb-2">Community Guidelines</h4>
              <ul className="text-xs text-emerald-700 space-y-1">
                <li>• Be respectful and kind</li>
                <li>• Share authentic experiences</li>
                <li>• Help fellow pilgrims</li>
                <li>• Keep discussions Islamic</li>
              </ul>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>Global Community</span>
              </h4>
              <p className="text-xs text-blue-700">
                Connect with Muslims from {onlineUsers.length} different locations worldwide
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CommunityChat;
