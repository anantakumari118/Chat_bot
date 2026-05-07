import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, FileQuestion, FileText, Users, CheckCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import type { LearningAction } from '@/types';
import Button from '@/components/ui/Button';

interface LearningActionButtonsProps {
  actions: LearningAction[];
  onActionClick: (action: LearningAction) => void;
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

const LearningActionButtons: React.FC<LearningActionButtonsProps> = ({
  actions,
  onActionClick,
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn('flex flex-wrap gap-2', className)}
    >
      {actions.map((action) => {
        const IconComponent = iconMap[action.icon as keyof typeof iconMap] || Lightbulb;
        
        return (
          <motion.div
            key={action.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() => onActionClick(action)}
              className="flex items-center gap-2 h-8 px-3"
              title={action.description}
            >
              <IconComponent className="h-3 w-3" />
              <span className="text-xs">{action.label}</span>
            </Button>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default LearningActionButtons;
