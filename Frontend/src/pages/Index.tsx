
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { Message } from 'ai';

interface Conversation {
  id: number;
  title: string;
  time: string;
  active: boolean;
  messages: Message[];
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 1, title: "What are Hitesh's AI/ML projects?", time: "2 min ago", active: true, messages: [] },
    { id: 2, title: "Tell me about technical skills", time: "5 min ago", active: false, messages: [] },
    { id: 3, title: "Hitesh's programming experience", time: "1 hour ago", active: false, messages: [] },
    { id: 4, title: "AI expertise and background", time: "2 hours ago", active: false, messages: [] },
    { id: 5, title: "Machine learning frameworks", time: "Yesterday", active: false, messages: [] },
    { id: 6, title: "Career achievements overview", time: "2 days ago", active: false, messages: [] },
    { id: 7, title: "Educational background details", time: "3 days ago", active: false, messages: [] },
    { id: 8, title: "Cloud platform experience", time: "Last week", active: false, messages: [] },
  ]);

  const activeConversation = conversations.find(conv => conv.active);

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now(),
      title: "New conversation",
      time: "now",
      active: true,
      messages: []
    };
    
    setConversations(prev => [
      newConversation,
      ...prev.map(conv => ({ ...conv, active: false }))
    ]);
  };

  const handleSelectConversation = (id: number) => {
    setConversations(prev => 
      prev.map(conv => ({ 
        ...conv, 
        active: conv.id === id 
      }))
    );
  };

  const handleDeleteConversation = (id: number) => {
    setConversations(prev => {
      const filtered = prev.filter(conv => conv.id !== id);
      
      if (prev.find(conv => conv.id === id)?.active && filtered.length > 0) {
        filtered[0].active = true;
      }
      
      return filtered;
    });
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all conversations?")) {
      setConversations([]);
    }
  };

  const updateConversationMessages = (conversationId: number, messages: Message[]) => {
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, messages, title: messages.length > 0 && messages[0].role === 'user' ? messages[0].content.slice(0, 30) + '...' : conv.title }
          : conv
      )
    );
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex overflow-hidden">
      <Sidebar 
        isOpen={isSidebarOpen} 
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        conversations={conversations}
        onNewChat={handleNewChat}
        onSelectConversation={handleSelectConversation}
        onDeleteConversation={handleDeleteConversation}
        onClearAll={handleClearAll}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <ChatInterface 
          key={activeConversation?.id}
          initialMessages={activeConversation?.messages || []}
          onMessagesChange={(messages) => activeConversation && updateConversationMessages(activeConversation.id, messages)}
        />
      </div>
    </div>
  );
};

export default Index;
