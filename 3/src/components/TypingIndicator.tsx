import { motion } from 'framer-motion'

export const TypingIndicator = () => (
  <div className="flex items-center gap-1 rounded-full bg-slate-200/80 px-3 py-2 dark:bg-slate-800/80">
    {[0, 1, 2].map((dot) => (
      <motion.span
        key={dot}
        className="h-1.5 w-1.5 rounded-full bg-slate-500"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
      />
    ))}
  </div>
)
