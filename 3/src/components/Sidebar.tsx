import { BookOpenText, ChevronLeft, ChevronRight, History, Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Conversation } from '../types/chat'
import { ConversationList } from './ConversationList'
import { Button } from './ui/button'

export const Sidebar = ({
  collapsed,
  onCollapse,
  conversations,
  activeConversationId,
  onSelectConversation,
}: {
  collapsed: boolean
  onCollapse: () => void
  conversations: Conversation[]
  activeConversationId: string
  onSelectConversation: (id: string) => void
}) => (
  <motion.aside
    animate={{ width: collapsed ? 80 : 300 }}
    className="hidden h-screen overflow-y-auto border-r border-white/40 bg-white/40 p-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/50 lg:block"
  >
    <div className="mb-4 flex items-center justify-between">
      {!collapsed && <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">AI Learning Hub</p>}
      <Button variant="glass" size="icon" onClick={onCollapse} aria-label="Toggle sidebar">
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
    {!collapsed && (
      <div className="space-y-4">
        <section>
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
            <History className="h-3.5 w-3.5" />
            Chat history
          </div>
          <ConversationList
            conversations={conversations}
            activeId={activeConversationId}
            onSelect={onSelectConversation}
          />
        </section>
        <section className="rounded-xl border border-white/50 bg-white/60 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300">
          <p className="mb-2 flex items-center gap-2 font-medium">
            <Star className="h-3.5 w-3.5" />
            Saved
          </p>
          <p className="mb-1">Frontend mastery track</p>
          <p className="flex items-center gap-1"><BookOpenText className="h-3.5 w-3.5" /> System design notes</p>
        </section>
      </div>
    )}
  </motion.aside>
)
