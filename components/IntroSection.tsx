import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

function AnimatedSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function IntroSection() {
  return (
    <section className="relative bg-slate-950 py-20 sm:py-28 md:py-36 overflow-hidden noise-overlay">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-500/[0.06] blur-[120px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-orange-500/[0.05] blur-[100px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Main Intro */}
        <div className="space-y-8">
          <AnimatedSection>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
              Eine Reise ohne
              <br />
              <span className="gradient-text">Rückkehr</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 leading-relaxed max-w-3xl font-light">
              Wir sind Philipp und Denny. Vor einigen Monaten haben wir unsere Jobs gekündigt, 
              unsere Wohnungen aufgelöst, und sind mit Rucksäcken in die Welt hinausgezogen. 
              Das war nicht geplant – es passierte einfach.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.25}>
            <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl font-light">
              Wir hatten dieses Gefühl, das wir nicht ignorieren konnten. Ein Zug, der uns 
              antrieb, weiter zu gehen, noch einen Berg hochzusteigen, noch eine Stadt zu 
              erkunden. Was wir nicht wussten, war, dass diese Reise unser Leben 
              fundamental verändern würde.
            </p>
          </AnimatedSection>
        </div>

        {/* Stats Row */}
        <AnimatedSection delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-10 sm:py-14 border-y border-slate-800/80">
            {[
              { value: "4", label: "Kontinente" },
              { value: "65+", label: "Tage" },
              { value: "12", label: "Geschichten" },
              { value: "∞", label: "Erinnerungen" },
            ].map((stat, idx) => (
              <div key={stat.label} className="group text-center sm:text-left space-y-2 cursor-default">
                <div className="text-4xl sm:text-5xl md:text-6xl font-black gradient-text transition-transform duration-300 group-hover:scale-105">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-[0.15em] group-hover:text-slate-400 transition-colors">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Feature Cards */}
        <div className="space-y-8">
          <AnimatedSection>
            <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Was Du hier findest
            </h3>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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
              <AnimatedSection key={idx} delay={idx * 0.12}>
                <div className="h-full p-6 sm:p-8 rounded-2xl glass-light hover:border-amber-500/30 transition-all duration-300 group">
                  <div className="text-4xl sm:text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{item.icon}</div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm sm:text-base text-slate-400 leading-relaxed">{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Closing CTA */}
        <AnimatedSection delay={0.1}>
          <div className="text-center py-8">
            <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
              Komm mit uns auf diese Reise. Lass dich von unseren Erlebnissen inspirieren, 
              lachen Sie mit uns über die Chaos-Momente, und träume zusammen mit uns von 
              den Orten, die noch auf uns warten.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
