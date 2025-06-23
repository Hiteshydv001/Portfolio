
import { ChatMessage } from "./ChatMessage";
import { Message } from 'ai';

interface ChatMessagesProps {
  messages: Message[];
  onRegenerate?: (messageId: string) => void;
  isLoading?: boolean;
}

export const ChatMessages = ({ messages, onRegenerate, isLoading }: ChatMessagesProps) => {
  return (
    <div className="space-y-8">
      {messages.map((message, index) => (
        <ChatMessage 
          key={message.id} 
          message={message} 
          onRegenerate={onRegenerate}
          showRegenerate={
            message.role === 'assistant' && 
            index === messages.length - 1 && 
            !isLoading &&
            message.id !== 'welcome'
          }
        />
      ))}
    </div>
  );
};
