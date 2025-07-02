import React, { useState } from 'react';
import { Star, MapPin, Users, Calendar, Filter, Search, Heart, Share2, MessageCircle, Crown, CheckCircle, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SocialShare from '@/components/SocialShare';

const AgentMarketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const agents = [
    {
      id: 1,
      name: 'Al-Haramain Premium Tours',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=400&q=80',
      adImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviews: 1245,
      location: 'Riyadh, Saudi Arabia',
      speciality: 'Premium Hajj Packages',
      description: 'Experience the sacred journey with luxury accommodations and expert guidance. 25 years of experience.',
      features: ['5-Star Hotels', 'VIP Transportation', '24/7 Support', 'Group Guide', 'Medical Assistance'],
      verified: true,
      premium: true,
      packages: 15,
      yearsExperience: 25,
      clientsServed: 50000,
      contact: {
        phone: '+966-11-234-5678',
        email: 'info@alharamaintours.com',
        whatsapp: '+966-50-123-4567',
        address: 'King Fahd Road, Riyadh 12345, Saudi Arabia'
      }
    },
    {
      id: 2,
      name: 'Madinah Express',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=400&q=80',
      adImage: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=600&q=80',
      rating: 4.8,
      reviews: 892,
      location: 'Istanbul, Turkey',
      speciality: 'Budget-Friendly Umrah',
      description: 'Affordable Umrah packages without compromising on quality and comfort. Trusted by thousands.',
      features: ['3-Star Hotels', 'Group Tours', 'Visa Support', 'Airport Transfer', 'Halal Meals'],
      verified: true,
      premium: false,
      packages: 8,
      yearsExperience: 15,
      clientsServed: 25000,
      contact: {
        phone: '+90-212-345-6789',
        email: 'contact@madinahexpress.com',
        whatsapp: '+90-555-123-4567',
        address: 'Fatih District, Istanbul 34122, Turkey'
      }
    },
    {
      id: 3,
      name: 'Zam Zam Family Travels',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=400&q=80',
      adImage: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=600&q=80',
      rating: 4.7,
      reviews: 634,
      location: 'Karachi, Pakistan',
      speciality: 'Family Hajj Packages',
      description: 'Specially designed packages for families with children and elderly pilgrims. Complete care service.',
      features: ['Family Rooms', 'Kid-Friendly', 'Elder Care', 'Medical Support', 'Special Meals'],
      verified: true,
      premium: true,
      packages: 12,
      yearsExperience: 20,
      clientsServed: 30000,
      contact: {
        phone: '+92-21-234-5678',
        email: 'info@zamzamfamily.com',
        whatsapp: '+92-300-123-4567',
        address: 'Gulshan-e-Iqbal, Karachi 75300, Pakistan'
      }
    },
    {
      id: 4,
      name: 'Makkah Gateway',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=400&q=80',
      adImage: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=600&q=80',
      rating: 4.9,
      reviews: 1567,
      location: 'London, UK',
      speciality: 'Luxury Umrah Experience',
      description: 'Premium Umrah packages with exclusive access to the holiest sites and luxury accommodations.',
      features: ['Luxury Hotels', 'Private Guide', 'Fast-Track Visa', 'Concierge Service', 'Private Transport'],
      verified: true,
      premium: true,
      packages: 20,
      yearsExperience: 30,
      clientsServed: 75000,
      contact: {
        phone: '+44-20-7123-4567',
        email: 'bookings@makkahgateway.co.uk',
        whatsapp: '+44-7700-123456',
        address: 'Edgware Road, London W2 1DZ, UK'
      }
    }
  ];

  const filters = [
    { id: 'all', name: 'All Agents', count: agents.length },
    { id: 'premium', name: 'Premium Agents', count: agents.filter(a => a.premium).length },
    { id: 'hajj', name: 'Hajj Specialists', count: 3 },
    { id: 'umrah', name: 'Umrah Experts', count: 4 },
    { id: 'family', name: 'Family Packages', count: 2 }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'premium' && agent.premium) ||
      (selectedFilter === 'hajj' && agent.speciality.toLowerCase().includes('hajj')) ||
      (selectedFilter === 'umrah' && agent.speciality.toLowerCase().includes('umrah')) ||
      (selectedFilter === 'family' && agent.speciality.toLowerCase().includes('family'));
    
    const matchesSearch = searchTerm === '' || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.speciality.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleDirectChat = (agent: typeof agents[0]) => {
    const message = `Hello! I'm interested in your ${agent.speciality} services. Could you please provide more information?`;
    const whatsappUrl = `https://wa.me/${agent.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white shadow-xl border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-emerald-600" />
                <span>Filter Agents</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filter Options */}
              <div className="space-y-2">
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agents Grid */}
        <div className="lg:col-span-3">
          <div className="grid gap-8">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Advertisement Banner */}
                <div className="relative h-64">
                  <img 
                    src={agent.adImage} 
                    alt={`${agent.name} advertisement`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  
                  {/* Agent Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-2xl font-bold">{agent.name}</h3>
                          {agent.verified && (
                            <div className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                              <CheckCircle className="w-3 h-3" />
                              <span>VERIFIED</span>
                            </div>
                          )}
                          {agent.premium && (
                            <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                              <Crown className="w-3 h-3" />
                              <span>PREMIUM</span>
                            </div>
                          )}
                        </div>
                        <p className="text-lg opacity-90 mb-2">{agent.speciality}</p>
                        <div className="flex items-center space-x-4 text-sm opacity-80">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{agent.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4" />
                            <span>{agent.clientsServed.toLocaleString()} clients</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{agent.yearsExperience} years</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {/* Rating and Stats */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          <span className="font-bold text-lg text-gray-900">{agent.rating}</span>
                          <span className="text-gray-600">({agent.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{agent.packages} packages available</div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">{agent.description}</p>

                    {/* Contact Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Contact Information</h4>
                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          <a href={`tel:${agent.contact.phone}`} className="text-gray-700 hover:text-emerald-600">
                            {agent.contact.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-emerald-600" />
                          <a href={`mailto:${agent.contact.email}`} className="text-gray-700 hover:text-emerald-600">
                            {agent.contact.email}
                          </a>
                        </div>
                        <div className="md:col-span-2 flex items-start space-x-2">
                          <MapPin className="w-4 h-4 text-emerald-600 mt-0.5" />
                          <span className="text-gray-700">{agent.contact.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {agent.features.map((feature, index) => (
                        <span key={index} className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                          <Heart className="w-4 h-4 mr-1" />
                          Save
                        </Button>
                        <SocialShare 
                          title={agent.name}
                          description={agent.description}
                          url={`${window.location.origin}/agent/${agent.id}`}
                        />
                      </div>
                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                          onClick={() => handleDirectChat(agent)}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Direct Chat
                        </Button>
                        <Button size="sm" className="bg-gradient-islamic hover:opacity-90 text-white">
                          View Packages
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl"
            >
              Load More Agents
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMarketplace;
