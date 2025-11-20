import { useRef, useState } from "react";
import { BlogPost } from "./components/BlogPost";
import { blogPosts } from "./data/blog-posts";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { BlogSection } from "./components/BlogSection";
import { MapSection } from "./components/MapSection";
import { DinosaurGame } from "./components/DinosaurGame";
import { Compass } from "lucide-react";

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
    <div className="min-h-screen bg-slate-900">
      {/* Premium Header - only shown when on post detail - Mobile optimized */}
      {selectedPostId && (
        <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:py-6 lg:px-8">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-2 sm:gap-3 transition-all duration-300 hover:text-amber-400 text-white text-sm sm:text-base"
            >
              <div className="flex h-8 sm:h-10 w-8 sm:w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg hover:shadow-amber-500/50 transition-shadow flex-shrink-0">
                <Compass className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
              </div>
              <div className="text-left min-w-0">
                <h1 className="font-bold text-white truncate">Fernweh & Fußspuren</h1>
                <p className="text-xs sm:text-sm text-slate-400 truncate">Unsere abenteuerliche Weltreise</p>
              </div>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {selectedPost ? (
          <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen">
            <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8 md:py-12 lg:px-8">
              <BlogPost 
                post={selectedPost} 
                onBack={() => setSelectedPostId(null)} 
              />
            </div>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <Hero onExplore={handleExplore} />

            {/* Intro Section */}
            <IntroSection />

            {/* Blog Section */}
            <div ref={blogSectionRef}>
              <BlogSection 
                posts={blogPosts} 
                onPostClick={handlePostClick}
              />
            </div>

            {/* Map Section */}
            <MapSection onLocationClick={handlePostClick} />

            {/* Premium Footer - Mobile optimized */}
            <footer className="relative border-t border-slate-700/50 bg-gradient-to-b from-slate-800 to-slate-900 text-slate-400 overflow-hidden">
              {/* Footer background effects */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:80px_80px] opacity-10 pointer-events-none" />
              
              <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    <div className="flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg hover:shadow-amber-500/50 transition-all duration-300 flex-shrink-0">
                      <Compass className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      Fernweh & Fußspuren
                    </h3>
                    {/* Secret dinosaur game button */}
                    <button
                      onClick={() => setIsDinosaurGameOpen(true)}
                      className="ml-1 sm:ml-2 p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 transform hover:scale-110 active:scale-95 text-sm sm:text-base flex-shrink-0"
                      title="Geheimes Spiel freigeschalten! 🦖"
                    >
                      🦖
                    </button>
                  </div>
                  <p className="text-slate-300 text-base sm:text-lg">
                    Folgt uns auf unserem Weg durch die Welt
                  </p>
                  <p className="text-xs sm:text-sm text-slate-500 font-light">
                    Alle Geschichten sind echt – unsere Sehnsucht nach Abenteuer auch.
                  </p>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
      
      {/* Dinosaur Game Modal */}
      <DinosaurGame isOpen={isDinosaurGameOpen} onClose={() => setIsDinosaurGameOpen(false)} />
    </div>
  );
}