import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, FileQuestion, FileText, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { SuggestedPrompt } from '@/types';
import Button from '@/components/ui/Button';

interface SuggestedPromptsProps {
  prompts: SuggestedPrompt[];
  onPromptClick: (prompt: string) => void;
  className?: string;
}

const iconMap = {
  BookOpen,
  Lightbulb,
  FileQuestion,
  FileText,
  Users,
  CheckCircle,
};

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  prompts,
  onPromptClick,
  className,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('space-y-2', className)}
    >
      <h3 className="text-sm font-medium text-muted-foreground mb-3">
        Quick Actions
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {prompts.map((prompt, index) => {
          const IconComponent = iconMap[prompt.icon as keyof typeof iconMap] || Lightbulb;
          
          return (
            <motion.div
              key={prompt.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="outline"
                className="h-auto p-3 justify-start text-left flex-col items-start gap-2 w-full"
                onClick={() => onPromptClick(prompt.text)}
              >
                <div className="flex items-center gap-2 w-full">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm">
                    {prompt.text.split(' ').slice(0, 3).join(' ')}
                    {prompt.text.split(' ').length > 3 && '...'}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">
                  {prompt.text}
                </span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SuggestedPrompts;
