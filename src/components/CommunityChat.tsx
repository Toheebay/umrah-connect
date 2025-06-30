
import React, { useState } from 'react';
import { Send, Heart, MessageCircle, Users, Flag, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CommunityChat = () => {
  const [message, setMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState('general');

  const chatRooms = [
    { id: 'general', name: 'General Discussion', members: 1243, active: true },
    { id: 'hajj', name: 'Hajj 2024', members: 892, active: false },
    { id: 'umrah', name: 'Umrah Tips', members: 1567, active: true },
    { id: 'duas', name: 'Duas & Prayers', members: 734, active: false },
    { id: 'travel', name: 'Travel Tips', members: 456, active: true }
  ];

  const messages = [
    {
      id: 1,
      user: 'Ahmed Al-Rashid',
      avatar: '👨‍🦲',
      time: '10:30 AM',
      message: 'السلام عليكم brothers and sisters! Just completed my Umrah last week. What an amazing experience!',
      likes: 12,
      replies: 3,
      country: '🇸🇦'
    },
    {
      id: 2,
      user: 'Fatima Hassan',
      avatar: '👩‍🦱',
      time: '10:45 AM',
      message: 'MashaAllah! Could you share some tips for first-time pilgrims? Planning my Umrah for next month.',
      likes: 8,
      replies: 5,
      country: '🇲🇾'
    },
    {
      id: 3,
      user: 'Mohammad Khan',
      avatar: '👨‍🧔',
      time: '11:00 AM',
      message: 'Best advice: Go with a humble heart and make lots of dua. The experience is life-changing!',
      likes: 15,
      replies: 2,
      country: '🇵🇰'
    },
    {
      id: 4,
      user: 'Aisha Ibrahim',
      avatar: '👩',
      time: '11:15 AM',
      message: 'Also, comfortable shoes are essential! And bring dates - they taste amazing after long prayers.',
      likes: 9,
      replies: 1,
      country: '🇪🇬'
    }
  ];

  const onlineUsers = [
    { name: 'Omar', avatar: '👨', country: '🇯🇴' },
    { name: 'Khadija', avatar: '👩', country: '🇲🇦' },
    { name: 'Yusuf', avatar: '👨‍🦲', country: '🇹🇷' },
    { name: 'Zainab', avatar: '👩‍🦱', country: '🇮🇩' },
    { name: 'Ali', avatar: '👨‍🧔', country: '🇮🇷' }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Join Our Global
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              Muslim Community
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow Muslims, share experiences, and get guidance from the community
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Chat Rooms Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span>Chat Rooms</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {chatRooms.map((room) => (
                    <div
                      key={room.id}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        activeRoom === room.id
                          ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      onClick={() => setActiveRoom(room.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{room.name}</div>
                          <div className="text-xs text-gray-500">{room.members} members</div>
                        </div>
                        {room.active && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Online Users */}
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl mt-6">
                <CardHeader>
                  <CardTitle className="text-sm">Online Now</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {onlineUsers.map((user, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <span className="text-2xl">{user.avatar}</span>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.country}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Main Chat Area */}
            <div className="lg:col-span-3">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl h-[600px] flex flex-col">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      <span>{chatRooms.find(r => r.id === activeRoom)?.name}</span>
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((msg) => (
                    <div key={msg.id} className="group">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <span className="text-3xl">{msg.avatar}</span>
                          <span className="absolute -bottom-1 -right-1 text-sm">{msg.country}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-gray-900">{msg.user}</span>
                            <span className="text-xs text-gray-500">{msg.time}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed mb-3">{msg.message}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                              <Heart className="w-4 h-4" />
                              <span>{msg.likes}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span>{msg.replies}</span>
                            </button>
                            <button className="opacity-0 group-hover:opacity-100 hover:text-gray-700 transition-all">
                              <Flag className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder="Type your message... السلام عليكم"
                        className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      className="bg-gradient-islamic hover:opacity-90 text-white p-4 rounded-xl"
                      disabled={!message.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-gray-500 text-center">
                    Please be respectful and follow our community guidelines
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityChat;
