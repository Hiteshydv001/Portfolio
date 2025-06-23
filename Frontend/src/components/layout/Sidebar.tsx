
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Plus, 
  MessageSquare, 
  Settings, 
  Trash2, 
  Menu,
  X,
  Sparkles,
  Clock,
  Zap
} from "lucide-react";
import { Message } from 'ai';

interface Conversation {
  id: number;
  title: string;
  time: string;
  active: boolean;
  messages: Message[];
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  onNewChat: () => void;
  onSelectConversation: (id: number) => void;
  onDeleteConversation: (id: number) => void;
  onClearAll: () => void;
}

export const Sidebar = ({ 
  isOpen, 
  onToggle, 
  conversations, 
  onNewChat, 
  onSelectConversation, 
  onDeleteConversation, 
  onClearAll 
}: SidebarProps) => {
  const handleSettings = () => {
    console.log("Opening settings");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl border-r border-slate-200/50 
        transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        shadow-2xl shadow-slate-900/10
      `}>
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HiteshBot
                </h1>
                <p className="text-xs text-slate-500">AI Assistant</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden hover:bg-slate-100 rounded-xl"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={onNewChat}
            className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl h-12 font-medium shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Your Conversations</h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-slate-400 hover:text-slate-600 rounded-lg"
                onClick={onClearAll}
              >
                Clear All
              </Button>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-280px)] px-4">
            <div className="space-y-2">
              {conversations.length === 0 ? (
                <div className="text-center py-8 text-slate-500">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No conversations yet</p>
                  <p className="text-xs">Start a new chat to begin</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`
                      group relative p-4 rounded-2xl cursor-pointer transition-all duration-200
                      ${conv.active 
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 shadow-sm' 
                        : 'hover:bg-slate-50 border border-transparent'
                      }
                    `}
                    onClick={() => onSelectConversation(conv.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0
                        ${conv.active 
                          ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white' 
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                        }
                      `}>
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`
                          text-sm font-medium line-clamp-2 leading-tight
                          ${conv.active ? 'text-slate-800' : 'text-slate-700'}
                        `}>
                          {conv.title}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="text-xs text-slate-500">{conv.time}</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 h-auto w-auto hover:bg-red-50 hover:text-red-500 rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteConversation(conv.id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200/50 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white font-semibold">
                H
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-slate-800">Hitesh Kumar</p>
              <p className="text-xs text-slate-500">AI/ML Engineer</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:bg-slate-100 rounded-xl"
              onClick={handleSettings}
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200/50">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-emerald-700">Online & Ready</p>
              <p className="text-xs text-emerald-600">Powered by AI</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile toggle button */}
      {!isOpen && (
        <Button
          onClick={onToggle}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white/90 backdrop-blur-sm border border-slate-200 hover:bg-white shadow-lg rounded-xl"
          variant="ghost"
          size="sm"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </Button>
      )}
    </>
  );
};
