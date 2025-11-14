import { TravelMap } from "./TravelMap";
import { Globe } from "lucide-react";

interface MapSectionProps {
  onLocationClick: (postId: string) => void;
}

export function MapSection({ onLocationClick }: MapSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 py-32 overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl translate-x-1/3 animate-pulse" />
        <div className="absolute top-0 left-0 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Premium Section Header */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg hover:shadow-cyan-500/50 transition-shadow duration-300">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <div className="space-y-1">
              <div className="text-sm uppercase tracking-[0.3em] text-cyan-400 font-light">
                📍 Interaktive Karte
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                Unsere globale <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Reiseroute</span>
              </h2>
            </div>
          </div>

          <p className="max-w-3xl text-gray-300 font-light text-lg leading-relaxed">
            Folgt unserer Reise rund um die Welt. Klickt auf die Marker oder die
            Legende unten, um mehr über jeden Ort zu erfahren und in die volle
            Geschichte einzutauchen. Jeder Punkt markiert ein neues Abenteuer.
          </p>
        </div>

        {/* Map Container - Premium styling */}
        <div className="group overflow-hidden rounded-3xl border border-slate-700/50 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 bg-slate-800/50 backdrop-blur-sm">
          <div className="relative h-[600px] md:h-[700px] w-full">
            <TravelMap onLocationClick={onLocationClick} />
          </div>
        </div>
      </div>
    </section>
  );
}
