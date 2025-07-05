
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu, X, Users, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ChatNavigator from './ChatNavigator';

interface Message {
  id: string;
  username: string;
  message: string;
  timestamp: string;
  location?: string;
  type?: 'text' | 'join' | 'leave';
  user_id?: string;
}

interface OnlineUser {
  username: string;
  location: string;
  user_id?: string;
  isGuest?: boolean;
  presence_ref?: string;
}

const CommunityChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [activeTab, setActiveTab] = useState('users');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [presenceChannel, setPresenceChannel] = useState<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Check for authenticated user or guest
  useEffect(() => {
    const initializeUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setCurrentUser(user);
        setIsGuest(false);
      } else {
        // Check for guest user
        const guestUser = localStorage.getItem('guestUser');
        if (guestUser) {
          const guest = JSON.parse(guestUser);
          setCurrentUser(guest);
          setIsGuest(true);
        }
      }
    };
    
    initializeUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(session.user);
        setIsGuest(false);
      } else {
        // Check for guest user when no auth session
        const guestUser = localStorage.getItem('guestUser');
        if (guestUser) {
          const guest = JSON.parse(guestUser);
          setCurrentUser(guest);
          setIsGuest(true);
        } else {
          setCurrentUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Set up real-time presence tracking
  useEffect(() => {
    if (!currentUser) return;

    const channel = supabase.channel('global-chat-presence', {
      config: {
        presence: {
          key: currentUser.id || `guest-${Date.now()}`,
        },
      },
    });

    // Track current user presence
    const userPresence = {
      username: getUserDisplayName(),
      location: getUserLocation(),
      user_id: isGuest ? undefined : currentUser.id,
      isGuest: isGuest,
      online_at: new Date().toISOString(),
    };

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        console.log('Presence sync:', presenceState);
        
        const users: OnlineUser[] = [];
        Object.keys(presenceState).forEach(key => {
          const presences = presenceState[key];
          presences.forEach((presence: any) => {
            users.push({
              username: presence.username,
              location: presence.location,
              user_id: presence.user_id,
              isGuest: presence.isGuest,
              presence_ref: key,
            });
          });
        });
        
        setOnlineUsers(users);
      })
      .on('presence', { event: 'join' }, ({ key, newPresences }) => {
        console.log('User joined:', key, newPresences);
        newPresences.forEach((presence: any) => {
          const joinMessage: Message = {
            id: `join-${Date.now()}-${Math.random()}`,
            username: 'System',
            message: `${presence.username} joined the chat from ${presence.location}`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'join'
          };
          setMessages(prev => [...prev, joinMessage]);
        });
      })
      .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
        console.log('User left:', key, leftPresences);
        leftPresences.forEach((presence: any) => {
          const leaveMessage: Message = {
            id: `leave-${Date.now()}-${Math.random()}`,
            username: 'System',
            message: `${presence.username} left the chat`,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'leave'
          };
          setMessages(prev => [...prev, leaveMessage]);
        });
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Connected to presence channel');
          await channel.track(userPresence);
        }
      });

    setPresenceChannel(channel);

    return () => {
      console.log('Cleaning up presence channel');
      if (channel) {
        channel.untrack();
        supabase.removeChannel(channel);
      }
    };
  }, [currentUser, isGuest]);

  // Load messages from Supabase
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data: chatMessages, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true })
          .limit(50);

        if (error) {
          console.error('Error loading messages:', error);
        } else if (chatMessages) {
          const formattedMessages = chatMessages.map(msg => ({
            id: msg.id,
            username: msg.user_id ? 'User' : 'Guest',
            message: msg.message,
            timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: msg.message_type as 'text' | 'join' | 'leave',
            user_id: msg.user_id
          }));
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error('Error in loadMessages:', error);
      }
    };

    loadMessages();
  }, []);

  // Set up real-time message subscription
  useEffect(() => {
    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        (payload) => {
          console.log('New message received:', payload);
          const newMsg = {
            id: payload.new.id,
            username: payload.new.user_id ? 'User' : 'Guest',
            message: payload.new.message,
            timestamp: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: payload.new.message_type as 'text' | 'join' | 'leave',
            user_id: payload.new.user_id
          };
          
          setMessages(prev => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const getUserDisplayName = () => {
    if (isGuest && currentUser) {
      return `Guest-${currentUser.username || 'User'}`;
    }
    return currentUser?.user_metadata?.username || currentUser?.email?.split('@')[0] || 'User';
  };

  const getUserLocation = () => {
    if (isGuest) {
      return localStorage.getItem('guestLocation') || 'Unknown';
    }
    return currentUser?.user_metadata?.location || 'Unknown';
  };

  useEffect(() => {
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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUser) return;

    const messageData = {
      message: newMessage,
      user_id: isGuest ? null : currentUser.id,
      message_type: 'text'
    };

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert([messageData]);

      if (error) {
        console.error('Error sending message:', error);
        // Fall back to local message if database fails
        const now = new Date();
        const timestamp = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const localMessage: Message = {
          id: `local-${Date.now()}`,
          username: getUserDisplayName(),
          message: newMessage,
          timestamp: timestamp,
          location: getUserLocation(),
          type: 'text',
          user_id: isGuest ? undefined : currentUser.id
        };
        setMessages(prev => [...prev, localMessage]);
      }
      
      setNewMessage('');
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
                          key={`${user.username}-${user.location}-${index}`}
                          className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer"
                        >
                          <div className="relative">
                            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              user.isGuest ? 'bg-gradient-to-r from-gray-500 to-gray-600' : 'bg-gradient-to-r from-blue-500 to-purple-600'
                            }`}>
                              {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm truncate">
                              {user.username} {user.isGuest && '(Guest)'}
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
                        { name: 'General Discussion', count: onlineUsers.length, flag: '🌍' },
                        { name: 'Hajj 2024', count: Math.floor(onlineUsers.length * 0.6), flag: '🕋' },
                        { name: 'Umrah Tips', count: Math.floor(onlineUsers.length * 0.8), flag: '🤲' },
                        { name: 'Travel Stories', count: Math.floor(onlineUsers.length * 0.4), flag: '✈️' }
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
                    🌍 Global Community Chat
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {onlineUsers.length} members online • Real-time messaging
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
                  {currentUser ? (isGuest ? '🎭 Guest' : '👤 Profile') : '🔐 Login'}
                </Button>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4 bg-gray-50"
            >
              {messages.map((message, index) => {
                const isCurrentUser = message.username === getUserDisplayName() || 
                  (message.user_id && !isGuest && message.user_id === currentUser?.id);
                
                return (
                  <div
                    key={message.id || index}
                    className={`flex items-start space-x-2 sm:space-x-3 ${
                      isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''
                    } animate-slide-up`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm ${
                        message.type === 'join' || message.type === 'leave'
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : isCurrentUser
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : message.username.includes('Guest')
                          ? 'bg-gradient-to-r from-gray-500 to-gray-600'
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500'
                      }`}>
                        {message.username.charAt(0).toUpperCase()}
                      </div>
                    </div>
                    
                    <div className={`max-w-[70%] sm:max-w-[80%] ${
                      isCurrentUser ? 'text-right' : ''
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
                        message.type === 'join' || message.type === 'leave'
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800 border border-emerald-200'
                          : isCurrentUser
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}>
                        {message.type === 'join' ? (
                          <span className="font-medium">
                            🎉 {message.message}
                          </span>
                        ) : message.type === 'leave' ? (
                          <span className="font-medium">
                            👋 {message.message}
                          </span>
                        ) : (
                          message.message
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t bg-white p-3 sm:p-4 lg:p-6">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
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
              {currentUser && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Connected as {getUserDisplayName()} from {getUserLocation()}
                </p>
              )}
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
