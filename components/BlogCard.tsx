import { BlogPost } from "../types/blog";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

export function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <article 
      onClick={onClick}
      className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-lg sm:shadow-xl transition-all duration-500 hover:shadow-lg sm:hover:shadow-2xl hover:border-amber-400/50 cursor-pointer hover:from-slate-700/60 hover:to-slate-800/60"
    >
      {/* Image Container with Premium Overlay - Mobile optimized */}
      <div className="relative aspect-[16/12] overflow-hidden bg-slate-900">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 sm:duration-700 group-hover:scale-105 sm:group-hover:scale-125"
          loading="lazy"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-800/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Day Badge - Mobile optimized */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <div className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-2.5 sm:px-4 py-1 sm:py-2 text-xs font-bold text-white shadow-lg">
            Tag {post.day}
          </div>
        </div>
      </div>
      
      {/* Content Container - Mobile optimized */}
      <div className="relative p-4 sm:p-6 md:p-8 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-800/80 to-slate-900/80">
        {/* Meta Information - Mobile optimized */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 text-slate-300 text-xs sm:text-sm opacity-90">
          <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Calendar className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-amber-400 flex-shrink-0" />
            <span className="tracking-wide">{post.date}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-gradient-to-b from-slate-400 to-transparent" />
          <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <MapPin className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-amber-400 flex-shrink-0" />
            <span className="tracking-wide truncate">{post.location.split(',')[0]}</span>
          </div>
        </div>
        
        {/* Subtitle - Mobile optimized */}
        <div className="text-xs sm:text-sm text-slate-400 font-light tracking-widest uppercase opacity-80 line-clamp-1">
          {post.subtitle}
        </div>
        
        {/* Title - Mobile optimized */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold leading-snug line-clamp-2 bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-orange-200 group-hover:to-amber-200 transition-all duration-300">
          {post.title}
        </h3>
        
        {/* Preview Text - Mobile optimized, hidden on very small screens */}
        <p className="hidden sm:line-clamp-3 text-slate-400 leading-relaxed text-sm md:text-base group-hover:text-slate-300 transition-colors duration-300">
          {post.content[0]}
        </p>
        
        {/* Tags - Mobile optimized, limited display on mobile */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-700/60 backdrop-blur-sm px-2 sm:px-3 py-0.5 sm:py-1 text-xs text-slate-300 font-medium border border-slate-600/50 hover:border-amber-400/60 hover:bg-amber-500/20 hover:text-amber-200 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="text-xs text-slate-500">+{post.tags.length - 2}</span>
          )}
        </div>

        {/* CTA Arrow - Mobile optimized, always visible on mobile */}
        <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm pt-4 sm:pt-6 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 sm:transform sm:translate-y-2 sm:group-hover:translate-y-0">
          <span className="tracking-widest uppercase">Lesen</span>
          <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5 transition-transform duration-300 sm:group-hover:translate-x-2" />
        </div>
      </div>
      
      {/* Premium bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
}
