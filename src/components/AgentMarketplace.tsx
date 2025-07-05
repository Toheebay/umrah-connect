
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Mail, Globe, Users, Calendar, DollarSign } from 'lucide-react';

const AgentMarketplace = () => {
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedService, setSelectedService] = useState('all');

  // Mock data with updated pricing for Nigerian agents
  const agents = [
    {
      id: 1,
      name: 'Ahmad Travel Services',
      location: 'Riyadh, Saudi Arabia',
      country: 'SA',
      rating: 4.9,
      reviews: 156,
      specialization: ['Hajj', 'Umrah'],
      languages: ['Arabic', 'English'],
      experience: 8,
      verified: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      packages: [
        { type: 'Hajj', price: 4500, currency: 'USD', duration: '40 days' },
        { type: 'Umrah', price: 1200, currency: 'USD', duration: '14 days' }
      ],
      contact: { phone: '+966-11-234-5678', email: 'info@ahmadtravel.sa', website: 'www.ahmadtravel.sa' }
    },
    {
      id: 2,
      name: 'Blessed Journeys Nigeria',
      location: 'Lagos, Nigeria',
      country: 'NG',
      rating: 4.7,
      reviews: 89,
      specialization: ['Hajj', 'Umrah', 'Group Tours'],
      languages: ['English', 'Hausa', 'Yoruba'],
      experience: 12,
      verified: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616c0763c18?w=150&h=150&fit=crop&crop=face',
      packages: [
        { type: 'Hajj', price: 9850000, currency: 'NGN', duration: '45 days' },
        { type: 'Umrah', price: 2500000, currency: 'NGN', duration: '14 days' }
      ],
      contact: { phone: '+234-1-234-5678', email: 'info@blessedjourneysng.com', website: 'www.blessedjourneysng.com' }
    },
    {
      id: 3,
      name: 'Emirates Hajj & Umrah',
      location: 'Dubai, UAE',
      country: 'AE',
      rating: 4.8,
      reviews: 203,
      specialization: ['Hajj', 'Umrah', 'VIP Services'],
      languages: ['Arabic', 'English', 'Urdu'],
      experience: 15,
      verified: true,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      packages: [
        { type: 'Hajj', price: 5200, currency: 'USD', duration: '42 days' },
        { type: 'Umrah', price: 1500, currency: 'USD', duration: '10 days' }
      ],
      contact: { phone: '+971-4-234-5678', email: 'info@emirateshajj.ae', website: 'www.emirateshajj.ae' }
    }
  ];

  const countries = [
    { value: 'all', label: 'All Countries' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'AE', label: 'UAE' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'QA', label: 'Qatar' },
    { value: 'OM', label: 'Oman' }
  ];

  const services = [
    { value: 'all', label: 'All Services' },
    { value: 'Hajj', label: 'Hajj' },
    { value: 'Umrah', label: 'Umrah' },
    { value: 'Group Tours', label: 'Group Tours' },
    { value: 'VIP Services', label: 'VIP Services' }
  ];

  const filteredAgents = agents.filter(agent => {
    const matchesCountry = selectedCountry === 'all' || agent.country === selectedCountry;
    const matchesService = selectedService === 'all' || agent.specialization.includes(selectedService);
    return matchesCountry && matchesService;
  });

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'NGN') {
      return `₦${price.toLocaleString()}`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Certified Agents Marketplace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find trusted and verified Hajj & Umrah agents from around the world
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {countries.map(country => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>

        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
        >
          {services.map(service => (
            <option key={service.value} value={service.value}>
              {service.label}
            </option>
          ))}
        </select>
      </div>

      {/* Agent Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map(agent => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start space-x-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                    {agent.verified && (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{agent.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                    <span className="text-sm text-gray-500">({agent.reviews} reviews)</span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Specializations */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {agent.specialization.map(spec => (
                    <Badge key={spec} variant="outline" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Languages</h4>
                <p className="text-sm text-gray-600">{agent.languages.join(', ')}</p>
              </div>

              {/* Experience */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>{agent.experience} years experience</span>
              </div>

              {/* Packages */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Package Prices</h4>
                <div className="space-y-2">
                  {agent.packages.map((pkg, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3" />
                        <span>{pkg.type}</span>
                      </span>
                      <div className="text-right">
                        <div className="font-semibold text-emerald-600">
                          {formatPrice(pkg.price, pkg.currency)}
                        </div>
                        <div className="text-xs text-gray-500">{pkg.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Actions */}
              <div className="flex space-x-2 pt-4">
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Phone className="w-4 h-4 mr-1" />
                  Contact
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
              </div>

              {agent.contact.website && (
                <Button size="sm" variant="ghost" className="w-full text-sm">
                  <Globe className="w-4 h-4 mr-1" />
                  Visit Website
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
          <p className="text-gray-600">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
};

export default AgentMarketplace;
