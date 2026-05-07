import { Loader2, Mic, Paperclip, Send } from 'lucide-react'
import { useRef, useState } from 'react'
import { useAutoResizeTextarea } from '../hooks/useAutoResizeTextarea'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

export const ChatInput = ({
  value,
  onChange,
  onSend,
  loading,
}: {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  loading: boolean
}) => {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [hint, setHint] = useState('')
  useAutoResizeTextarea(ref, value)

  const showHint = (message: string) => {
    setHint(message)
    window.setTimeout(() => setHint(''), 1600)
  }

  return (
    <div className="rounded-3xl border border-white/60 bg-white/70 p-3 shadow-[0_20px_40px_-28px_rgba(2,132,199,0.7)] backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
      <Textarea
        ref={ref}
        value={value}
        rows={1}
        placeholder="Ask your AI mentor anything... (Enter to send, Shift+Enter newline)"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            onSend()
          }
        }}
        aria-label="Chat input"
        className="min-h-[52px] resize-none border-none bg-transparent p-1 shadow-none focus-visible:ring-0"
      />
      <div className="mt-2 flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant="glass"
            size="icon"
            aria-label="Attachment placeholder"
            onClick={() => showHint('Attachment support is coming next')}
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          <Button
            variant="glass"
            size="icon"
            aria-label="Voice placeholder"
            onClick={() => showHint('Voice mode will be available soon')}
          >
            <Mic className="h-4 w-4" />
          </Button>
        </div>
        <Button onClick={onSend} disabled={loading || !value.trim()} aria-label="Send message">
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          Send
        </Button>
      </div>
      {hint ? <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{hint}</p> : null}
    </div>
  )
}
