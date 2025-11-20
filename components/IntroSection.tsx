export function IntroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Premium background effects - Mobile optimized */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-amber-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-orange-500/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:80px_80px] opacity-20 pointer-events-none" />
      
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Premium Main Intro - Mobile optimized */}
        <div className="space-y-6 sm:space-y-8 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl">
            Eine Reise ohne
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              Rückkehr
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-3xl font-light">
            Wir sind Philipp und Denny. Vor einigen Monaten haben wir unsere Jobs gekündigt, 
            unsere Wohnungen aufgelöst, und sind mit Rucksäcken in die Welt hinausgezogen. 
            Das war nicht geplant – es passierte einfach.
          </p>

          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-3xl font-light">
            Wir hatten dieses Gefühl, das wir nicht ignorieren konnten. Ein Zug, der uns 
            antrieb, weiter zu gehen, noch einen Berg hochzusteigen, noch eine Stadt zu 
            erkunden. Was wir nicht wussten, war, dass diese Reise unser Leben 
            fundamental verändern würde.
          </p>
        </div>

        {/* Premium Stats - Mobile optimized */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 py-8 sm:py-12 border-t border-b border-slate-700/50">
          <div className="space-y-2 sm:space-y-3 group cursor-default hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">4</div>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider group-hover:text-slate-300 transition">
              Kontinente
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3 group cursor-default hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">65+</div>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider group-hover:text-slate-300 transition">
              Tage
            </p>
          </div>
          <div className="space-y-2 sm:space-y-3 group cursor-default hover:scale-105 transition-transform duration-300">
            <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent group-hover:drop-shadow-lg transition">12</div>
            <p className="text-xs sm:text-sm text-slate-400 font-semibold uppercase tracking-wider group-hover:text-slate-300 transition">
              Geschichten
            </p>
          </div>
          <div className="space-y-1 sm:space-y-2">
            <div className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-500">∞</div>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold uppercase tracking-wide">
              Erinnerungen
            </p>
          </div>
        </div>

        {/* What You'll Find - Mobile optimized */}
        <div className="space-y-6 sm:space-y-8">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Was Du hier findest
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "🌍",
                title: "Echte Geschichten",
                description:
                  "Keine Instagram-Filter, keine geschönten Momente – nur echte, unverfälschte Erlebnisse von unterwegs.",
              },
              {
                icon: "📍",
                title: "Detaillierte Routen",
                description:
                  "Sieh auf der interaktiven Karte, wohin wir gegangen sind, und lerne die Koordinaten unserer Lieblingsplätze.",
              },
              {
                icon: "💭",
                title: "Persönliche Reflexionen",
                description:
                  "Jede Reise verändert dich. Hier teilen wir, wie jeder Ort uns geprägt hat.",
              },
            ].map((item, idx) => (
              <div key={idx} className="space-y-3 p-4 sm:p-6 rounded-lg sm:rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/30 hover:border-amber-400/50 transition-colors backdrop-blur-sm">
                <div className="text-4xl sm:text-5xl">{item.icon}</div>
                <h4 className="text-base sm:text-lg font-bold text-white">{item.title}</h4>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center space-y-4 py-12">
          <p className="text-slate-300 max-w-2xl mx-auto font-light">
            Komm mit uns auf diese Reise. Lass dich von unseren Erlebnissen inspirieren, 
            lachen Sie mit uns über die Chaos-Momente, und träume zusammen mit uns von 
            den Orten, die noch auf uns warten.
          </p>
        </div>
      </div>
    </section>
  );
}
