import type { Conversation } from "@/types/chat";

export const exampleConversations: Conversation[] = [
  {
    id: "conv-1",
    title: "React rendering basics",
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "m-1",
        role: "user",
        content: "Can you explain how React re-renders components?",
        createdAt: new Date().toISOString()
      },
      {
        id: "m-2",
        role: "assistant",
        content:
          "React re-renders when **state** or **props** change.\n\nA useful mental model:\n\n1. State changes trigger a new render pass.\n2. React compares old and new trees.\n3. It updates only what changed in the DOM.\n\n```tsx\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount((v) => v + 1)}>{count}</button>;\n}\n```",
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: "conv-2",
    title: "TypeScript interfaces",
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "m-3",
        role: "user",
        content: "Difference between type and interface?",
        createdAt: new Date().toISOString()
      },
      {
        id: "m-4",
        role: "assistant",
        content:
          "Both can model object shapes.\n\n- Use `interface` for extendable object contracts.\n- Use `type` for unions, intersections, and mapped patterns.\n\nIn most app code, consistency is more important than strict preference.",
        createdAt: new Date().toISOString()
      }
    ]
  }
];
