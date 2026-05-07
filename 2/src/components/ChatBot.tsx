import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Maximize2, Minimize2 } from 'lucide-react';
import { useChatStore } from '@/store/chatStore';
import { chatService } from '@/services/chatService';
import ChatLayout from '@/layouts/ChatLayout';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import TypingIndicator from '@/components/chat/TypingIndicator';
import SuggestedPrompts from '@/components/learning/SuggestedPrompts';
import LearningActionButtons from '@/components/learning/LearningActionButtons';
import { cn } from '@/utils/cn';
import { generateId } from '@/utils/formatters';
import type { Message, LearningAction } from '@/types';
import Button from '@/components/ui/Button';

interface ChatBotProps {
  mode?: 'floating' | 'full-page';
  apiUrl?: string;
  apiKey?: string;
  className?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({
  mode = 'full-page',
  apiUrl,
  apiKey,
  className,
}) => {
  const {
    currentConversation,
    isLoading,
    isTyping,
    error,
    sidebarOpen,
    suggestedPrompts,
    learningActions,
    setCurrentConversation,
    createNewConversation,
    addMessage,
    updateMessage,
    setLoading,
    setTyping,
    setError,
    setMode,
  } = useChatStore();

  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(mode === 'floating');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingMessageRef = useRef<string>('');

  useEffect(() => {
    setMode(mode);
    if (apiUrl) {
      chatService.updateConfig({ apiUrl });
    }
    if (apiKey) {
      chatService.updateConfig({ apiKey });
    }
  }, [mode, apiUrl, apiKey, setMode]);

  useEffect(() => {
    if (!currentConversation) {
      createNewConversation();
    }
  }, [currentConversation, createNewConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [currentConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (message: string) => {
    if (!currentConversation) return;

    const userMessage: Message = {
      id: generateId(),
      content: message,
      role: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    addMessage(currentConversation.id, userMessage);
    setLoading(true);
    setTyping(true);
    setShowSuggestions(false);
    setError(null);

    try {
      // Create placeholder for AI response
      const aiMessageId = generateId();
      const aiMessage: Message = {
        id: aiMessageId,
        content: '',
        role: 'assistant',
        timestamp: new Date(),
        status: 'sending',
      };

      addMessage(currentConversation.id, aiMessage);

      // Stream the response
      let fullResponse = '';
      const stream = chatService.sendMessageStream(message, currentConversation.messages);

      for await (const chunk of stream) {
        fullResponse += chunk;
        updateMessage(currentConversation.id, aiMessageId, {
          content: fullResponse,
          status: 'sent',
        });
      }

      // Final update
      updateMessage(currentConversation.id, aiMessageId, {
        content: fullResponse,
        status: 'sent',
        metadata: {
          tokens: Math.floor(fullResponse.length / 4),
        },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const handleCopy = (content: string) => {
    // Copy feedback could be shown here
  };

  const handleRegenerate = async (messageId: string) => {
    if (!currentConversation) return;

    const messageIndex = currentConversation.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return;

    const message = currentConversation.messages[messageIndex];
    if (message.role !== 'assistant') return;

    // Find the user message that prompted this response
    const userMessage = currentConversation.messages
      .slice(0, messageIndex)
      .reverse()
      .find(msg => msg.role === 'user');

    if (userMessage) {
      // Remove the assistant message and regenerate
      const updatedMessages = currentConversation.messages.filter(msg => msg.id !== messageId);
      updateMessage(currentConversation.id, messageId, { content: '' });
      
      // Resend the user message to get a new response
      await handleSendMessage(userMessage.content);
    }
  };

  const handleFeedback = (messageId: string, feedback: 'up' | 'down') => {
    // Handle feedback logic here
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  const handleLearningAction = async (action: LearningAction) => {
    if (!currentConversation) return;

    const actionPrompts = {
      explain: "Explain the previous concept like I'm a complete beginner",
      example: "Show me a practical example of what we just discussed",
      practice: "Generate some practice questions based on our conversation",
      summarize: "Summarize the key points from our conversation",
      interview: "Create interview questions based on this topic",
      quiz: "Generate a quick quiz to test my understanding",
    };

    const prompt = actionPrompts[action.action];
    if (prompt) {
      await handleSendMessage(prompt);
    }
  };

  const handleNewChat = () => {
    createNewConversation();
    setShowSuggestions(true);
  };

  // Floating mode rendering
  if (mode === 'floating') {
    return (
      <div className={cn('fixed bottom-4 right-4 z-50', className)}>
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="mb-4 h-96 w-80 rounded-lg border bg-card shadow-lg"
            >
              <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b p-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="font-medium">AI Assistant</span>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(true)}
                      className="h-6 w-6 p-0"
                    >
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3">
                  {currentConversation?.messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      message={message}
                      onCopy={handleCopy}
                      onRegenerate={handleRegenerate}
                      onFeedback={handleFeedback}
                      className="mb-3"
                    />
                  ))}
                  {isTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <ChatInput
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={handleSendMessage}
                  disabled={isLoading}
                  suggestions={showSuggestions ? suggestedPrompts.slice(0, 3).map(p => p.text) : []}
                  onSuggestionClick={handleSuggestionClick}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Button */}
        <AnimatePresence>
          {isMinimized && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Button
                onClick={() => setIsMinimized(false)}
                className="h-14 w-14 rounded-full shadow-lg"
              >
                <MessageSquare className="h-6 w-6" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Full page mode rendering
  return (
    <ChatLayout className={className}>
      {/* Sidebar */}
      <div className="flex h-full flex-col">
        <div className="p-4 border-b">
          <Button onClick={handleNewChat} className="w-full">
            New Chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Recent Conversations
          </h3>
          {/* Conversation list would go here */}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex h-full flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-4xl mx-auto">
            {currentConversation?.messages.length === 0 && showSuggestions && (
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold mb-2">Hello! I'm your AI Learning Assistant</h1>
                  <p className="text-muted-foreground">
                    I can help you learn programming, cloud computing, AI, and more. Ask me anything!
                  </p>
                </div>
                
                <SuggestedPrompts
                  prompts={suggestedPrompts}
                  onPromptClick={handleSuggestionClick}
                  className="mb-6"
                />
              </div>
            )}

            {currentConversation?.messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                isStreaming={message.status === 'sending'}
                onCopy={handleCopy}
                onRegenerate={handleRegenerate}
                onFeedback={handleFeedback}
              />
            ))}

            {isTyping && <TypingIndicator />}

            {currentConversation && currentConversation.messages.length > 0 && (
              <div className="p-4">
                <LearningActionButtons
                  actions={learningActions}
                  onActionClick={handleLearningAction}
                />
              </div>
            )}

            {error && (
              <div className="p-4 text-center text-destructive">
                {error}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input */}
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSendMessage}
          disabled={isLoading}
          suggestions={showSuggestions && currentConversation?.messages.length === 0 
            ? suggestedPrompts.slice(0, 4).map(p => p.text) 
            : []
          }
          onSuggestionClick={handleSuggestionClick}
        />
      </div>
    </ChatLayout>
  );
};

export default ChatBot;
