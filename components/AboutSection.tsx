import { Heart, Globe, Compass } from "lucide-react";

export function AboutSection() {
  return (
    <section className="relative border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left side - About text */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="h-1 w-12 bg-gradient-to-r from-amber-500 to-orange-600" />
                <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold">Über uns</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent leading-tight">
                Unsere Geschichte
              </h2>
            </div>
            
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Philipp und Denny haben sich entschieden, das Abenteuer ihres Lebens zu erleben. 
                Nach Jahren in der Routine haben wir unsere Jobs aufgegeben, um die Welt auf unsere eigene Weise zu erkunden.
              </p>
              <p>
                Diese Website ist mehr als nur ein Blog – sie ist eine Liebesbrief an den Planeten, an die Menschen, 
                die wir treffen, und an die Momente, die unser Leben verändern.
              </p>
              <p>
                Authentisch. Ungefiltert. Real.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-700/30">
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-amber-400">80+</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Tage unterwegs</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-amber-400">4</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Kontinente</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-amber-400">5</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Länder</div>
              </div>
            </div>
          </div>

          {/* Right side - Values */}
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Value 1 */}
              <div className="group p-6 rounded-xl border border-slate-700/30 bg-gradient-to-br from-amber-500/10 to-transparent hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex-shrink-0">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Authentizität</h3>
                    <p className="text-sm text-slate-300">
                      Wir teilen die echten Momente – nicht nur die schönen Instagram-Aufnahmen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value 2 */}
              <div className="group p-6 rounded-xl border border-slate-700/30 bg-gradient-to-br from-amber-500/10 to-transparent hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex-shrink-0">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Erkundung</h3>
                    <p className="text-sm text-slate-300">
                      Über Touristenattraktionen hinaus – wir suchen nach echten Verbindungen und versteckten Schätzen.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value 3 */}
              <div className="group p-6 rounded-xl border border-slate-700/30 bg-gradient-to-br from-amber-500/10 to-transparent hover:border-amber-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex-shrink-0">
                    <Compass className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">Inspiration</h3>
                    <p className="text-sm text-slate-300">
                      Unsere Geschichten sollen andere ermutigen, die Welt zu erkunden und ihre eigenen Abenteuer zu erleben.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
