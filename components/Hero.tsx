import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Premium moody atmosphere */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black opacity-95" />
        
        {/* Ambient light source - upper left - responsive */}
        <div className="absolute -top-32 -left-32 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse" />
        
        {/* Ambient light source - bottom right - responsive */}
        <div className="absolute -bottom-32 -right-32 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Center atmospheric glow - responsive */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 sm:w-60 md:w-80 h-40 sm:h-60 md:h-80 bg-amber-400/8 rounded-full blur-3xl" />
      </div>

      {/* Animated grid overlay - optimized for mobile */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:60px_60px] opacity-30 animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Main content - premium overlay layout - mobile optimized */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-12 sm:py-16 md:py-20 text-center z-10">
        <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8 md:space-y-12">
          {/* Premium subtitle with refined styling */}
          <div className="space-y-2 sm:space-y-4 animate-fade-in">
            <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-amber-400/30 bg-amber-400/5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] sm:tracking-[0.4em] text-amber-300 font-light">
                ✨ Weltreise Dokumentation
              </p>
            </div>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide">
              Authentische Geschichten von unterwegs
            </p>
          </div>

          {/* Main title - Bold typography with premium feel - mobile optimized */}
          <div className="space-y-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent blur-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <h1 className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-white via-amber-200 to-orange-400 bg-clip-text text-transparent tracking-tight drop-shadow-2xl">
                Fernweh & Fußspuren
              </h1>
            </div>
          </div>

          {/* Refined description with elegant styling - mobile optimized */}
          <div className="max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed font-light">
              Philipp und Denny haben ihre Jobs gekündigt, um die Welt zu erkunden. 
              Hier dokumentieren sie echte Momente – von glänzenden Metropolen bis zu goldenen Stränden.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 tracking-wider">
              65+ TAGE • 4 KONTINENTE • UNZÄHLIGE ABENTEUER
            </p>
          </div>

          {/* Premium CTA Button with enhanced effects - mobile optimized */}
          <div className="flex justify-center pt-4 sm:pt-8">
            <button
              onClick={onExplore}
              className="group relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-white transition-all duration-300 active:scale-95 overflow-hidden rounded-lg"
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 60px rgba(245, 158, 11, 0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 0 40px rgba(245, 158, 11, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <span className="hidden sm:inline">Unsere Geschichten erkunden</span>
              <span className="sm:hidden">Entdecken</span>
              <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 transition-transform group-hover:translate-x-2" />
            </button>
          </div>

          {/* Elegant stats section - mobile optimized with responsive layout */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8 md:gap-16 pt-8 sm:pt-12 md:pt-16 text-center">
            <div className="space-y-2 sm:space-y-3 group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">4</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition">Kontinente</div>
            </div>
            <div className="hidden sm:block w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
            <div className="space-y-2 sm:space-y-3 group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">65+</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition">Tage</div>
            </div>
            <div className="hidden sm:block w-px h-16 sm:h-20 bg-gradient-to-b from-transparent via-gray-600 to-transparent" />
            <div className="space-y-2 sm:space-y-3 group">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">∞</div>
              <div className="text-xs uppercase tracking-widest text-gray-400 group-hover:text-gray-300 transition">Erinnerungen</div>
            </div>
          </div>

          {/* Enhanced scroll indicator with fade effect */}
          <div 
            className={`pt-8 sm:pt-12 md:pt-20 transition-all duration-500 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="flex flex-col items-center gap-3 sm:gap-4 animate-bounce">
              <span className="text-xs uppercase tracking-widest text-gray-500">Scroll nach unten</span>
              <svg
                className="h-5 sm:h-6 w-5 sm:w-6 text-amber-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
