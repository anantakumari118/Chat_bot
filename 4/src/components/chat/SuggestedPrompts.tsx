const prompts = [
  "Explain closures in JavaScript",
  "Create a React hook interview guide",
  "Compare SQL and NoSQL for beginners"
];

interface SuggestedPromptsProps {
  onPick: (prompt: string) => void;
}

export function SuggestedPrompts({ onPick }: SuggestedPromptsProps): JSX.Element {
  return (
    <div className="mb-1 border-b border-border/70 pb-4">
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
        Suggested prompts
      </p>
      <div className="flex flex-wrap gap-2">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onPick(prompt)}
          className="rounded-full border border-border/80 bg-background px-3 py-1.5 text-xs text-muted-foreground shadow-subtle transition-all duration-200 hover:border-accent/30 hover:bg-muted hover:text-foreground active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          {prompt}
        </button>
      ))}
      </div>
    </div>
  );
}
