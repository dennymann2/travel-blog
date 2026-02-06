import { TravelMap } from "./TravelMap";
import { Globe } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MapSectionProps {
  onLocationClick: (postId: string) => void;
}

export function MapSection({ onLocationClick }: MapSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-slate-950 py-20 sm:py-28 md:py-36 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.05] blur-[120px] translate-x-1/3" />
        <div className="absolute top-0 left-0 h-[300px] w-[300px] rounded-full bg-blue-500/[0.04] blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-10 sm:mb-14 space-y-5"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/20 flex-shrink-0">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <div className="space-y-1.5">
              <p className="text-xs uppercase tracking-[0.25em] text-cyan-400/80 font-medium">
                Interaktive Karte
              </p>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                Unsere globale{" "}
                <span className="gradient-text-cool">Reiseroute</span>
              </h2>
            </div>
          </div>

          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed">
            Folgt unserer Reise rund um die Welt. Klickt auf die Marker oder die
            Legende unten, um mehr über jeden Ort zu erfahren und in die volle
            Geschichte einzutauchen. Jeder Punkt markiert ein neues Abenteuer.
          </p>
        </motion.div>

        {/* Map Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-visible rounded-2xl border border-slate-800/60 shadow-2xl shadow-black/20 bg-slate-900/50 backdrop-blur-sm hover:border-cyan-500/20 transition-colors duration-500"
        >
          <div className="w-full">
            <TravelMap onLocationClick={onLocationClick} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
