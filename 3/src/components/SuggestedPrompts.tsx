const prompts = [
  'Explain closures with a real project example',
  'Generate 5 React interview questions',
  'Summarize OSI model in notes format',
  'Create a TypeScript practice problem set',
]

export const SuggestedPrompts = ({ onPick }: { onPick: (prompt: string) => void }) => (
  <div className="flex flex-wrap gap-2">
    {prompts.map((prompt) => (
      <button
        key={prompt}
        type="button"
        onClick={() => onPick(prompt)}
        className="rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-xs text-slate-700 transition hover:scale-[1.01] hover:border-sky-200 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-sky-700 dark:hover:text-sky-300"
      >
        {prompt}
      </button>
    ))}
  </div>
)
