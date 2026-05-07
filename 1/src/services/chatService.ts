
const MOCK_RESPONSES: Record<string, string> = {
  "default": "That's a great question! In IT, this concept is fundamental to understanding how modern systems work. Would you like a beginner-friendly explanation or a technical deep dive?",
  "beginner": "Think of it like a library. Instead of looking for a book yourself, you ask the librarian (the API) to get it for you. This way, you don't need to know where the book is stored!",
  "code": "```typescript\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\nconst getUser = (id: string): User => {\n  return {\n    id,\n    name: 'John Doe',\n    email: 'john@example.com'\n  };\n};\n```",
  "quiz": "Here's a quick quiz to test your knowledge:\n\n1. What does 'API' stand for?\n2. Why is state management important in React?\n3. What is the difference between a library and a framework?",
};

export const chatService = {
  async sendMessage(content: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerContent = content.toLowerCase();
    if (lowerContent.includes('beginner')) return MOCK_RESPONSES.beginner;
    if (lowerContent.includes('code') || lowerContent.includes('example')) return MOCK_RESPONSES.code;
    if (lowerContent.includes('quiz')) return MOCK_RESPONSES.quiz;
    
    return MOCK_RESPONSES.default;
  },

  // Simulated streaming
  async *streamMessage(content: string): AsyncIterableIterator<string> {
    const response = await this.sendMessage(content);
    const words = response.split(' ');
    
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50));
      yield word + ' ';
    }
  }
};
