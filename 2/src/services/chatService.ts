import type { Message, ApiResponse, ChatConfig } from '@/types';
import { generateId } from '@/utils/formatters';
import { DEFAULT_CONFIG } from '@/utils/constants';

class ChatService {
  private config: ChatConfig;

  constructor(config: Partial<ChatConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  async sendMessage(message: string, conversationHistory: Message[] = []): Promise<Message> {
    // Simulate API delay
    await this.delay(1000 + Math.random() * 2000);

    // Mock response generation based on the message
    const response = this.generateMockResponse(message, conversationHistory);

    return {
      id: generateId(),
      content: response,
      role: 'assistant',
      timestamp: new Date(),
      status: 'sent',
      metadata: {
        tokens: Math.floor(response.length / 4),
        model: this.config.model,
        latency: 1500 + Math.random() * 1000,
      },
    };
  }

  async *sendMessageStream(message: string, conversationHistory: Message[] = []): AsyncGenerator<string> {
    const response = this.generateMockResponse(message, conversationHistory);
    const words = response.split(' ');

    for (let i = 0; i < words.length; i++) {
      const chunk = words[i] + (i < words.length - 1 ? ' ' : '');
      yield chunk;
      await this.delay(50 + Math.random() * 100);
    }
  }

  private generateMockResponse(message: string, conversationHistory: Message[]): string {
    const lowerMessage = message.toLowerCase();

    // Programming related responses
    if (lowerMessage.includes('react') || lowerMessage.includes('component')) {
      return `# React Components Explained

React components are the building blocks of React applications. They're reusable pieces of UI that can manage their own state and logic.

## Key Concepts

**Functional Components**
\`\`\`javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

**Class Components**
\`\`\`javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
\`\`\`

## Best Practices

1. **Keep components small and focused** - Each component should do one thing well
2. **Use functional components with hooks** - Modern React prefers functional components
3. **Props are immutable** - Never modify props directly
4. **State management** - Use useState for local state, useContext for global state

## Example: Counter Component

\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

Would you like me to explain any specific aspect of React components in more detail?`;
    }

    // Cloud computing responses
    if (lowerMessage.includes('aws') || lowerMessage.includes('cloud')) {
      return `# AWS Cloud Computing Fundamentals

Amazon Web Services (AWS) is the world's most comprehensive cloud platform, offering over 200 services.

## Core AWS Services

**Compute Services**
- **EC2**: Virtual servers in the cloud
- **Lambda**: Serverless compute service
- **ECS/EKS**: Container orchestration

**Storage Services**
- **S3**: Object storage service
- **EBS**: Block storage for EC2
- **EFS**: File storage for multiple EC2 instances

**Database Services**
- **RDS**: Managed relational databases
- **DynamoDB**: NoSQL database
- **Aurora**: MySQL/PostgreSQL compatible

## Practical Example: Deploying a Web App

\`\`\`bash
# 1. Create S3 bucket for static files
aws s3 mb s3://my-web-app

# 2. Enable static website hosting
aws s3 website s3://my-web-app --index-document index.html

# 3. Upload files
aws s3 sync ./dist s3://my-web-app --delete

# 4. Make files public
aws s3api put-bucket-policy --bucket my-web-app --policy file://policy.json
\`\`\`

## Cost Optimization Tips

1. **Use Reserved Instances** for predictable workloads
2. **Enable Auto Scaling** to match demand
3. **Monitor with CloudWatch** to track usage
4. **Use S3 Lifecycle Policies** for data archiving

What specific AWS service would you like to learn more about?`;
    }

    // AI/ML responses
    if (lowerMessage.includes('ai') || lowerMessage.includes('machine learning')) {
      return `# Artificial Intelligence & Machine Learning

AI and ML are transforming how we build intelligent applications.

## Key Concepts

**Machine Learning Types**
- **Supervised Learning**: Learning from labeled data
- **Unsupervised Learning**: Finding patterns in unlabeled data
- **Reinforcement Learning**: Learning through trial and error

**Deep Learning**
- Neural networks with multiple layers
- Excels at pattern recognition
- Powers modern AI applications

## Practical Example: Simple Neural Network

\`\`\`python
import tensorflow as tf
from tensorflow import keras

# Create a simple neural network
model = keras.Sequential([
    keras.layers.Dense(128, activation='relu', input_shape=(784,)),
    keras.layers.Dropout(0.2),
    keras.layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(X_train, y_train, epochs=10, validation_split=0.2)
\`\`\`

## Popular AI Frameworks

- **TensorFlow/PyTorch**: Deep learning
- **Scikit-learn**: Traditional ML
- **Hugging Face**: NLP models
- **OpenAI API**: GPT models

## Getting Started with AI

1. **Learn Python** - Primary language for ML
2. **Understand math basics** - Linear algebra, calculus, statistics
3. **Start with simple projects** - Classification, regression
4. **Experiment with pre-trained models**

What area of AI interests you most?`;
    }

    // Default educational response
    return `# Learning ${this.extractTopic(message)}

Great question! Let me break this down for you in a clear, educational way.

## Understanding the Fundamentals

${this.generateEducationalContent(message)}

## Key Takeaways

1. **Start with the basics** - Master fundamentals before advanced topics
2. **Practice regularly** - Consistent practice builds expertise
3. **Build projects** - Apply what you learn to real problems
4. **Stay curious** - Technology evolves constantly

## Next Steps

- 📚 **Study**: Review the core concepts
- 💻 **Practice**: Try hands-on exercises
- 🏗️ **Build**: Create a small project
- 🤝 **Collaborate**: Join study groups or forums

Would you like me to:
- Explain this like you're a complete beginner?
- Show you a practical example?
- Generate some practice questions?
- Create a quick quiz to test your understanding?

Just let me know how I can help you learn better!`;
  }

  private extractTopic(message: string): string {
    const topics = {
      'react': 'React Development',
      'javascript': 'JavaScript Programming',
      'python': 'Python Programming',
      'aws': 'AWS Cloud Services',
      'docker': 'Containerization with Docker',
      'kubernetes': 'Kubernetes Orchestration',
      'security': 'Cybersecurity',
      'database': 'Database Management',
      'api': 'API Development',
      'testing': 'Software Testing',
    };

    const lowerMessage = message.toLowerCase();
    for (const [key, topic] of Object.entries(topics)) {
      if (lowerMessage.includes(key)) {
        return topic;
      }
    }

    return 'Technology Concepts';
  }

  private generateEducationalContent(message: string): string {
    return `This is a fundamental concept that forms the foundation of modern software development. 

When learning this topic, it's important to understand both the theoretical aspects and practical applications. The best approach is to:

1. **Understand the "why"** - Why does this concept exist? What problem does it solve?
2. **Learn the "how"** - How is it implemented in practice?
3. **Practice the "what"** - What can you build with this knowledge?

Remember that learning is a journey, and every expert was once a beginner. Take your time, ask questions, and don't be afraid to make mistakes - that's how we learn!`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateConfig(newConfig: Partial<ChatConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  getConfig(): ChatConfig {
    return { ...this.config };
  }
}

export const chatService = new ChatService();
export default ChatService;
