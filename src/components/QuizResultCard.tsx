import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";
import { Instagram, RotateCcw } from "lucide-react";
import { toast } from "sonner";

export interface QuizResult {
  title: string;
  emoji: string;
  description: string;
  gradient: string;
}

const INSTAGRAM_URL = "https://www.instagram.com/sundaesocial.in?igsh=eHJ4ejZ1aWJ1cjFz";

export function QuizResultCard({
  result,
  onRestart,
}: {
  result: QuizResult;
  onRestart: () => void;
}) {
  const handleShare = async () => {
    const textToCopy = `I got ${result.title} (${result.emoji}) on Sundae Social! Find yours at @sundaesocial 🍨✨`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Caption copied! Opening Instagram Story...", {
        description: "Paste it and tag @sundaesocial!",
        duration: 3000,
      });
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }

    setTimeout(() => {
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
      const isAndroid = /Android/.test(navigator.userAgent);
      
      if (isIOS) {
        window.location.href = "instagram://story-camera";
      } else if (isAndroid) {
        window.location.href = "intent://story-camera#Intent;package=com.instagram.android;scheme=instagram;end";
      } else {
        window.open(INSTAGRAM_URL, "_blank");
      }
    }, 600);
  };

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
        <AnimatedButton variant="primary" fullWidth onClick={handleShare}>
          <Instagram size={18} /> Share on Story
        </AnimatedButton>
        <AnimatedButton variant="cream" fullWidth onClick={() => window.open(INSTAGRAM_URL, "_blank")}>
          Follow Us
        </AnimatedButton>
        <AnimatedButton variant="ghost" fullWidth onClick={onRestart}>
          <RotateCcw size={16} /> Retake quiz
        </AnimatedButton>
      </div>
    </motion.div>
  );
}
