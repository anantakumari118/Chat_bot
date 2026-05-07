import type { ChatMessageModel } from "@/types/chat";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendMessageMock(message: string): Promise<ChatMessageModel> {
  await wait(700);

  const content =
    message.length > 120
      ? "Great question. Let's break it into steps so it's easier to apply in your project.\n\n1. Clarify your goal.\n2. Validate assumptions.\n3. Apply a minimal, testable change.\n4. Measure outcomes."
      : `Understood. A clean way to approach "${message}" is to start from first principles, keep the implementation small, and iterate after validation.`;

  return {
    id: crypto.randomUUID(),
    role: "assistant",
    content,
    createdAt: new Date().toISOString()
  };
}
