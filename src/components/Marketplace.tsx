
import React, { useState } from 'react';
import { Star, MapPin, Users, Calendar, Filter, Search, Heart, Share2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Marketplace = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const agents = [
    {
      id: 1,
      name: 'Al-Haramain Tours',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 1245,
      location: 'Riyadh, Saudi Arabia',
      speciality: 'Premium Hajj Packages',
      price: 'From $2,999',
      description: 'Experience the sacred journey with luxury accommodations and expert guidance.',
      features: ['5-Star Hotels', 'VIP Transportation', '24/7 Support', 'Group Guide'],
      verified: true,
      packages: 15
    },
    {
      id: 2,
      name: 'Madinah Express',
      image: 'https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?auto=format&fit=crop&w=400&q=80',
      rating: 4.8,
      reviews: 892,
      location: 'Istanbul, Turkey',
      speciality: 'Budget-Friendly Umrah',
      price: 'From $899',
      description: 'Affordable Umrah packages without compromising on quality and comfort.',
      features: ['3-Star Hotels', 'Group Tours', 'Visa Support', 'Airport Transfer'],
      verified: true,
      packages: 8
    },
    {
      id: 3,
      name: 'Zam Zam Travels',
      image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=400&q=80',
      rating: 4.7,
      reviews: 634,
      location: 'Karachi, Pakistan',
      speciality: 'Family Hajj Packages',
      price: 'From $1,899',
      description: 'Specially designed packages for families with children and elderly pilgrims.',
      features: ['Family Rooms', 'Kid-Friendly', 'Elder Care', 'Medical Support'],
      verified: true,
      packages: 12
    },
    {
      id: 4,
      name: 'Makkah Gateway',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=400&q=80',
      rating: 4.9,
      reviews: 1567,
      location: 'London, UK',
      speciality: 'Luxury Umrah Experience',
      price: 'From $1,599',
      description: 'Premium Umrah packages with exclusive access to the holiest sites.',
      features: ['Luxury Hotels', 'Private Guide', 'Fast-Track Visa', 'Concierge Service'],
      verified: true,
      packages: 20
    }
  ];

  const filters = [
    { id: 'all', name: 'All Agents', count: agents.length },
    { id: 'hajj', name: 'Hajj Specialists', count: 12 },
    { id: 'umrah', name: 'Umrah Experts', count: 8 },
    { id: 'budget', name: 'Budget Friendly', count: 6 },
    { id: 'luxury', name: 'Luxury Packages', count: 4 }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Certified Agent
            <span className="block bg-gradient-islamic bg-clip-text text-transparent">
              Marketplace
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our verified agents and find the perfect package for your sacred journey
          </p>
        </div>

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
              <div className="grid md:grid-cols-2 gap-6">
                {agents.map((agent) => (
                  <Card key={agent.id} className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
                    <div className="relative">
                      <img 
                        src={agent.image} 
                        alt={agent.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      {agent.verified && (
                        <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ✓ VERIFIED
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-bold text-xl mb-1">{agent.name}</h3>
                        <p className="text-sm opacity-90">{agent.speciality}</p>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        {/* Rating and Location */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="font-bold text-gray-900">{agent.rating}</span>
                              <span className="text-sm text-gray-600">({agent.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{agent.location}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 text-sm leading-relaxed">{agent.description}</p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {agent.features.map((feature, index) => (
                            <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Price and Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-emerald-600">{agent.price}</div>
                            <div className="text-xs text-gray-500">{agent.packages} packages available</div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-gradient-islamic hover:opacity-90 text-white">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              Contact
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
      </div>
    </section>
  );
};

export default Marketplace;
