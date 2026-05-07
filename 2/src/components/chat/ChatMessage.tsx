import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { Copy, RefreshCw, ThumbsUp, ThumbsDown, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { formatTimestamp } from '@/utils/formatters';
import type { Message } from '@/types';
import Button from '@/components/ui/Button';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  onCopy?: (content: string) => void;
  onRegenerate?: (messageId: string) => void;
  onFeedback?: (messageId: string, feedback: 'up' | 'down') => void;
  className?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isStreaming = false,
  onCopy,
  onRegenerate,
  onFeedback,
  className,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [showActions, setShowActions] = React.useState(false);
  const isDark = document.documentElement.classList.contains('dark');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      onCopy?.(message.content);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleRegenerate = () => {
    onRegenerate?.(message.id);
  };

  const handleFeedback = (feedback: 'up' | 'down') => {
    onFeedback?.(message.id, feedback);
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const isUser = message.role === 'user';

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      className={cn(
        'group flex gap-3 p-4 transition-colors hover:bg-muted/30',
        isUser && 'flex-row-reverse',
        className
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full',
        isUser 
          ? 'bg-primary text-primary-foreground' 
          : 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
      )}>
        {isUser ? (
          <span className="text-sm font-medium">U</span>
        ) : (
          <span className="text-sm font-medium">AI</span>
        )}
      </div>

      {/* Message Content */}
      <div className={cn('flex-1 space-y-2', isUser && 'text-right')}>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{isUser ? 'You' : 'AI Assistant'}</span>
          <span>•</span>
          <span>{formatTimestamp(message.timestamp)}</span>
          {message.metadata?.tokens && (
            <>
              <span>•</span>
              <span>{message.metadata.tokens} tokens</span>
            </>
          )}
        </div>

        <div
          className={cn(
            'chat-bubble',
            isUser ? 'user-message' : 'assistant-message'
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    
                    if (!inline && language) {
                      return (
                        <div className="relative group">
                          <SyntaxHighlighter
                            style={isDark ? oneDark : oneLight}
                            language={language}
                            PreTag="div"
                            className="rounded-md"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => navigator.clipboard.writeText(String(children))}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      );
                    }
                    
                    return (
                      <code className={cn('bg-muted px-1 py-0.5 rounded text-sm', className)} {...props}>
                        {children}
                      </code>
                    );
                  },
                  pre({ children }) {
                    return <>{children}</>;
                  },
                }}
              >
                {message.content}
                {isStreaming && (
                  <span className="inline-block w-2 h-4 bg-muted-foreground animate-pulse ml-1" />
                )}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Message Actions */}
        {!isUser && showActions && !isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8 px-2"
            >
              <Copy className={cn('h-4 w-4', copied && 'text-green-600')} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRegenerate}
              className="h-8 px-2"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback('up')}
              className="h-8 px-2"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback('down')}
              className="h-8 px-2"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
