
import React from 'react';
import Header from '@/components/Header';
import AgentMarketplace from '@/components/AgentMarketplace';
import AgentSubscription from '@/components/AgentSubscription';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, CreditCard } from 'lucide-react';

const Agents = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certified Agents
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              & Subscriptions
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find trusted agents and subscribe to premium services for your Hajj & Umrah journey
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-1/3 mx-auto mb-8">
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Agent Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Premium Plans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <AgentMarketplace />
          </TabsContent>

          <TabsContent value="subscription">
            <AgentSubscription />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Agents;
