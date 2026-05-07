# Educational AI Chatbot Interface

A modern, production-ready AI chatbot interface designed specifically for IT education platforms. Built with React, TypeScript, and Tailwind CSS, this component provides an exceptional learning experience for students studying programming, cloud computing, AI, DevOps, cybersecurity, and web development.

## Features

### 🎯 Student-Centric Design
- **Smart Learning Features**: Suggested prompts, quick question chips, and contextual learning actions
- **Educational Response Cards**: Support for notes, code snippets, terminal commands, warnings, and learning tips
- **Interactive Learning**: "Explain Like Beginner", "Show Example", "Generate Practice Questions", and more

### 💬 Premium Chat Experience
- **Modern UI**: Inspired by ChatGPT, Claude, Perplexity, and Cursor AI
- **Rich Content Support**: Markdown rendering, syntax-highlighted code blocks, copy functionality
- **Streaming Responses**: Real-time message streaming with typing indicators
- **Message Actions**: Copy, regenerate, feedback, and more

### 🎨 Beautiful & Responsive
- **Glassmorphism Design**: Modern, clean aesthetic with subtle animations
- **Mobile Optimized**: Flawless experience on desktop, tablet, and mobile
- **Theme Support**: Light, dark, and system themes
- **Smooth Animations**: Powered by Framer Motion

### 🏗️ Developer Friendly
- **Reusable Components**: Modular architecture for easy integration
- **TypeScript**: Full type safety and IntelliSense support
- **State Management**: Zustand for lightweight, scalable state management
- **Mock API**: Ready-to-use mock responses for development

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## Usage

### Full Page Mode

```tsx
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <ChatBot mode="full-page" />
    </div>
  );
}
```

### Floating Mode

```tsx
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div>
      {/* Your app content */}
      <ChatBot 
        mode="floating" 
        apiUrl="https://your-api.com/chat"
        apiKey="your-api-key"
      />
    </div>
  );
}
```

## Configuration

The chatbot accepts the following props:

```tsx
interface ChatBotProps {
  mode?: 'floating' | 'full-page';    // Display mode
  apiUrl?: string;                     // Custom API endpoint
  apiKey?: string;                     // API key for authentication
  className?: string;                  // Additional CSS classes
}
```

## Component Architecture

```
src/
├── components/
│   ├── ChatBot.tsx           # Main chatbot component
│   ├── ui/
│   │   ├── Button.tsx        # Reusable button component
│   │   └── Textarea.tsx     # Auto-resizing textarea
│   ├── chat/
│   │   ├── ChatMessage.tsx   # Message display with markdown
│   │   ├── ChatInput.tsx     # Advanced input with suggestions
│   │   └── TypingIndicator.tsx # Typing animation
│   └── learning/
│       ├── SuggestedPrompts.tsx    # Quick action prompts
│       └── LearningActionButtons.tsx # Educational actions
├── layouts/
│   └── ChatLayout.tsx        # Main layout with sidebar
├── store/
│   └── chatStore.ts         # Zustand state management
├── services/
│   ├── chatService.ts        # Mock chat API service
│   └── apiService.ts        # Generic API client
├── types/
│   └── index.ts             # TypeScript type definitions
└── utils/
    ├── constants.ts          # App constants
    ├── formatters.ts         # Utility functions
    └── cn.ts               # Tailwind class merger
```

## Learning Features

### Quick Actions
- **Explain Like Beginner**: Simplified explanations
- **Show Example**: Practical demonstrations
- **Practice Questions**: Generate exercises
- **Summarize Topic**: Key points extraction
- **Interview Questions**: Career preparation
- **Generate Quiz**: Knowledge testing

### Smart Suggestions
Context-aware prompts based on:
- Current conversation topic
- Learning category (programming, cloud, AI, etc.)
- User interaction patterns

## Customization

### Theming
The component uses CSS custom properties for easy theming:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... more colors */
}
```

### API Integration
Replace the mock service with your actual API:

```tsx
// src/services/chatService.ts
import ApiService from './apiService';

class ChatService {
  private api: ApiService;

  constructor() {
    this.api = new ApiService('https://your-api.com');
  }

  async sendMessage(message: string) {
    return this.api.post('/chat', { message });
  }
}
```

## Accessibility

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: ARIA labels and semantic HTML
- **Focus Management**: Proper focus states and traps
- **High Contrast**: WCAG compliant color ratios

## Performance

- **Lazy Loading**: Components load on demand
- **Optimized Rendering**: Efficient re-renders with React.memo
- **Smooth Animations**: 60fps animations with Framer Motion
- **Bundle Size**: Tree-shaking and code splitting ready

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions and support, please open an issue in the repository.
