import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { Code2, Database, Server } from "lucide-react";
import profilePhoto from "../../assets/merera.jpg";

// Floating glass chip that hovers near a corner of the portrait, labelling
// one layer of the stack. Purely decorative metadata, not a fake stat.
function FloatingBadge({ icon: Icon, label, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.6 + delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`glass absolute flex items-center gap-2 rounded-xl border border-border px-3 py-2 shadow-lg shadow-black/20 animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <Icon
        size={14}
        strokeWidth={2}
        className="text-accent"
        aria-hidden="true"
      />
      <span className="font-mono text-xs text-ink/90 whitespace-nowrap">
        {label}
      </span>
    </motion.div>
  );
}

// The hero's portrait: a gradient-bordered glass frame with a restrained
// ambient glow, gentle cursor-parallax tilt, a clip-path reveal on entrance,
// and a few floating stack badges.
function PhotoFrame({ revealDelay = 0 }) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const parallaxEnabled = !shouldReduceMotion;

  const handleMouseMove = (e) => {
    if (!parallaxEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = e.clientX - (rect.left + rect.width / 2);
    const py = e.clientY - (rect.top + rect.height / 2);
    rotateY.set((px / rect.width) * 8);
    rotateX.set(-(py / rect.height) * 8);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="relative mx-auto w-full max-w-sm md:max-w-none">
      {/* Restrained ambient glow — small and dim, supporting the portrait
          rather than competing with it */}
      <div
        className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-accent/15 via-violet/10 to-transparent blur-2xl animate-glowPulse"
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={
          parallaxEnabled
            ? {
                rotateX: springRotateX,
                rotateY: springRotateY,
                transformPerspective: 1000,
              }
            : undefined
        }
        initial={
          shouldReduceMotion
            ? false
            : { clipPath: "inset(0 0 100% 0)", opacity: 0.4 }
        }
        animate={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        transition={{
          duration: 1,
          delay: revealDelay,
          ease: [0.65, 0, 0.35, 1],
        }}
        className="relative rounded-[2rem] p-[1.5px] bg-gradient-to-br from-accent/70 via-border to-violet/70 shadow-2xl shadow-black/40"
      >
        <div className="relative overflow-hidden rounded-[2rem] bg-elevated">
          <img
            src={profilePhoto}
            alt="Portrait of Merera Taddesa"
            className="aspect-[4/5] w-full object-cover"
            width={480}
            height={600}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
        </div>
      </motion.div>

      <FloatingBadge
        icon={Code2}
        label="React"
        className="-left-6 top-8"
        delay={revealDelay + 0.5}
      />
      <FloatingBadge
        icon={Server}
        label="Node.js"
        className="-right-6 top-1/2 -translate-y-1/2"
        delay={revealDelay + 1}
      />
      <FloatingBadge
        icon={Database}
        label="MongoDB"
        className="-left-4 bottom-10"
        delay={revealDelay + 1.5}
      />
    </div>
  );
}

export default PhotoFrame;
