import { BlogPost } from "../types/blog";
import { BlogCard } from "./BlogCard";

interface BlogSectionProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
}

export function BlogSection({ posts, onPostClick }: BlogSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-16 sm:py-24 md:py-32 overflow-hidden">
      {/* Premium animated background - Mobile optimized */}
      <div className="absolute top-0 left-0 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-amber-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 h-64 sm:h-96 w-64 sm:w-96 rounded-full bg-orange-500/10 blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 h-48 sm:h-64 w-48 sm:w-64 rounded-full bg-blue-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:80px_80px] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Premium Section Header - Mobile optimized */}
        <div className="mb-12 sm:mb-16 md:mb-20 space-y-4 sm:space-y-6 text-center">
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] text-amber-400 font-light">
              ✨ Unsere Geschichten
            </span>
            <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight drop-shadow-2xl">
            Reiseberichte aus der <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              ganzen Welt
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 font-light leading-relaxed">
            Jeder Ort erzählt eine einzigartige Geschichte. Von den leuchtenden
            Lichtern der Metropolen bis zu den unerwarteten Momenten zwischendurch
            – hier dokumentieren wir unsere Reise voller Abenteuer und Entdeckungen.
          </p>
        </div>

        {/* Blog Grid - Premium layout - Mobile responsive */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max w-full">
          {posts.map((post, index) => (
            <div key={post.id} className="animate-slide-up w-full" style={{ animationDelay: `${index * 100}ms` }}>
              <BlogCard
                post={post}
                onClick={() => onPostClick(post.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
