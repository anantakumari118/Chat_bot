import { Circle, Menu, Moon, Settings, Sun } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  theme: "light" | "dark";
}

export function Header({ onToggleSidebar, onToggleTheme, theme }: HeaderProps): JSX.Element {
  return (
    <header className="sticky top-0 z-10 flex h-15 items-center justify-between border-b border-border/70 bg-background/90 px-4 backdrop-blur md:h-16 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-md p-2 text-muted-foreground transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
          aria-label="Open conversations"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div>
          <h2 className="text-[15px] font-semibold tracking-tight text-foreground md:text-base">
            IT Learning Assistant
          </h2>
          <p className="text-[11px] text-muted-foreground md:text-xs">Structured answers with examples</p>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-border/80 bg-background px-2.5 py-1 text-xs text-muted-foreground md:inline-flex">
          <Circle className="h-2.5 w-2.5 fill-current text-emerald-500" />
          Online
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={onToggleTheme}
          className="rounded-md border border-transparent p-2 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-background hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </button>
        <button
          type="button"
          className="rounded-md border border-transparent p-2 text-muted-foreground transition-all duration-200 hover:border-border hover:bg-background hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label="Open settings"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
