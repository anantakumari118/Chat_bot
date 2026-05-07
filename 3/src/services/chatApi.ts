import type { ChatRequest, ChatResponseChunk } from '../types/chat'

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://mock.ai.local'
const RETRY_COUNT = 2

const responses = [
  `Great question. Let's break this into practical pieces:

## Core Concept
In TypeScript, **generics** let you build reusable logic while preserving type safety.

\`\`\`ts
function wrap<T>(value: T): { data: T } {
  return { data: value }
}
\`\`\`

### Best practice
- Keep generic signatures small.
- Prefer constraints for clarity.
- Use inferred types before explicit annotations.
`,
  `You're thinking like an engineer. Here is a structured learning path:
1. Understand runtime vs compile-time.
2. Build one mini project each day.
3. Explain each concept back in your own words.
`,
]

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export const chatApi = {
  baseUrl: BASE_URL,

  async sendMessage(request: ChatRequest): Promise<string> {
    for (let i = 0; i <= RETRY_COUNT; i += 1) {
      try {
        await wait(450)
        const sample = responses[(request.prompt.length + i) % responses.length]
        return sample
      } catch (error) {
        if (i === RETRY_COUNT) throw error
        await wait(250 * (i + 1))
      }
    }
    return 'No response'
  },

  async *streamMessage(request: ChatRequest): AsyncGenerator<ChatResponseChunk> {
    const full = await this.sendMessage(request)
    const tokens = full.split(' ')
    for (const token of tokens) {
      await wait(28)
      yield { token: `${token} `, done: false }
    }
    yield { token: '', done: true }
  },
}
