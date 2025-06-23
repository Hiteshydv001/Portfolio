
import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { Send, RefreshCw, Sparkles, Zap, Brain, Code, Wand2 } from "lucide-react";
import { Message } from 'ai';

interface ChatInterfaceProps {
  initialMessages?: Message[];
  onMessagesChange?: (messages: Message[]) => void;
}

export const ChatInterface = ({ initialMessages = [], onMessagesChange }: ChatInterfaceProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);
  const streamingMessageRef = useRef<string>('');
  const isUserScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const allHRQuestions = [
    "What kind of projects does Hitesh work on?",
    "Can you tell me more about Hitesh's expertise?",
    "What are some recent developments or updates from Hitesh?",
    "What programming languages is Hitesh proficient in?",
    "How many years of experience does Hitesh have in AI/ML?",
    "What are Hitesh's strongest technical skills?",
    "Can you describe Hitesh's educational background?",
    "What machine learning frameworks has Hitesh worked with?",
    "What are some notable achievements in Hitesh's career?",
    "What type of AI models has Hitesh developed?",
  ];

  const generateRandomQuestions = () => {
    const shuffled = [...allHRQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 3));
  };

  useEffect(() => {
    generateRandomQuestions();
  }, []);

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    if (onMessagesChange) {
      onMessagesChange(messages);
    }
  }, [messages, onMessagesChange]);

  const handleScroll = useCallback(() => {
    isUserScrollingRef.current = true;
    
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrollingRef.current = false;
    }, 1000);
  }, []);

  const scrollToBottom = useCallback(() => {
    if (!isUserScrollingRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const updateStreamingMessage = useCallback((messageId: string, content: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, content }
          : msg
      )
    );
  }, []);

  const sendMessage = async (messageContent: string, isRegenerate = false, messageToRegenerate?: string) => {
    if (!messageContent.trim() || isLoading) return;

    let currentMessages = messages;
    
    if (!isRegenerate) {
      const userMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: messageContent.trim()
      };
      currentMessages = [...messages, userMessage];
      setMessages(currentMessages);
      setInput('');
      generateRandomQuestions();
    } else if (messageToRegenerate) {
      const messageIndex = currentMessages.findIndex(msg => msg.id === messageToRegenerate);
      if (messageIndex !== -1) {
        currentMessages = currentMessages.slice(0, messageIndex);
        setMessages(currentMessages);
      }
    }

    setIsLoading(true);
    streamingMessageRef.current = '';

    try {
      const apiBaseUrl = import.meta.env.VITE_NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-67uz.onrender.com/api/v1';
      const response = await fetch(`${apiBaseUrl}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent.trim(),
          chat_history: currentMessages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ''
      };

      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.trim()) {
            try {
              const jsonString = line.startsWith('data: ') ? line.slice(6) : line;
              const data = JSON.parse(jsonString);
              
              if (data.type === 'text') {
                streamingMessageRef.current += data.data;
                updateStreamingMessage(assistantMessage.id, streamingMessageRef.current);
              } else if (data.type === 'end') {
                break;
              }
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError);
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      streamingMessageRef.current = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    isUserScrollingRef.current = false; // Reset scroll state when sending message
    await sendMessage(input);
  };

  const handleRegenerate = async (messageId: string) => {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.role === 'user') {
        await sendMessage(previousUserMessage.content, true, messageId);
      }
    }
  };

  const quickStarters = [
    { icon: Brain, text: "AI/ML Projects", gradient: "from-purple-500 to-blue-500" },
    { icon: Code, text: "Technical Skills", gradient: "from-emerald-500 to-teal-500" },
    { icon: Zap, text: "Experience", gradient: "from-orange-500 to-red-500" },
    { icon: Sparkles, text: "Achievements", gradient: "from-pink-500 to-purple-500" },
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="border-b border-slate-200/50 bg-white/80 backdrop-blur-xl">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Chat with HiteshBot
                </h1>
                <p className="text-slate-500 mt-1">Ask me anything about Hitesh Kumar's expertise</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-emerald-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-center items-center p-6">
            <div className="max-w-4xl w-full space-y-12">
              {/* Welcome */}
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto shadow-2xl">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-slate-800 mb-4">
                    How can I help you today?
                  </h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    I'm here to provide detailed insights about Hitesh Kumar's background, projects, and expertise in AI/ML.
                  </p>
                </div>
              </div>

              {/* Quick Starters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickStarters.map((starter, index) => (
                  <Button
                    key={index}
                    onClick={() => sendMessage(`Tell me about Hitesh's ${starter.text.toLowerCase()}`)}
                    variant="ghost"
                    className="h-24 flex-col gap-3 bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:bg-white/80 hover:border-slate-300/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${starter.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <starter.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-slate-700">{starter.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col">
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto p-6"
            >
              <div className="max-w-4xl mx-auto">
                <ChatMessages messages={messages} onRegenerate={handleRegenerate} isLoading={isLoading} />
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Compact HR Questions */}
            {currentQuestions.length > 0 && (
              <div className="border-t border-slate-200/50 bg-white/80 backdrop-blur-xl py-2">
                <div className="max-w-4xl mx-auto px-6">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                      Suggested Questions
                    </h3>
                    <Button
                      onClick={generateRandomQuestions}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-slate-600 rounded-lg px-2 py-1 text-xs h-5"
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Refresh
                    </Button>
                  </div>
                  <div className="flex gap-1 overflow-x-auto">
                    {currentQuestions.map((question, index) => (
                      <Button
                        key={index}
                        onClick={() => sendMessage(question)}
                        variant="ghost"
                        className="flex-shrink-0 h-7 px-2 py-1 bg-slate-50/50 hover:bg-slate-100/50 rounded-lg border border-slate-200/50 text-left text-xs whitespace-nowrap"
                      >
                        <span className="text-slate-600">→ {question}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200/50 bg-white/90 backdrop-blur-xl p-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end gap-4 p-4 bg-white rounded-3xl border border-slate-200/50 shadow-lg shadow-slate-900/5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="hover:bg-slate-100 rounded-2xl p-3"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  H
                </div>
              </Button>
              
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 border-0 bg-transparent text-slate-800 placeholder:text-slate-400 focus:ring-0 focus:outline-none text-base p-0"
              />
              
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="hover:bg-slate-100 rounded-2xl p-3"
                >
                  <Wand2 className="w-5 h-5 text-slate-500" />
                </Button>
                
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl p-3 shadow-lg disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </form>

          {isLoading && (
            <div className="mt-4 flex items-center justify-center gap-3 text-slate-500">
              <div className="flex gap-1">
                <div className="animate-bounce w-2 h-2 bg-blue-400 rounded-full"></div>
                <div className="animate-bounce w-2 h-2 bg-purple-400 rounded-full delay-100"></div>
                <div className="animate-bounce w-2 h-2 bg-pink-400 rounded-full delay-200"></div>
              </div>
              <span className="text-sm font-medium">HiteshBot is thinking...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
