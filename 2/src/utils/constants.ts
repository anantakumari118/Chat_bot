export const LEARNING_CATEGORIES = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'Code',
    color: 'blue',
    description: 'Learn programming languages and concepts'
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    icon: 'Cloud',
    color: 'cyan',
    description: 'Master AWS, Azure, GCP and cloud concepts'
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: 'Brain',
    color: 'purple',
    description: 'Explore AI, ML and deep learning'
  },
  {
    id: 'devops',
    name: 'DevOps',
    icon: 'Settings',
    color: 'green',
    description: 'Learn CI/CD, containers and infrastructure'
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    icon: 'Shield',
    color: 'red',
    description: 'Understand security concepts and practices'
  },
  {
    id: 'webdev',
    name: 'Web Development',
    icon: 'Globe',
    color: 'orange',
    description: 'Build modern web applications'
  }
] as const;

export const SUGGESTED_PROMPTS = [
  {
    id: '1',
    text: 'Explain this concept like I\'m a beginner',
    category: 'learning',
    icon: 'BookOpen'
  },
  {
    id: '2',
    text: 'Show me a practical example',
    category: 'example',
    icon: 'Lightbulb'
  },
  {
    id: '3',
    text: 'Generate practice questions',
    category: 'practice',
    icon: 'FileQuestion'
  },
  {
    id: '4',
    text: 'Create a summary of this topic',
    category: 'summary',
    icon: 'FileText'
  },
  {
    id: '5',
    text: 'Generate interview questions',
    category: 'interview',
    icon: 'Users'
  },
  {
    id: '6',
    text: 'Create a quick quiz',
    category: 'quiz',
    icon: 'CheckCircle'
  }
] as const;

export const LEARNING_ACTIONS = [
  {
    id: 'explain',
    label: 'Explain Like Beginner',
    icon: 'BookOpen',
    action: 'explain' as const,
    description: 'Get a simplified explanation'
  },
  {
    id: 'example',
    label: 'Show Example',
    icon: 'Lightbulb',
    action: 'example' as const,
    description: 'See a practical example'
  },
  {
    id: 'practice',
    label: 'Practice Question',
    icon: 'FileQuestion',
    action: 'practice' as const,
    description: 'Generate practice questions'
  },
  {
    id: 'summarize',
    label: 'Summarize Topic',
    icon: 'FileText',
    action: 'summarize' as const,
    description: 'Get a concise summary'
  },
  {
    id: 'interview',
    label: 'Interview Questions',
    icon: 'Users',
    action: 'interview' as const,
    description: 'Prepare for interviews'
  },
  {
    id: 'quiz',
    label: 'Generate Quiz',
    icon: 'CheckCircle',
    action: 'quiz' as const,
    description: 'Test your knowledge'
  }
] as const;

export const DEFAULT_CONFIG = {
  apiUrl: 'http://localhost:3001/api/chat',
  model: 'gpt-4',
  maxTokens: 2000,
  temperature: 0.7,
  streaming: true,
  systemPrompt: 'You are an expert AI tutor specializing in IT education. Provide clear, accurate, and educational responses tailored to students learning programming, cloud computing, AI, DevOps, cybersecurity, and web development.'
} as const;

export const KEYBOARD_SHORTCUTS = {
  SEND: 'Enter',
  NEW_LINE: 'Shift+Enter',
  FOCUS_INPUT: '/',
  TOGGLE_SIDEBAR: 'Ctrl+B',
  NEW_CHAT: 'Ctrl+N',
  SEARCH: 'Ctrl+K',
  CLEAR_CHAT: 'Ctrl+L'
} as const;

export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500
} as const;
