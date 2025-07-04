
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';

interface ChatNavigatorProps {
  onScrollToTop: () => void;
  onScrollToBottom: () => void;
  onScrollUp: () => void;
  onScrollDown: () => void;
}

const ChatNavigator: React.FC<ChatNavigatorProps> = ({
  onScrollToTop,
  onScrollToBottom,
  onScrollUp,
  onScrollDown
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200">
        <div className="flex flex-col space-y-1">
          <Button
            onClick={onScrollToTop}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-emerald-100"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-emerald-600" />
          </Button>
          
          <Button
            onClick={onScrollUp}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-emerald-100"
            title="Scroll up"
          >
            <ChevronUp className="w-4 h-4 text-emerald-600" />
          </Button>
          
          <Button
            onClick={onScrollDown}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-emerald-100"
            title="Scroll down"
          >
            <ChevronDown className="w-4 h-4 text-emerald-600" />
          </Button>
          
          <Button
            onClick={onScrollToBottom}
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-emerald-100"
            title="Scroll to bottom"
          >
            <ArrowDown className="w-4 h-4 text-emerald-600" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatNavigator;
