import * as React from 'react'
import { cn } from '../../utils/cn'

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-[88px] w-full rounded-2xl border border-white/40 bg-white/60 px-4 py-3 text-sm text-slate-900 shadow-[0_12px_24px_-16px_rgba(15,23,42,0.4)] backdrop-blur-xl placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-300/70 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100 dark:placeholder:text-slate-400',
        className,
      )}
      {...props}
    />
  ),
)

Textarea.displayName = 'Textarea'
