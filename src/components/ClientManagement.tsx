
import React, { useState } from 'react';
import { Search, Filter, Users, MessageCircle, Phone, Mail, Star, Calendar, MapPin, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    {
      id: 1,
      name: 'Ahmed Al-Mahmoud',
      email: 'ahmed.mahmoud@email.com',
      phone: '+966 50 123 4567',
      location: 'Riyadh, Saudi Arabia',
      status: 'active',
      package: 'Premium Hajj Package',
      joinDate: '2024-01-15',
      totalSpent: 4500,
      lastActivity: '2 days ago',
      rating: 5,
      notes: 'VIP client, prefers luxury accommodations',
      avatar: '👨‍💼'
    },
    {
      id: 2,
      name: 'Fatima Khatun',
      email: 'fatima.khatun@email.com',
      phone: '+880 171 234 5678',
      location: 'Dhaka, Bangladesh',
      status: 'pending',
      package: 'Family Umrah Package',
      joinDate: '2024-02-20',
      totalSpent: 2800,
      lastActivity: '1 hour ago',
      rating: 4,
      notes: 'Family of 4, requires halal meals',
      avatar: '👩‍💼'
    },
    {
      id: 3,
      name: 'Omar Hassan',
      email: 'omar.hassan@email.com',
      phone: '+20 100 123 4567',
      location: 'Cairo, Egypt',
      status: 'completed',
      package: 'Budget Umrah Package',
      joinDate: '2023-11-10',
      totalSpent: 1200,
      lastActivity: '1 week ago',
      rating: 5,
      notes: 'Repeat customer, very satisfied',
      avatar: '👨‍🦲'
    },
    {
      id: 4,
      name: 'Aisha Ibrahim',
      email: 'aisha.ibrahim@email.com',
      phone: '+234 802 345 6789',
      location: 'Lagos, Nigeria',
      status: 'active',
      package: 'Premium Umrah Package',
      joinDate: '2024-03-05',
      totalSpent: 3200,
      lastActivity: '3 days ago',
      rating: 4,
      notes: 'First-time pilgrim, needs guidance',
      avatar: '👩‍🦱'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = searchTerm === '' || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Client Management</h1>
        <p className="text-gray-600">Manage your clients and track their journey</p>
      </div>

      {/* Search and Filter Bar */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search clients by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex space-x-2">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{clients.length}</div>
            <div className="text-sm text-gray-600">Total Clients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{clients.filter(c => c.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active Bookings</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4.5</div>
            <div className="text-sm text-gray-600">Avg Rating</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-emerald-600 text-2xl font-bold mb-2">$</div>
            <div className="text-2xl font-bold text-gray-900">
              {clients.reduce((sum, client) => sum + client.totalSpent, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Revenue</div>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Clients ({filteredClients.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Spent</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Rating</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Last Activity</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{client.avatar}</span>
                        <div>
                          <div className="font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-600">{client.email}</div>
                          <div className="text-xs text-gray-500 flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{client.location}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{client.package}</div>
                      <div className="text-sm text-gray-600">Joined {client.joinDate}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                        {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">${client.totalSpent.toLocaleString()}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{client.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">{client.lastActivity}</div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" className="p-2">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="p-2">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;
