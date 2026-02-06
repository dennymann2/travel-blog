import { useRef, useState } from "react";
import { BlogPost } from "./components/BlogPost";
import { blogPosts } from "./data/blog-posts";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { BlogSection } from "./components/BlogSection";
import { MapSection } from "./components/MapSection";
import { DinosaurGame } from "./components/DinosaurGame";
import { Compass, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isDinosaurGameOpen, setIsDinosaurGameOpen] = useState(false);
  const blogSectionRef = useRef<HTMLDivElement>(null);

  const selectedPost = selectedPostId 
    ? blogPosts.find(post => post.id === selectedPostId)
    : null;

  const handleExplore = () => {
    blogSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePostClick = (postId: string) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setSelectedPostId(postId);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header - shown when on post detail */}
      <AnimatePresence>
        {selectedPostId && (
          <motion.header
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sticky top-0 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl"
          >
            <div className="mx-auto max-w-7xl px-4 py-3 sm:py-4 lg:px-8">
              <button
                onClick={() => setSelectedPostId(null)}
                className="flex items-center gap-3 transition-all duration-300 hover:text-amber-400 text-white group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 flex-shrink-0 transition-shadow group-hover:shadow-amber-500/40">
                  <Compass className="h-4 w-4 text-white" />
                </div>
                <div className="text-left min-w-0">
                  <h1 className="font-bold text-sm sm:text-base text-white truncate">Fernweh & Fußspuren</h1>
                  <p className="text-xs text-slate-500 truncate hidden sm:block">Unsere abenteuerliche Weltreise</p>
                </div>
              </button>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="post"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-950 min-h-screen"
            >
              <div className="mx-auto max-w-4xl px-4 py-6 sm:py-10 lg:px-8">
                <BlogPost 
                  post={selectedPost} 
                  onBack={() => setSelectedPostId(null)} 
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hero */}
              <Hero onExplore={handleExplore} />

              {/* Intro */}
              <IntroSection />

              {/* Blog */}
              <div ref={blogSectionRef}>
                <BlogSection 
                  posts={blogPosts} 
                  onPostClick={handlePostClick}
                />
              </div>

              {/* Map */}
              <MapSection onLocationClick={handlePostClick} />

              {/* Footer */}
              <footer className="relative border-t border-slate-800/60 bg-slate-950 text-slate-500 overflow-hidden noise-overlay">
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" />
                
                <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-20 sm:px-6 lg:px-8">
                  <div className="text-center space-y-5">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg shadow-amber-500/20 transition-all duration-300 hover:shadow-amber-500/40 flex-shrink-0">
                        <Compass className="h-5 w-5 text-white" />
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                        Fernweh & Fußspuren
                      </h3>
                      {/* Secret dinosaur game button */}
                      <button
                        onClick={() => setIsDinosaurGameOpen(true)}
                        className="ml-1 p-2 rounded-lg bg-slate-800 hover:bg-amber-500/20 text-white/80 transition-all duration-300 hover:scale-110 active:scale-95 text-sm border border-slate-700/50 hover:border-amber-500/30 flex-shrink-0"
                        title="Geheimes Spiel freigeschalten! 🦖"
                      >
                        🦖
                      </button>
                    </div>
                    <p className="text-slate-400 text-sm sm:text-base font-light">
                      Folgt uns auf unserem Weg durch die Welt
                    </p>
                    <p className="text-xs text-slate-600">
                      Alle Geschichten sind echt – unsere Sehnsucht nach Abenteuer auch.
                    </p>
                  </div>
                </div>
              </footer>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      {/* Dinosaur Game Modal */}
      <DinosaurGame isOpen={isDinosaurGameOpen} onClose={() => setIsDinosaurGameOpen(false)} />
    </div>
  );
}