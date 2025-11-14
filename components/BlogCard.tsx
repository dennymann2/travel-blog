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
      className="group relative overflow-hidden rounded-xl border border-slate-700/30 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-amber-400/50 cursor-pointer hover:from-slate-700/60 hover:to-slate-800/60"
    >
      {/* Image Container with Premium Overlay */}
      <div className="relative aspect-[16/12] overflow-hidden bg-slate-900">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-125"
        />
        {/* Multi-layer gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-800/20 opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Day Badge - Premium positioned */}
        <div className="absolute top-4 right-4 z-10">
          <div className="inline-block rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-lg">
            Tag {post.day}
          </div>
        </div>
      </div>
      
      {/* Content Container - Premium styling */}
      <div className="relative p-8 space-y-4 bg-gradient-to-b from-slate-800/80 to-slate-900/80">
        {/* Meta Information - Premium styled */}
        <div className="flex items-center gap-3 text-slate-300 text-sm opacity-90">
          <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <Calendar className="h-4 w-4 text-amber-400" />
            <span className="tracking-wide">{post.date}</span>
          </div>
          <div className="h-4 w-px bg-gradient-to-b from-slate-400 to-transparent" />
          <div className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span className="tracking-wide">{post.location.split(',')[0]}</span>
          </div>
        </div>
        
        {/* Subtitle - Premium typography */}
        <div className="text-sm text-slate-400 font-light tracking-widest uppercase opacity-80">
          {post.subtitle}
        </div>
        
        {/* Title - Premium with gradient */}
        <h3 className="text-2xl font-bold leading-snug bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent group-hover:from-amber-200 group-hover:via-orange-200 group-hover:to-amber-200 transition-all duration-300">
          {post.title}
        </h3>
        
        {/* Preview Text - Premium styling */}
        <p className="line-clamp-3 text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors duration-300">
          {post.content[0]}
        </p>
        
        {/* Tags - Premium chip design */}
        <div className="flex flex-wrap gap-2 pt-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-700/60 backdrop-blur-sm px-3 py-1 text-xs text-slate-300 font-medium border border-slate-600/50 hover:border-amber-400/60 hover:bg-amber-500/20 hover:text-amber-200 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA Arrow - Premium animated */}
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm pt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <span className="tracking-widest uppercase">Lesen</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
        </div>
      </div>
      
      {/* Premium bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </article>
  );
}
