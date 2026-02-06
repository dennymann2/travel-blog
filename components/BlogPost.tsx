import { BlogPost as BlogPostType } from "../types/blog";
import { MapPin, Calendar, ArrowLeft, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./ImageWithFallback";
import { motion } from "framer-motion";

interface BlogPostProps {
  post: BlogPostType;
  onBack: () => void;
}

export function BlogPost({ post, onBack }: BlogPostProps) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-4xl space-y-8 sm:space-y-10"
    >
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Button
          variant="ghost"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Zurück zur Übersicht
        </Button>
      </motion.div>

      {/* Plane Image - Only for Shanghai */}
      {post.id === "shanghai-skyline" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="my-8 sm:my-12 text-center space-y-4"
        >
          <div className="inline-block">
            <ImageWithFallback
              src="/images/plane/plane.jpg"
              alt="Unsere Reise beginnt hier"
              className="h-auto w-64 sm:w-80 md:w-96 object-contain opacity-90 hover:opacity-100 transition-opacity duration-300 rounded-2xl"
              loading="lazy"
            />
          </div>
          <p className="text-slate-400 font-light italic text-base sm:text-lg font-display">
            Unsere Reise beginnt hier
          </p>
        </motion.div>
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="space-y-4 border-b border-slate-800/60 pb-8"
      >
        <p className="text-xs sm:text-sm text-amber-400/80 font-medium uppercase tracking-[0.2em]">
          {post.subtitle}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-slate-400 pt-4 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-amber-500/70" />
            <span className="font-medium">{post.date}</span>
          </div>
          <span className="hidden sm:inline text-slate-700">·</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-amber-500/70" />
            <span className="font-medium">{post.location}</span>
          </div>
          <div className="sm:ml-auto">
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-amber-400 border border-amber-500/20">
              Tag {post.day}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="overflow-hidden rounded-2xl border border-slate-800/60 shadow-2xl shadow-black/20"
      >
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="h-auto w-full"
          loading="eager"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="space-y-5 sm:space-y-6"
      >
        {post.content.map((paragraph, index) => (
          <p 
            key={index} 
            className="text-base sm:text-lg leading-[1.8] text-slate-300/90 font-light"
          >
            {paragraph}
          </p>
        ))}

        {/* Quote */}
        {post.quote && (
          <div className="my-10 sm:my-14 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600" />
            <div className="pl-6 sm:pl-8 py-2">
              <Quote className="mb-3 h-6 w-6 text-amber-500/50" />
              <p className="font-display italic text-xl sm:text-2xl text-white/90 leading-relaxed font-medium">
                &ldquo;{post.quote}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Reflection */}
        <div className="my-10 sm:my-14 rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] to-orange-500/[0.03] p-6 sm:p-8 backdrop-blur-sm">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] font-semibold text-amber-400/70">
            Persönliches Fazit
          </div>
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-light">
            {post.reflection}
          </p>
        </div>

        {/* Gallery */}
        {post.gallery && post.gallery.length > 0 && (
          <div className="my-10 sm:my-14 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">📸</span>
              <span className="uppercase tracking-[0.1em] text-sm sm:text-base">Bildergalerie</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {post.gallery.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-slate-800/60 shadow-lg hover:shadow-amber-500/10 transition-all duration-300 group">
                  <ImageWithFallback
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-48 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {post.videos && post.videos.length > 0 && (
          <div className="my-10 sm:my-14 space-y-4">
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <span className="text-xl">🎬</span>
              <span className="uppercase tracking-[0.1em] text-sm sm:text-base">Videos</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {post.videos.map((video, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-slate-800/60 shadow-lg bg-black">
                  <video
                    controls
                    controlsList="nodownload"
                    preload="metadata"
                    width="100%"
                    className="w-full h-48 sm:h-64 bg-black"
                    style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
                  >
                    <source src={video.replace('.mp4', '-h264.mp4')} type="video/mp4" />
                    <p className="text-slate-300 p-4 text-sm">
                      Your browser does not support HTML5 videos.{" "}
                      <a href={video.replace('.mp4', '-h264.mp4')} className="text-amber-400 hover:text-amber-300">
                        Download the video instead
                      </a>
                    </p>
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Tags */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="border-t border-slate-800/60 pt-8"
      >
        <div className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-[0.15em]">
          Themen
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-slate-800/60 backdrop-blur-sm px-4 py-1.5 text-xs sm:text-sm font-medium text-slate-300 border border-slate-700/40 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.article>
  );
}
