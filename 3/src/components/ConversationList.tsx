import type { Conversation } from '../types/chat'

export const ConversationList = ({
  conversations,
  activeId,
  onSelect,
}: {
  conversations: Conversation[]
  activeId: string
  onSelect: (id: string) => void
}) => (
  <div className="space-y-2">
    {conversations.map((conversation) => (
      <button
        key={conversation.id}
        type="button"
        onClick={() => onSelect(conversation.id)}
        className={`w-full rounded-xl border px-3 py-2 text-left transition ${
          activeId === conversation.id
            ? 'border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30'
            : 'border-transparent hover:border-slate-200 hover:bg-white/70 dark:hover:border-slate-700 dark:hover:bg-slate-900/60'
        }`}
      >
        <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{conversation.title}</p>
        <p className="text-xs text-slate-500">{conversation.category}</p>
      </button>
    ))}
  </div>
)
