import { useEffect, useRef, useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import TopHeader from './components/layout/TopHeader';
import ChatMessage from './components/chat/ChatMessage';
import ChatInput from './components/chat/ChatInput';
import { useChatStore } from './store/useChatStore';
import { chatService } from './services/chatService';
import { AnimatePresence } from 'framer-motion';

function App() {
  const { messages, addMessage, isLoading, setLoading } = useChatStore();
  const [streamingContent, setStreamingContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingContent]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({ role: 'user', content });
    
    setLoading(true);
    setStreamingContent('');
    
    try {
      let fullResponse = '';
      const stream = chatService.streamMessage(content);
      
      for await (const chunk of stream) {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      }
      
      addMessage({ role: 'assistant', content: fullResponse });
      setStreamingContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#050505] text-foreground overflow-hidden dark">
      <Sidebar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

        <TopHeader />

        <div className="flex-1 overflow-y-auto px-4 md:px-12 py-8 scrollbar-hide">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              
              {streamingContent && (
                <ChatMessage 
                  message={{ 
                    id: 'streaming', 
                    role: 'assistant', 
                    content: streamingContent, 
                    timestamp: new Date() 
                  }} 
                  isStreaming={true}
                />
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} className="h-4" />
          </div>
        </div>

        <ChatInput onSend={handleSendMessage} isLoading={isLoading} />
      </main>
    </div>
  );
}

export default App;
