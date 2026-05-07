import { useChatStore } from '../../store/useChatStore';
import { cn } from '../../lib/utils';
import { 
  MessageSquare, 
  History, 
  ChevronLeft, 
  ChevronRight,
  Plus,
  BookOpen,
  Code,
  Terminal,
  Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useChatStore();

  const categories = [
    { name: 'Web Development', icon: Code, color: 'text-blue-400' },
    { name: 'Systems Design', icon: BookOpen, color: 'text-purple-400' },
    { name: 'DevOps & Cloud', icon: Terminal, color: 'text-emerald-400' },
    { name: 'Interview Prep', icon: Trophy, color: 'text-amber-400' },
  ];

  const recentChats = [
    'Understanding React Hooks',
    'Docker Networking Basics',
    'SQL vs NoSQL Design',
    'Clean Architecture in Node.js',
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 280 : 80 }}
      className={cn(
        "relative h-screen glass border-r flex flex-col transition-all duration-300 z-50",
        !isSidebarOpen && "items-center"
      )}
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ai-glow">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight ai-gradient-text">EduAI</span>
            </motion.div>
          ) : (
            <div key="logo-mini" className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center ai-glow">
              <Terminal className="w-6 h-6 text-white" />
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* New Chat Button */}
      <div className="px-4 mb-8">
        <button className={cn(
          "w-full flex items-center gap-3 p-3 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-all ai-glow",
          !isSidebarOpen && "justify-center"
        )}>
          <Plus className="w-5 h-5" />
          {isSidebarOpen && <span className="font-medium">New Session</span>}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        <div>
          {isSidebarOpen && <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 ml-2">Learning Path</h3>}
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors group",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <cat.icon className={cn("w-5 h-5", cat.color)} />
                {isSidebarOpen && <span className="text-sm font-medium">{cat.name}</span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          {isSidebarOpen && <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 ml-2 flex items-center gap-2">
            <History className="w-3 h-3" /> Recent History
          </h3>}
          <div className="space-y-1">
            {recentChats.map((chat) => (
              <button
                key={chat}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors text-left",
                  !isSidebarOpen && "justify-center"
                )}
              >
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                {isSidebarOpen && <span className="text-sm text-muted-foreground truncate">{chat}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-white/5">
        <button
          onClick={toggleSidebar}
          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors"
        >
          {isSidebarOpen ? (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse Sidebar</span>
            </>
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
