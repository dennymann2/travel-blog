import { BlogPost } from "../types/blog";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
  index?: number;
}

export function BlogCard({ post, onClick, index = 0 }: BlogCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm cursor-pointer transition-all duration-500 hover:border-amber-500/30 hover:bg-slate-800/50 hover:shadow-2xl hover:shadow-amber-500/[0.05]"
    >
      {/* Image */}
      <div className="relative aspect-[16/11] overflow-hidden bg-slate-900">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent opacity-70" />
        
        {/* Day badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center rounded-full bg-amber-500/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-slate-950 shadow-lg">
            Tag {post.day}
          </span>
        </div>

        {/* Arrow indicator */}
        <div className="absolute bottom-3 right-3 z-10">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <ArrowUpRight className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative p-5 sm:p-6 space-y-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-amber-500/70" />
            <span>{post.date}</span>
          </div>
          <span className="text-slate-700">·</span>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-amber-500/70" />
            <span className="truncate">{post.location.split(',')[0]}</span>
          </div>
        </div>
        
        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-[0.15em] uppercase line-clamp-1">
          {post.subtitle}
        </p>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold leading-snug text-white group-hover:text-amber-50 transition-colors duration-300 line-clamp-2">
          {post.title}
        </h3>
        
        {/* Preview */}
        <p className="hidden sm:line-clamp-2 text-sm text-slate-400 leading-relaxed">
          {post.content[0]}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-400 font-medium border border-slate-700/50 transition-colors duration-300 group-hover:border-amber-500/20 group-hover:text-amber-300/80"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[11px] text-slate-600 self-center">+{post.tags.length - 3}</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
