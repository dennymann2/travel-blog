import { TravelMap } from "./TravelMap";
import { Globe } from "lucide-react";

interface MapSectionProps {
  onLocationClick: (postId: string) => void;
}

export function MapSection({ onLocationClick }: MapSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-16 sm:py-24 md:py-32">
      {/* Premium background effects - Mobile optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-blue-500/10 blur-3xl translate-x-1/3 animate-pulse" />
        <div className="absolute top-0 left-0 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-cyan-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:80px_80px] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Premium Section Header - Mobile optimized */}
        <div className="mb-12 sm:mb-16 space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-4">
            <div className="flex h-12 sm:h-14 w-12 sm:w-14 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300 flex-shrink-0">
              <Globe className="h-6 sm:h-7 w-6 sm:w-7 text-white" />
            </div>
            <div className="space-y-2 sm:space-y-1 flex-1">
              <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-cyan-400 font-light">
                📍 Interaktive Karte
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                Unsere globale <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Reiseroute</span>
              </h2>
            </div>
          </div>

          <p className="max-w-3xl text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed">
            Folgt unserer Reise rund um die Welt. Klickt auf die Marker oder die
            Legende unten, um mehr über jeden Ort zu erfahren und in die volle
            Geschichte einzutauchen. Jeder Punkt markiert ein neues Abenteuer.
          </p>
        </div>

        {/* Map Container - Premium styling - Mobile optimized */}
        <div className="group overflow-visible rounded-xl sm:rounded-3xl border border-slate-700/50 shadow-lg sm:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm">
          <div className="w-full">
            <TravelMap onLocationClick={onLocationClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
