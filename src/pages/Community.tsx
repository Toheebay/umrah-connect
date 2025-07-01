
import React, { useState } from 'react';
import Header from '@/components/Header';
import CommunityChat from '@/components/CommunityChat';
import IslamicResources from '@/components/IslamicResources';
import QuranHadithResources from '@/components/QuranHadithResources';
import CommunityForum from '@/components/CommunityForum';
import IslamicDate from '@/components/IslamicDate';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Book, Users, Star, BookOpen } from 'lucide-react';

const Community = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Muslim Community
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              Hub
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect, learn, and share your Hajj & Umrah journey with fellow Muslims worldwide
          </p>
        </div>

        {/* Islamic Date Display */}
        <div className="max-w-md mx-auto mb-8">
          <IslamicDate />
        </div>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-2/3 mx-auto mb-8">
            <TabsTrigger value="chat" className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Live Chat</span>
            </TabsTrigger>
            <TabsTrigger value="forum" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Forum</span>
            </TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center space-x-2">
              <Book className="w-4 h-4" />
              <span>Resources</span>
            </TabsTrigger>
            <TabsTrigger value="quran-hadith" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Quran & Hadith</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat">
            <CommunityChat />
          </TabsContent>

          <TabsContent value="forum">
            <CommunityForum />
          </TabsContent>

          <TabsContent value="resources">
            <IslamicResources />
          </TabsContent>

          <TabsContent value="quran-hadith">
            <QuranHadithResources />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
