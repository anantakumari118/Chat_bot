import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Menu, Moon, RefreshCcw, Sparkles, Sun, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ChatInput } from '../components/ChatInput'
import { ChatMessage } from '../components/ChatMessage'
import { LearningActions } from '../components/LearningActions'
import { Sidebar } from '../components/Sidebar'
import { SuggestedPrompts } from '../components/SuggestedPrompts'
import { Button } from '../components/ui/button'
import { useChatStore } from '../store/chatStore'

export const ChatLayout = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [promptsOpen, setPromptsOpen] = useState(true)
  const [actionsOpen, setActionsOpen] = useState(true)
  const [dark, setDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') return true
    if (saved === 'light') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [actions, setActions] = useState<string[]>([])
  const messagesRef = useRef<HTMLElement>(null)
  const { conversations, activeConversationId, setActiveConversation, input, setInput, isStreaming, sendMessage, regenerate } =
    useChatStore()

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId),
    [conversations, activeConversationId],
  )

  const toggleAction = (id: string) =>
    setActions((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light'
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  useEffect(() => {
    const onResize = () => {
      const compact = window.innerHeight < 760
      setPromptsOpen(!compact)
      setActionsOpen(!compact)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (!messagesRef.current) return
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight
  }, [activeConversation?.messages])

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,rgba(125,211,252,0.18),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(167,139,250,0.16),transparent_40%),#f8fafc] text-slate-900 dark:bg-[radial-gradient(circle_at_10%_10%,rgba(14,116,144,0.18),transparent_40%),radial-gradient(circle_at_90%_10%,rgba(76,29,149,0.2),transparent_40%),#020617] dark:text-slate-100">
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, -20, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[-18rem] top-[-14rem] h-[32rem] w-[32rem] rounded-full bg-cyan-400/25 blur-3xl dark:bg-cyan-700/20"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -35, 18, 0], y: [0, 15, -25, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute right-[-16rem] top-[6rem] h-[30rem] w-[30rem] rounded-full bg-violet-400/25 blur-3xl dark:bg-violet-700/25"
      />
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px]">
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
                onClick={() => setMobileSidebarOpen(false)}
                aria-label="Close mobile overlay"
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: 'spring', stiffness: 280, damping: 30 }}
                className="fixed left-0 top-0 z-50 h-full w-[82vw] max-w-[320px] border-r border-white/40 bg-white/80 p-4 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/90 lg:hidden"
              >
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-semibold">AI Learning Hub</p>
                  <Button variant="glass" size="icon" onClick={() => setMobileSidebarOpen(false)} aria-label="Close menu">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      type="button"
                      onClick={() => {
                        setActiveConversation(conversation.id)
                        setMobileSidebarOpen(false)
                      }}
                      className={`w-full rounded-xl border px-3 py-2 text-left ${
                        activeConversationId === conversation.id
                          ? 'border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30'
                          : 'border-transparent hover:border-slate-200 hover:bg-white/70 dark:hover:border-slate-700 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <p className="truncate text-sm font-medium">{conversation.title}</p>
                      <p className="text-xs text-slate-500">{conversation.category}</p>
                    </button>
                  ))}
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        <Sidebar
          collapsed={collapsed}
          onCollapse={() => setCollapsed((x) => !x)}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversation}
        />

        <main className="flex min-h-screen flex-1 flex-col p-4 md:p-6">
          <div className="flex flex-1 flex-col gap-3">
          <header className="flex items-center justify-between rounded-2xl border border-white/60 bg-white/60 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center gap-2">
              <Button
                variant="glass"
                size="icon"
                onClick={() => setMobileSidebarOpen(true)}
                aria-label="Open menu"
                className="lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </Button>
              <div>
                <p className="text-sm font-semibold">Nova Mentor AI</p>
                <p className="text-xs text-emerald-500">Online • Topic: {activeConversation?.title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="glass" size="icon" onClick={() => setDark((x) => !x)} aria-label="Toggle theme">
                {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button variant="glass" size="icon" onClick={regenerate} aria-label="Regenerate response">
                <RefreshCcw className="h-4 w-4" />
              </Button>
            </div>
          </header>

          <section className="rounded-2xl border border-white/60 bg-white/60 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <div className="flex items-center justify-between gap-2">
              <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wider text-slate-500">
                <Sparkles className="h-3.5 w-3.5" />
                Suggested prompts
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setPromptsOpen((prev) => !prev)}
                aria-label="Toggle suggested prompts"
              >
                {promptsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </Button>
            </div>
            {promptsOpen ? <SuggestedPrompts onPick={setInput} /> : null}
          </section>

          <section className="rounded-2xl border border-white/60 bg-white/60 p-3 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-wider text-slate-500">Learning actions</p>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setActionsOpen((prev) => !prev)}
                aria-label="Toggle learning actions"
              >
                {actionsOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </Button>
            </div>
            {actionsOpen ? <LearningActions selected={actions} onToggle={toggleAction} /> : null}
          </section>

          <section
            ref={messagesRef}
            className="min-h-[220px] flex-1 space-y-3 overflow-y-auto rounded-2xl border border-white/60 bg-white/40 p-3 pb-4 backdrop-blur md:max-h-[42vh] dark:border-slate-800 dark:bg-slate-900/40"
          >
            <AnimatePresence initial={false}>
              {activeConversation?.messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChatMessage message={message} />
                </motion.div>
              ))}
            </AnimatePresence>
          </section>

          <footer>
            <ChatInput
              value={input}
              onChange={setInput}
              loading={isStreaming}
              onSend={() => void sendMessage(input, actions)}
            />
          </footer>
          </div>
        </main>
      </div>
    </div>
  )
}
