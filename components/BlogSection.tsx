import { BlogPost } from "../types/blog";
import { BlogCard } from "./BlogCard";

interface BlogSectionProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
}

export function BlogSection({ posts, onPostClick }: BlogSectionProps) {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-32 overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Premium Section Header */}
        <div className="mb-20 space-y-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-amber-500" />
            <span className="text-sm uppercase tracking-[0.3em] text-amber-400 font-light">
              ✨ Unsere Geschichten
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-2xl">
            Reiseberichte aus der <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-400 to-red-500 bg-clip-text text-transparent">
              ganzen Welt
            </span>
          </h2>

          <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-300 font-light leading-relaxed">
            Jeder Ort erzählt eine einzigartige Geschichte. Von den leuchtenden
            Lichtern der Metropolen bis zu den unerwarteten Momenten zwischendurch
            – hier dokumentieren wir unsere Reise voller Abenteuer und Entdeckungen.
          </p>
        </div>

        {/* Blog Grid - Premium layout */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <div key={post.id} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
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
