
import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, Search, Clock, CheckCircle, AlertCircle, Book } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SupportCenter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      availability: '24/7 Available',
      color: 'bg-emerald-500'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak directly with our experts',
      availability: 'Mon-Fri 9AM-6PM',
      color: 'bg-blue-500'
    },
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Send us your detailed queries',
      availability: 'Response within 2 hours',
      color: 'bg-purple-500'
    }
  ];

  const faqCategories = [
    { id: 'all', name: 'All FAQs', count: 24 },
    { id: 'booking', name: 'Booking & Payments', count: 8 },
    { id: 'visa', name: 'Visa & Documentation', count: 6 },
    { id: 'travel', name: 'Travel & Accommodation', count: 5 },
    { id: 'religious', name: 'Religious Guidance', count: 5 }
  ];

  const faqs = [
    {
      id: 1,
      category: 'booking',
      question: 'How do I book a Hajj or Umrah package?',
      answer: 'You can book through our verified agents. Browse the agent marketplace, compare packages, and contact your preferred agent directly. All payments are processed securely through our platform.',
      popular: true
    },
    {
      id: 2,
      category: 'visa',
      question: 'What documents do I need for Umrah visa?',
      answer: 'Required documents include: Valid passport (6+ months), completed visa application form, recent passport photos, vaccination certificates, and proof of accommodation booking.',
      popular: true
    },
    {
      id: 3,
      category: 'religious',
      question: 'What are the essential rituals of Hajj?',
      answer: 'The main rituals include: Ihram (sacred state), Tawaf (circumambulation of Kaaba), Saee (walking between Safa and Marwah), standing at Arafat, Muzdalifah overnight stay, and stone throwing at Jamarat.',
      popular: true
    },
    {
      id: 4,
      category: 'travel',
      question: 'What should I pack for Hajj/Umrah?',
      answer: 'Essential items: Ihram clothing, comfortable walking shoes, prayer mat, Quran, duas book, medications, unscented toiletries, and weather-appropriate clothing for Madinah.',
      popular: false
    },
    {
      id: 5,
      category: 'booking',
      question: 'Can I cancel or modify my booking?',
      answer: 'Cancellation and modification policies vary by agent and package type. Most agents offer flexible options with varying fees. Check your specific package terms or contact your agent directly.',
      popular: false
    },
    {
      id: 6,
      category: 'visa',
      question: 'How long does visa processing take?',
      answer: 'Umrah visa processing typically takes 3-7 business days. Hajj visa processing can take 2-4 weeks. We recommend applying well in advance of your travel dates.',
      popular: false
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchTerm === '' || faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Support Center
          <span className="block bg-gradient-islamic bg-clip-text text-transparent">
            We're Here to Help
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get the support you need for your sacred journey. Our team is available 24/7 to assist you.
        </p>
      </div>

      <Tabs defaultValue="contact" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 lg:w-1/2 mx-auto mb-8">
          <TabsTrigger value="contact" className="flex items-center space-x-2">
            <MessageCircle className="w-4 h-4" />
            <span>Contact Support</span>
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center space-x-2">
            <Book className="w-4 h-4" />
            <span>FAQ</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contact">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {supportOptions.map((option, index) => (
              <Card key={index} className="bg-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <option.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex items-center justify-center space-x-1 text-sm text-green-600 mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{option.availability}</span>
                  </div>
                  <Button className="w-full bg-gradient-islamic hover:opacity-90 text-white">
                    {option.title === 'Live Chat' ? 'Start Chat' : 
                     option.title === 'Phone Support' ? 'Call Now' : 'Send Email'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-xl border-0 max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                <option>Select Category</option>
                <option>Booking & Payments</option>
                <option>Visa & Documentation</option>
                <option>Travel & Accommodation</option>
                <option>Religious Guidance</option>
                <option>Technical Support</option>
              </select>
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 resize-none"
              />
              <Button className="w-full bg-gradient-islamic hover:opacity-90 text-white py-3">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* FAQ Categories */}
            <div className="lg:col-span-1">
              <Card className="bg-white shadow-xl border-0">
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search FAQs..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  {/* Categories */}
                  <div className="space-y-2">
                    {faqCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left p-3 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-300'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* FAQ List */}
            <div className="lg:col-span-3 space-y-4">
              {filteredFaqs.map((faq) => (
                <Card key={faq.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                        faq.popular ? 'bg-yellow-100' : 'bg-emerald-100'
                      }`}>
                        {faq.popular ? (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                          {faq.popular && (
                            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportCenter;
