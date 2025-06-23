
import { Message } from 'ai';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, RotateCcw, Sparkles, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: Message;
  onRegenerate?: (messageId: string) => void;
  showRegenerate?: boolean;
}

export const ChatMessage = ({ message, onRegenerate, showRegenerate }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  const handleLike = () => {
    console.log('Liked message:', message.id);
    // You can add actual like functionality here
  };

  const handleDislike = () => {
    console.log('Disliked message:', message.id);
    // You can add actual dislike functionality here
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      console.log('Message copied to clipboard');
      // You can add a toast notification here
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };
  
  return (
    <div className={`group mb-8 ${isUser ? '' : 'bg-slate-50/50 -mx-6 px-6 py-6 rounded-2xl'}`}>
      <div className="flex gap-4">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarFallback className={`${
            isUser 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
              : 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'
          } text-white text-sm font-semibold`}>
            {isUser ? <User className="w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="mb-3">
            <span className="text-sm font-semibold text-slate-700">
              {isUser ? 'You' : 'HiteshBot'}
            </span>
            <span className="text-xs text-slate-400 ml-2">
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <div className="text-slate-800">
            {isUser ? (
              <p className="text-base leading-relaxed font-medium">{message.content}</p>
            ) : (
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-4 last:mb-0 text-base leading-relaxed text-slate-800">{children}</p>,
                    code: ({ children }) => (
                      <code className="bg-slate-200 px-2 py-1 rounded-lg text-sm font-mono text-slate-700">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="bg-slate-800 text-slate-100 p-4 rounded-xl overflow-x-auto my-4 border border-slate-300">
                        {children}
                      </pre>
                    ),
                    ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-base text-slate-800">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 text-base text-slate-800">{children}</ol>,
                    strong: ({ children }) => <strong className="text-slate-900 font-bold">{children}</strong>,
                    h1: ({ children }) => <h1 className="text-xl font-bold text-slate-900 mb-4 mt-6 first:mt-0">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-bold text-slate-900 mb-3 mt-5">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-bold text-slate-900 mb-2 mt-4">{children}</h3>,
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </div>
            )}
          </div>
          
          {!isUser && (
            <div className="flex items-center gap-1 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl px-3 py-1.5 text-sm h-auto"
              >
                <ThumbsUp className="w-3 h-3 mr-1.5" />
                Like
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDislike}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl px-3 py-1.5 text-sm h-auto"
              >
                <ThumbsDown className="w-3 h-3 mr-1.5" />
                Dislike
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl px-3 py-1.5 text-sm h-auto"
              >
                <Copy className="w-3 h-3 mr-1.5" />
                Copy
              </Button>
              {showRegenerate && onRegenerate && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRegenerate(message.id)}
                  className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl px-3 py-1.5 text-sm h-auto"
                >
                  <RotateCcw className="w-3 h-3 mr-1.5" />
                  Regenerate
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
