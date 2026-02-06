import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center">
      {/* ── Layered Background ── */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(120,80,40,0.15),transparent)]" />
        
        {/* Floating orbs */}
        <motion.div
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-amber-500/[0.07] blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.05] blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-orange-500/[0.04] blur-[80px]"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Top-down fade vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-950" />
      </div>

      {/* ── Main Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 py-20 sm:py-24 md:py-32 text-center w-full max-w-6xl mx-auto">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/20 bg-amber-400/5 backdrop-blur-sm text-amber-300/90 text-xs tracking-[0.25em] uppercase font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            Weltreise Dokumentation
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-slate-400 text-sm sm:text-base md:text-lg font-light tracking-wide mb-4 sm:mb-6"
        >
          Authentische Geschichten von unterwegs
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-[0.9] tracking-tight mb-6 sm:mb-8"
        >
          <span className="text-white">Fernweh</span>
          <br />
          <span className="gradient-text">&amp; Fußspuren</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="max-w-xl mx-auto mb-8 sm:mb-10"
        >
          <p className="text-slate-300/80 text-sm sm:text-base md:text-lg leading-relaxed font-light">
            Philipp und Denny haben ihre Jobs gekündigt, um die Welt zu erkunden.
            Hier dokumentieren sie echte Momente – von glänzenden Metropolen bis zu goldenen Stränden.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="mb-16 sm:mb-20"
        >
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center gap-3 px-8 py-4 text-sm font-semibold tracking-wider uppercase text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:shadow-xl transition-all duration-300 active:scale-[0.98]"
          >
            <span>Geschichten erkunden</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex items-center gap-8 sm:gap-12 md:gap-16"
        >
          {[
            { value: "4", label: "Kontinente" },
            { value: "65+", label: "Tage" },
            { value: "∞", label: "Erinnerungen" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center gap-1.5">
              <span className="text-3xl sm:text-4xl md:text-5xl font-black gradient-text">{stat.value}</span>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-500 font-medium">{stat.label}</span>
              {i < 2 && <div className="hidden" />}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: isScrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          onClick={onExplore}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">Scroll</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </motion.div>
      </motion.div>
    </div>
  );
}
