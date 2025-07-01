
import React from 'react';
import Header from '@/components/Header';
import AgentMarketplace from '@/components/AgentMarketplace';
import AgentSubscription from '@/components/AgentSubscription';
import AgentRegistration from '@/components/AgentRegistration';
import ClientManagement from '@/components/ClientManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, CreditCard, UserPlus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Agents = () => {
  const { toast } = useToast();

  const handleRegistrationSuccess = () => {
    toast({
      title: "Registration Complete!",
      description: "Welcome to our agent network. You can now manage your clients and services.",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Certified Agents
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              & Services
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find trusted agents, register your business, and manage your Hajj & Umrah services
          </p>
        </div>

        <Tabs defaultValue="marketplace" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-2/3 mx-auto mb-8">
            <TabsTrigger value="marketplace" className="flex items-center space-x-2">
              <Store className="w-4 h-4" />
              <span>Marketplace</span>
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Register</span>
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Manage Clients</span>
            </TabsTrigger>
            <TabsTrigger value="subscription" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Plans</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace">
            <AgentMarketplace />
          </TabsContent>

          <TabsContent value="register">
            <AgentRegistration onRegistrationSuccess={handleRegistrationSuccess} />
          </TabsContent>

          <TabsContent value="manage">
            <ClientManagement />
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
