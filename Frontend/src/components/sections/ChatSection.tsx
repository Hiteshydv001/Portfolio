import { useState, useRef, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessages } from "@/components/chat/ChatMessages";
import { Send, Plus, Code, Brain, Rocket, Zap, Sparkles, Stars, RefreshCw } from "lucide-react";
import { Message } from 'ai';

export const ChatSection = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);

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
    "How does Hitesh approach problem-solving in projects?",
    "What industries has Hitesh worked in?",
    "What are Hitesh's leadership and collaboration skills like?",
    "Can you provide examples of Hitesh's innovative solutions?",
    "What certifications or training does Hitesh have in AI/ML?",
    "How does Hitesh stay updated with latest AI/ML trends?",
    "What is Hitesh's experience with cloud platforms?",
    "Can you describe Hitesh's project management approach?",
    "What are Hitesh's career goals and aspirations?",
    "How does Hitesh handle challenging technical problems?"
  ];

  const conversationStarters = [
    { icon: Brain, text: "Tell me about Hitesh's AI/ML projects", category: "AI Expertise", gradient: "from-emerald-500 to-teal-500" },
    { icon: Code, text: "What are Hitesh's technical skills?", category: "Skills", gradient: "from-blue-500 to-indigo-500" },
    { icon: Rocket, text: "Show me Hitesh's coding experience", category: "Experience", gradient: "from-violet-500 to-purple-500" },
    { icon: Zap, text: "What's Hitesh's background in AI?", category: "Background", gradient: "from-orange-500 to-pink-500" },
  ];

  const generateRandomQuestions = () => {
    const shuffled = [...allHRQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 3));
  };

  useEffect(() => {
    generateRandomQuestions();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      
      // Generate new questions after each user message
      generateRandomQuestions();
    } else if (messageToRegenerate) {
      const messageIndex = currentMessages.findIndex(msg => msg.id === messageToRegenerate);
      if (messageIndex !== -1) {
        currentMessages = currentMessages.slice(0, messageIndex);
        setMessages(currentMessages);
      }
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'}/chat`, {
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
              console.log('Parsing JSON:', jsonString);
              
              const data = JSON.parse(jsonString);
              console.log('Parsed data:', data);
              
              if (data.type === 'text') {
                assistantMessage.content += data.data;
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: assistantMessage.content }
                      : msg
                  )
                );
              } else if (data.type === 'end') {
                console.log('Stream ended');
                break;
              }
            } catch (parseError) {
              console.error('Error parsing JSON:', parseError, 'Line:', line);
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  const handleStarterClick = (text: string) => {
    sendMessage(text);
  };

  return (
    <section id="chat-section" className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Updated background with warmer colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900/50 to-slate-900">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Floating particles with warmer colors */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-emerald-300/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 relative z-10">
        {/* Enhanced Header with warmer colors */}
        <div className="py-12">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-6 group">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Sparkles className="w-8 h-8 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full flex items-center justify-center animate-bounce">
                  <Stars className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
                  HiteshBot
                </h1>
                <p className="text-slate-300 text-base mt-2 font-medium">AI Assistant Powered by Advanced Intelligence</p>
                <div className="flex items-center justify-center mt-2 gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-emerald-400 text-xs font-medium">Online & Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages or Welcome */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center space-y-16 py-12">
              {/* Welcome Message with updated colors */}
              <div className="text-center space-y-6 max-w-3xl animate-fade-in-up">
                <div className="relative">
                  <h2 className="text-5xl font-bold text-white mb-6 relative z-10">
                    How can I help you today?
                  </h2>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-2xl -z-10"></div>
                </div>
                <p className="text-slate-200 text-xl leading-relaxed">
                  Ask me anything about Hitesh Kumar's background, projects, or expertise in AI/ML.
                  I'm here to provide detailed insights and information.
                </p>
              </div>

              {/* Enhanced Input Area with updated colors */}
              <div className="w-full max-w-4xl">
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message to HiteshBot..."
                      disabled={isLoading}
                      className="w-full bg-transparent border-0 text-white placeholder-slate-400 rounded-3xl py-8 px-8 pr-24 text-lg focus:ring-0 focus:outline-none relative z-10"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 z-10">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-700/50 p-3 rounded-2xl transition-all duration-200 hover:scale-110"
                      >
                        <Plus className="w-5 h-5" />
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white rounded-2xl p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 hover:shadow-emerald-500/50"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </form>
              </div>

              {/* Updated Conversation Starters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl w-full">
                {conversationStarters.map((starter, index) => (
                  <Button
                    key={index}
                    onClick={() => handleStarterClick(starter.text)}
                    variant="ghost"
                    className="bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 text-slate-200 hover:text-white hover:bg-slate-700/70 rounded-2xl p-6 text-left h-auto flex items-center gap-4 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${starter.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <starter.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="font-medium text-lg">{starter.category}</span>
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto py-8 chat-scrollbar">
                <ChatMessages messages={messages} onRegenerate={handleRegenerate} isLoading={isLoading} />
                <div ref={messagesEndRef} />
              </div>

              {/* HR Question Suggestions with updated colors */}
              {currentQuestions.length > 0 && (
                <div className="py-4 border-t border-slate-700/50">
                  <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-slate-200 font-medium">HR Questions to ask about Hitesh:</h3>
                      <Button
                        onClick={generateRandomQuestions}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg px-3 py-1.5 text-sm flex items-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Generate
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {currentQuestions.map((question, index) => (
                        <Button
                          key={index}
                          onClick={() => handleStarterClick(question)}
                          variant="ghost"
                          className="w-full text-left justify-start bg-slate-800/40 hover:bg-slate-700/60 text-slate-200 hover:text-white border border-slate-600/30 rounded-lg p-3 text-sm transition-all duration-200"
                        >
                          → {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Enhanced Input at bottom with updated colors */}
              <div className="py-8 border-t border-slate-700/50 backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto group">
                  <div className="relative bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-600/50 rounded-3xl shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Continue the conversation..."
                      disabled={isLoading}
                      className="w-full bg-transparent border-0 text-white placeholder-slate-400 rounded-3xl py-6 px-8 pr-20 text-base focus:ring-0 focus:outline-none relative z-10"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !input.trim()}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 hover:from-emerald-600 hover:via-teal-600 hover:to-blue-600 text-white rounded-2xl p-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 hover:shadow-emerald-500/50 z-10"
                    >
                      {isLoading ? (
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </form>

                {isLoading && (
                  <div className="mt-6 flex items-center justify-center gap-4 text-slate-300">
                    <div className="flex gap-2">
                      <div className="animate-bounce w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"></div>
                      <div className="animate-bounce w-3 h-3 bg-gradient-to-r from-teal-400 to-blue-400 rounded-full delay-100"></div>
                      <div className="animate-bounce w-3 h-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full delay-200"></div>
                    </div>
                    <span className="text-base font-medium bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      HiteshBot is thinking...
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
