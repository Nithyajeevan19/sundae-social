import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";
import { Instagram, RotateCcw } from "lucide-react";

export interface QuizResult {
  title: string;
  emoji: string;
  description: string;
  gradient: string;
}

export function QuizResultCard({
  result,
  onRestart,
}: {
  result: QuizResult;
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 140, damping: 16 }}
      className="rounded-3xl bg-card p-6 shadow-soft"
    >
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Your Sundae personality
      </p>
      <div className={`mt-4 rounded-3xl ${result.gradient} p-6 text-center shadow-pop`}>
        <motion.div
          initial={{ rotate: -10, scale: 0.6 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 180 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/25 text-5xl backdrop-blur"
        >
          {result.emoji}
        </motion.div>
        <h3 className="mt-4 font-display text-3xl text-cream drop-shadow-sm">
          {result.title}
        </h3>
        <p className="mt-2 text-sm text-cream/90">{result.description}</p>
      </div>

      <div className="mt-5 space-y-2">
        <AnimatedButton variant="primary" fullWidth>
          <Instagram size={18} /> Share on Story
        </AnimatedButton>
        <AnimatedButton variant="cream" fullWidth>
          Follow Us
        </AnimatedButton>
        <AnimatedButton variant="ghost" fullWidth onClick={onRestart}>
          <RotateCcw size={16} /> Retake quiz
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
