import { useRef, useState } from "react";
import { BlogPost } from "./components/BlogPost";
import { blogPosts } from "./data/blog-posts";
import { Hero } from "./components/Hero";
import { IntroSection } from "./components/IntroSection";
import { BlogSection } from "./components/BlogSection";
import { MapSection } from "./components/MapSection";
import { Compass } from "lucide-react";

export default function App() {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
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
      {/* Premium Header - only shown when on post detail */}
      {selectedPostId && (
        <header className="sticky top-0 z-40 border-b border-slate-700/50 bg-slate-950/95 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <button
              onClick={() => setSelectedPostId(null)}
              className="flex items-center gap-3 transition-all duration-300 hover:text-amber-400 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg hover:shadow-amber-500/50 transition-shadow">
                <Compass className="h-5 w-5 text-white" />
              </div>
              <div className="text-left">
                <h1 className="font-bold text-white">Fernweh & Fußspuren</h1>
                <p className="text-sm text-slate-400">Unsere abenteuerliche Weltreise</p>
              </div>
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main>
        {selectedPost ? (
          <div className="bg-gradient-to-b from-slate-950 to-slate-900 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
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

            {/* Premium Footer */}
            <footer className="relative border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-400 overflow-hidden">
              {/* Footer background effects */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-10 pointer-events-none" />
              
              <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg hover:shadow-amber-500/50 transition-all duration-300">
                      <Compass className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      Fernweh & Fußspuren
                    </h3>
                  </div>
                  <p className="text-slate-300 text-lg">
                    Folgt uns auf unserem Weg durch die Welt
                  </p>
                  <p className="text-sm text-slate-500 font-light">
                    Alle Geschichten sind echt – unsere Sehnsucht nach Abenteuer auch.
                  </p>
                </div>
              </div>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}