import { BlogPost } from "../types/blog";
import { BlogCard } from "./BlogCard";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlogSectionProps {
  posts: BlogPost[];
  onPostClick: (postId: string) => void;
}

export function BlogSection({ posts, onPostClick }: BlogSectionProps) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-slate-950 py-20 sm:py-28 md:py-36 overflow-hidden noise-overlay">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-amber-500/[0.05] blur-[120px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-orange-500/[0.05] blur-[120px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/[0.03] blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 sm:mb-16 md:mb-20 space-y-5 sm:space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 max-w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
            <span className="text-xs uppercase tracking-[0.25em] text-amber-400/80 font-medium">
              Unsere Geschichten
            </span>
            <div className="h-px flex-1 max-w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
          </div>

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
            Reiseberichte aus der <br className="hidden sm:block" />
            <span className="gradient-text">ganzen Welt</span>
          </h2>

          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-slate-400 font-light leading-relaxed">
            Jeder Ort erzählt eine einzigartige Geschichte. Von den leuchtenden
            Lichtern der Metropolen bis zu den unerwarteten Momenten zwischendurch
            – hier dokumentieren wir unsere Reise voller Abenteuer und Entdeckungen.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-5 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-max w-full">
          {posts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              onClick={() => onPostClick(post.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
