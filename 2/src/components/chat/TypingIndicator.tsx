import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface TypingIndicatorProps {
  className?: string;
  text?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  className,
  text = "AI is thinking"
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const dotVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 200,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('flex gap-3 p-4', className)}
    >
      {/* AI Avatar */}
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <span className="text-sm font-medium">AI</span>
      </div>

      {/* Typing Content */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{text}</span>
        <div className="flex gap-1">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              variants={dotVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delay: index * 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.5,
              }}
              className="w-2 h-2 bg-muted-foreground rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
