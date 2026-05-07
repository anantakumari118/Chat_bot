import { Brain, FileQuestion, GraduationCap, Lightbulb, ListChecks, Sparkles } from 'lucide-react'

const actions = [
  { id: 'beginner', label: 'Explain Like Beginner', icon: GraduationCap },
  { id: 'example', label: 'Show Example', icon: Lightbulb },
  { id: 'quiz', label: 'Generate Quiz', icon: ListChecks },
  { id: 'interview', label: 'Interview Questions', icon: FileQuestion },
  { id: 'summary', label: 'Summarize Topic', icon: Brain },
  { id: 'practice', label: 'Practice Problems', icon: Sparkles },
]

export const LearningActions = ({
  selected,
  onToggle,
}: {
  selected: string[]
  onToggle: (id: string) => void
}) => (
  <div className="grid grid-cols-2 gap-2 lg:grid-cols-3">
    {actions.map(({ id, label, icon: Icon }) => {
      const active = selected.includes(id)
      return (
        <button
          key={id}
          type="button"
          onClick={() => onToggle(id)}
          className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
            active
              ? 'border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700 dark:bg-sky-950/30 dark:text-sky-200'
              : 'border-white/70 bg-white/70 text-slate-700 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200'
          }`}
        >
          <Icon className="mb-1 h-4 w-4" />
          <span>{label}</span>
        </button>
      )
    })}
  </div>
)
