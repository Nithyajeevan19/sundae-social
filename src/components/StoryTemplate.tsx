import { motion } from "framer-motion";
import { AnimatedButton } from "./AnimatedButton";
import { Share2, Instagram } from "lucide-react";
import { toast } from "sonner";

const INSTAGRAM_URL = "https://www.instagram.com/sundaesocial.in?igsh=eHJ4ejZ1aWJ1cjFz";

export function StoryTemplate({
  caption = "I just tried Sundae Social 🍨",
  subtitle = "@sundaesocial — your treat place",
}: {
  caption?: string;
  subtitle?: string;
}) {
  const handleShare = async () => {
    const textToCopy = `${caption} — ${subtitle} ✨`;
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
    <div className="rounded-3xl bg-card p-5 shadow-soft">
      <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
        Your story · ready to share
      </p>

      <motion.div
        initial={{ rotate: -2, scale: 0.95, opacity: 0 }}
        whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative mx-auto aspect-[9/16] w-full max-w-[260px] overflow-hidden rounded-[2rem] bg-gradient-warm shadow-pop"
      >
        <div className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{ background: "radial-gradient(circle at 20% 20%, #fff, transparent 60%)" }} />
        {["🍨","✨","🍒","🧁","🌸","🍫","✨"].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${(i * 37) % 80 + 5}%`,
              top: `${(i * 53) % 75 + 5}%`,
            }}
            animate={{ y: [0, -8, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 3 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          >
            {e}
          </motion.span>
        ))}
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
          <span className="rounded-full bg-white/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-cream backdrop-blur">
            Sundae Social
          </span>
          <h4 className="mt-4 font-display text-3xl leading-tight text-cream drop-shadow-sm">
            {caption}
          </h4>
          <p className="mt-3 text-xs text-cream/90">{subtitle}</p>
          <div className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-white/20 text-3xl backdrop-blur">
            🍦
          </div>
          <p className="mt-4 text-[11px] uppercase tracking-widest text-cream/80">
            tag @sundaesocial
          </p>
        </div>
      </motion.div>

      <div className="mt-5 space-y-2">
        <AnimatedButton variant="primary" fullWidth onClick={handleShare}>
          <Share2 size={18} /> Share to Story
        </AnimatedButton>
        <AnimatedButton variant="cream" fullWidth onClick={() => window.open(INSTAGRAM_URL, "_blank")}>
          <Instagram size={18} /> Tag @sundaesocial
        </AnimatedButton>
      </div>
    </div>
  );
}
