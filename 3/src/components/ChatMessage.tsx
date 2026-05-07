import { AlertTriangle, Lightbulb, NotebookPen } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { ChatMessage as ChatMessageType, RichBlock } from '../types/chat'
import { CodeBlock } from './CodeBlock'
import { TypingIndicator } from './TypingIndicator'

const blockStyle: Record<RichBlock['type'], string> = {
  note: 'border-sky-200 bg-sky-50 dark:border-sky-900 dark:bg-sky-950/40',
  warning: 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/40',
  tip: 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950/30',
  highlight: 'border-violet-200 bg-violet-50 dark:border-violet-900 dark:bg-violet-950/30',
  terminal: 'border-slate-700 bg-slate-950 text-slate-100',
  diagram: 'border-fuchsia-200 bg-fuchsia-50 dark:border-fuchsia-900 dark:bg-fuchsia-950/30',
}

export const ChatMessage = ({ message }: { message: ChatMessageType }) => {
  const isAssistant = message.role === 'assistant'

  return (
    <article className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={`w-fit max-w-[92%] break-words rounded-2xl border p-4 text-sm shadow-sm md:max-w-[68%] ${
          isAssistant
            ? 'border-white/70 bg-white/80 text-slate-800 backdrop-blur dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100'
            : 'border-slate-900 bg-slate-900 text-slate-50 dark:border-slate-100 dark:bg-slate-100 dark:text-slate-900'
        }`}
      >
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {message.isStreaming && !message.content ? (
            <TypingIndicator />
          ) : (
            <ReactMarkdown
              components={{
                code(props) {
                  const { children, className } = props
                  const match = /language-(\w+)/.exec(className ?? '')
                  const value = String(children).replace(/\n$/, '')
                  return match ? <CodeBlock language={match[1]} code={value} /> : <code>{children}</code>
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {message.blocks?.map((block) => (
          <div key={block.id} className={`mt-3 rounded-xl border p-3 ${blockStyle[block.type]}`}>
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide">
              {block.type === 'warning' && <AlertTriangle className="h-3.5 w-3.5" />}
              {block.type === 'tip' && <Lightbulb className="h-3.5 w-3.5" />}
              {block.type === 'note' && <NotebookPen className="h-3.5 w-3.5" />}
              <span>{block.title}</span>
            </div>
            <p className="whitespace-pre-wrap text-xs leading-relaxed">{block.content}</p>
          </div>
        ))}

        <p className="mt-2 text-right text-[10px] uppercase tracking-wider opacity-60">{message.timestamp}</p>
      </div>
    </article>
  )
}
