import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ChatNavigator from './ChatNavigator';

interface Message {
  username: string;
  message: string;
  timestamp: string;
  location?: string;
  type?: 'text' | 'join';
}

const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Check for authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
    };
    
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // Mock data for demonstration
    const mockMessages: Message[] = [
      { username: 'System', message: 'Welcome to the community!', timestamp: '10:00 AM', type: 'join' },
      { username: 'Hassan', message: 'Hello everyone!', timestamp: '10:01 AM', location: 'Riyadh' },
      { username: 'Fatima', message: 'Excited to be here.', timestamp: '10:02 AM', location: 'Cairo' },
      { username: 'Ahmed', message: 'Anyone planning Hajj this year?', timestamp: '10:03 AM', location: 'London' },
    ];
    const mockUsers = [
      { username: 'Hassan', location: 'Riyadh' },
      { username: 'Fatima', location: 'Cairo' },
      { username: 'Ahmed', location: 'London' },
      { username: 'Aisha', location: 'Istanbul' },
    ];

    setMessages(mockMessages);
    setOnlineUsers(mockUsers);

    // Scroll to bottom on initial load
    scrollToBottom();
  }, []);

  useEffect(() => {
    // Scroll to bottom on new messages
    scrollToBottom();
  }, [messages]);

  const scrollToTop = () => {
    messagesContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollUp = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollBy({ top: -200, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const message: Message = {
        username: currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0] || 'Guest',
        message: newMessage,
        timestamp: timestamp,
        location: currentUser?.user_metadata?.location || localStorage.getItem('guestLocation') || 'Unknown',
        type: 'text',
      };
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-4 sm:gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Sidebar - Users & Rooms */}
        <div className={`lg:col-span-1 ${!isSidebarOpen ? 'hidden lg:block' : 'fixed lg:relative inset-0 lg:inset-auto z-50 lg:z-auto'} bg-white lg:bg-transparent`}>
          <Card className="h-full flex flex-col shadow-xl lg:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between p-4 lg:p-6 border-b">
              <CardTitle className="text-lg lg:text-xl font-bold text-gray-900">
                Community
              </CardTitle>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 overflow-hidden">
              <div className="h-full flex flex-col">
                {/* Tabs */}
                <div className="flex border-b">
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                      activeTab === 'users'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-4 h-4 mx-auto mb-1" />
                    Online ({onlineUsers.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('rooms')}
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors ${
                      activeTab === 'rooms'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 mx-auto mb-1" />
                    Rooms
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-3 sm:p-4">
                  {activeTab === 'users' ? (
                    <div className="space-y-2 sm:space-y-3">
                      {onlineUsers.map((user, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer"
                        >
                          <div className="relative">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                              {user.username}
                            </div>
                            <div className="text-xs text-gray-500 truncate">
                              {user.location && `📍 ${user.location}`}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2 sm:space-y-3">
                      {[
                        { name: 'General Discussion', count: 45, flag: '🌍' },
                        { name: 'Hajj 2024', count: 23, flag: '🕋' },
                        { name: 'Umrah Tips', count: 34, flag: '🤲' },
                        { name: 'Travel Stories', count: 18, flag: '✈️' }
                      ].map((room, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl hover:from-emerald-100 hover:to-teal-100 transition-all cursor-pointer"
                        >
                          <div className="text-xl sm:text-2xl">{room.flag}</div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                              {room.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {room.count} members
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
          <Card className="flex-1 flex flex-col shadow-xl">
            {/* Chat Header */}
            <CardHeader className="flex flex-row items-center justify-between p-3 sm:p-4 lg:p-6 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg">
                    🌍 General Discussion
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {onlineUsers.length} members online
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  onClick={() => window.location.href = '/auth'}
                >
                  {currentUser ? '👤 Profile' : '🔐 Login'}
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-gray-50"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 sm:space-x-3 ${
                    message.username === (currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0])
                      ? 'flex-row-reverse space-x-reverse' 
                      : ''
                  } animate-slide-up`}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                      message.username === (currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0])
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                    }`}>
                      {message.username.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  
                  <div className={`max-w-[70%] sm:max-w-[80%] ${
                    message.username === (currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0])
                      ? 'text-right' 
                      : ''
                  }`}>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-xs sm:text-sm text-gray-900">
                        {message.username}
                      </span>
                      {message.location && (
                        <span className="text-xs text-gray-500">
                          📍 {message.location}
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <div className={`inline-block px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-sm text-sm sm:text-base ${
                      message.username === (currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0])
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}>
                      {message.type === 'join' ? (
                        <span className="text-emerald-600 font-medium">
                          🎉 {message.message}
                        </span>
                      ) : (
                        message.message
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t bg-white p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder={currentUser ? "Type your message..." : "Login to send messages..."}
                  disabled={!currentUser}
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 disabled:bg-gray-100 disabled:cursor-not-allowed text-sm sm:text-base"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!currentUser || !newMessage.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
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
