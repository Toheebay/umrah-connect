
import React from 'react';
import { Heart, Mail, Phone, MessageCircle, Facebook, Twitter, Instagram, Linkedin, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: '#',
      color: 'hover:text-blue-600'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: '#',
      color: 'hover:text-sky-500'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: '#',
      color: 'hover:text-pink-600'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: '#',
      color: 'hover:text-blue-700'
    }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = 'Hajj & Umrah Connect - Your Sacred Journey Partner';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
    };

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-emerald-100">
              Hajj & Umrah Connect
            </h3>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Your trusted partner for sacred journeys. Connecting pilgrims with certified agents 
              for memorable and spiritually fulfilling experiences.
            </p>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-100">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-emerald-200">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href="mailto:adebayoajani23@gmail.com" className="hover:text-white transition-colors">
                  adebayoajani23@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-emerald-200">
                <Phone className="w-4 h-4 text-emerald-400" />
                <div className="space-y-1">
                  <a href="tel:+2347067412852" className="block hover:text-white transition-colors">
                    +234 706 741 2852
                  </a>
                  <a href="tel:+2348024764090" className="block hover:text-white transition-colors">
                    +234 802 476 4090
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-emerald-200">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <div className="space-y-1">
                  <a 
                    href="https://wa.me/2347067412852" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:text-white transition-colors"
                  >
                    WhatsApp: +234 706 741 2852
                  </a>
                  <a 
                    href="https://wa.me/2348024764090" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:text-white transition-colors"
                  >
                    WhatsApp: +234 802 476 4090
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Partnerships */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-emerald-100">Connect & Share</h4>
            <p className="text-emerald-200 text-sm">
              Follow us on social media and share with your community
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className={`p-2 bg-emerald-700 rounded-full transition-all hover:bg-emerald-600 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="space-y-2">
              <p className="text-emerald-200 text-sm">Share our platform:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  onClick={() => handleShare('facebook')}
                  size="sm"
                  variant="outline"
                  className="border-emerald-400 text-emerald-100 hover:bg-emerald-700 hover:text-white"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Facebook
                </Button>
                <Button
                  onClick={() => handleShare('twitter')}
                  size="sm"
                  variant="outline"
                  className="border-emerald-400 text-emerald-100 hover:bg-emerald-700 hover:text-white"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Twitter
                </Button>
                <Button
                  onClick={() => handleShare('whatsapp')}
                  size="sm"
                  variant="outline"
                  className="border-emerald-400 text-emerald-100 hover:bg-emerald-700 hover:text-white"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-emerald-200">
              <span>Proudly Powered by</span>
              <span className="font-bold text-emerald-100">toheebay</span>
              <Heart className="w-4 h-4 text-red-400 fill-current" />
            </div>
            
            <div className="text-emerald-200 text-sm text-center">
              <p>© 2024 Hajj & Umrah Connect. All rights reserved.</p>
              <p className="mt-1">For partnerships and project contributions, reach out to us!</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
