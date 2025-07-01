
import React, { useState } from 'react';
import { Share2, Facebook, Twitter, MessageCircle, Copy, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, description, url = window.location.href }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${url}`)}`,
      color: 'bg-green-600 hover:bg-green-700'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
      >
        <Share2 className="w-4 h-4 mr-1" />
        Share
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 p-4">
          <div className="mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">Share this Agent</h4>
            <p className="text-sm text-gray-600">{description}</p>
          </div>

          <div className="space-y-2 mb-4">
            {shareLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShare(link.url)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-white transition-colors ${link.color}`}
              >
                <link.icon className="w-4 h-4" />
                <span className="font-medium">Share on {link.name}</span>
              </button>
            ))}
          </div>

          <div className="border-t pt-3">
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {copied ? (
                <CheckCircle className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              <span className="font-medium">
                {copied ? 'Link Copied!' : 'Copy Link'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialShare;
