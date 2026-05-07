import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'

interface CodeBlockProps {
  language?: string
  code: string
}

export const CodeBlock = ({ language = 'txt', code }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)
  const [activeLang, setActiveLang] = useState(language)
  const snippets = {
    [language]: code,
    terminal: language === 'bash' || language === 'shell' ? code : `$ node ./example\n${code}`,
  }
  const onCopy = async () => {
    await navigator.clipboard.writeText(snippets[activeLang as keyof typeof snippets] ?? code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div className="my-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-950 shadow-xl dark:border-slate-800">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-2 text-xs text-slate-300">
        <div className="flex items-center gap-1">
          {Object.keys(snippets).map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setActiveLang(lang)}
              className={`rounded-md px-2 py-1 text-[11px] transition ${
                activeLang === lang ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
        <Button size="sm" variant="ghost" className="text-slate-200 hover:bg-slate-800" onClick={onCopy}>
          {copied ? <Check className="mr-1 h-3.5 w-3.5" /> : <Copy className="mr-1 h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm text-slate-100">
        <code>{snippets[activeLang as keyof typeof snippets]}</code>
      </pre>
    </div>
  )
}
