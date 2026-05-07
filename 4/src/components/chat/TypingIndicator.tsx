import { motion } from "framer-motion";

export function TypingIndicator(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -2 }}
      transition={{ duration: 0.18 }}
      className="py-4 text-sm text-muted-foreground"
      aria-live="polite"
    >
      <span className="rounded-md bg-muted px-2 py-1 text-xs">Assistant is typing...</span>
    </motion.div>
  );
}
