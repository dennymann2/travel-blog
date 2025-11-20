import { BlogPost as BlogPostType } from "../types/blog";
import { MapPin, Calendar, ArrowLeft, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <article className="mx-auto max-w-4xl space-y-6 sm:space-y-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Button>

      {/* Plane Image - Only for Shanghai - ABOVE HEADER - Mobile optimized */}
      {post.id === "shanghai-skyline" && (
        <div className="my-8 sm:my-12 text-center space-y-3 sm:space-y-4">
          <div className="inline-block">
            <ImageWithFallback
              src="/images/plane/plane.jpg"
              alt="Unsere Reise beginnt hier"
              className="h-auto w-64 sm:w-80 md:w-96 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
            />
          </div>
          <p className="text-slate-300 font-light italic text-base sm:text-lg">
            Unsere Reise beginnt hier
          </p>
        </div>
      )}

      {/* Header Section - Mobile optimized */}
      <div className="space-y-3 sm:space-y-4 border-b border-slate-700/30 pb-6 sm:pb-8">
        <div className="text-xs sm:text-sm text-slate-400 font-medium uppercase tracking-widest">{post.subtitle}</div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-slate-300 pt-2 sm:pt-4 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 sm:h-5 w-4 sm:w-5 text-amber-400 flex-shrink-0" />
            <span className="font-medium">{post.date}</span>
          </div>
          <div className="hidden sm:block h-6 w-px bg-slate-700/50" />
          <div className="flex items-center gap-2">
            <MapPin className="h-4 sm:h-5 w-4 sm:w-5 text-amber-400 flex-shrink-0" />
            <span className="font-medium truncate">{post.location}</span>
          </div>
          <div className="sm:ml-auto rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-amber-300 border border-amber-500/40 backdrop-blur-sm">
            Tag {post.day}
          </div>
        </div>
      </div>

      {/* Featured Image - Mobile optimized */}
      <div className="overflow-hidden rounded-lg sm:rounded-2xl border border-slate-700/30 shadow-lg sm:shadow-2xl sm:shadow-amber-500/10">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-auto w-full"
          loading="eager"
        />
      </div>

      {/* Content Section - Mobile optimized */}
      <div className="space-y-4 sm:space-y-6">
        {post.content.map((paragraph, index) => (
          <p 
            key={index} 
            className="text-base sm:text-lg leading-relaxed text-slate-300 font-light"
          >
            {paragraph}
          </p>
        ))}

        {post.quote && (
          <div className="my-8 sm:my-12 border-l-4 border-amber-400 bg-gradient-to-r from-amber-500/10 to-transparent p-4 sm:p-8 rounded-r-lg backdrop-blur-sm">
            <Quote className="mb-3 sm:mb-4 h-6 sm:h-8 w-6 sm:w-8 text-amber-400" />
            <p className="italic text-lg sm:text-xl text-slate-100 font-semibold">
              "{post.quote}"
            </p>
          </div>
        )}

        <div className="my-8 sm:my-12 rounded-lg sm:rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-4 sm:p-8 backdrop-blur-sm">
          <div className="mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-widest font-bold text-amber-300">
            ✨ Persönliches Fazit
          </div>
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-light">
            {post.reflection}
          </p>
        </div>

        {/* Gallery Section - Mobile optimized */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="my-8 sm:my-12 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">📸 Bildergalerie</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {post.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-lg sm:rounded-xl border border-slate-700/30 shadow-md sm:shadow-lg hover:shadow-amber-500/20 transition-shadow">
                  <ImageWithFallback
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section - Mobile optimized */}
        {post.videos && post.videos.length > 0 && (
          <div className="my-8 sm:my-12 space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest">🎬 Videos</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {post.videos.map((video, index) => (
                <div key={index} className="overflow-hidden rounded-lg sm:rounded-xl border border-slate-700/30 shadow-md sm:shadow-lg bg-black">
                  <video
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    width="100%"
                    height="100%"
                    className="w-full h-48 sm:h-64 bg-black"
                    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                  >
                    <source src={video.replace('.mp4', '-h264.mp4')} type="video/mp4" />
                    <p className="text-slate-300 p-4 text-sm">
                      Your browser does not support HTML5 videos. <a href={video.replace('.mp4', '-h264.mp4')} className="text-amber-400 hover:text-amber-300">Download the video instead</a>
                    </p>
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tags Section - Mobile optimized */}
      <div className="border-t border-slate-700/30 pt-6 sm:pt-8">
        <div className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Themen
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800/60 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-slate-300 border border-slate-700/50 hover:border-amber-400/60 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
