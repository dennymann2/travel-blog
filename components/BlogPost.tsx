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
    <article className="mx-auto max-w-4xl space-y-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors duration-300"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zur Übersicht
      </Button>

      {/* Plane Image - Only for Shanghai - ABOVE HEADER */}
      {post.id === "shanghai-skyline" && (
        <div className="my-12 text-center space-y-4">
          <div className="inline-block">
            <ImageWithFallback
              src="/images/plane/plane.jpg"
              alt="Unsere Reise beginnt hier"
              className="h-96 w-96 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
            />
          </div>
          <p className="text-slate-300 font-light italic text-lg">
            Unsere Reise beginnt hier
          </p>
        </div>
      )}

      {/* Header Section */}
      <div className="space-y-4 border-b border-slate-700/30 pb-8">
        <div className="text-sm text-slate-400 font-medium uppercase tracking-widest">{post.subtitle}</div>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-slate-300 pt-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span className="font-medium">{post.date}</span>
          </div>
          <div className="h-6 w-px bg-slate-700/50" />
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-amber-400" />
            <span className="font-medium">{post.location}</span>
          </div>
          <div className="ml-auto rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2 text-sm font-semibold text-amber-300 border border-amber-500/40 backdrop-blur-sm">
            Tag {post.day}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="overflow-hidden rounded-2xl border border-slate-700/30 shadow-2xl shadow-amber-500/10">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-auto w-full"
        />
      </div>

      {/* Content Section */}
      <div className="space-y-6">
        {post.content.map((paragraph, index) => (
          <p 
            key={index} 
            className="text-lg leading-relaxed text-slate-300 font-light"
          >
            {paragraph}
          </p>
        ))}

        {post.quote && (
          <div className="my-12 border-l-4 border-amber-400 bg-gradient-to-r from-amber-500/10 to-transparent p-8 rounded-r-lg backdrop-blur-sm">
            <Quote className="mb-4 h-8 w-8 text-amber-400" />
            <p className="italic text-xl text-slate-100 font-semibold">
              "{post.quote}"
            </p>
          </div>
        )}

        <div className="my-12 rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-8 backdrop-blur-sm">
          <div className="mb-4 text-sm uppercase tracking-widest font-bold text-amber-300">
            ✨ Persönliches Fazit
          </div>
          <p className="text-lg text-slate-200 leading-relaxed font-light">
            {post.reflection}
          </p>
        </div>

        {/* Gallery Section */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="my-12 space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">📸 Bildergalerie</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-slate-700/30 shadow-lg hover:shadow-amber-500/20 transition-shadow">
                  <ImageWithFallback
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {post.videos && post.videos.length > 0 && (
          <div className="my-12 space-y-4">
            <h3 className="text-xl font-bold text-white uppercase tracking-widest">🎬 Videos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {post.videos.map((video, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-slate-700/30 shadow-lg bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="w-full h-64 bg-black"
                    style={{ display: 'block' }}
                  >
                    <source src={video} type="video/mp4" />
                    <p className="text-slate-300 p-4">Your browser does not support the video tag.</p>
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tags Section */}
      <div className="border-t border-slate-700/30 pt-8">
        <div className="mb-4 text-sm font-semibold text-slate-400 uppercase tracking-widest">
          Themen
        </div>
        <div className="flex flex-wrap gap-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800/60 backdrop-blur-sm px-4 py-2 text-sm font-medium text-slate-300 border border-slate-700/50 hover:border-amber-400/60 hover:bg-amber-500/20 hover:text-amber-300 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
