import { useRef } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DinosaurGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DinosaurGame({ isOpen, onClose }: DinosaurGameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-2xl mx-4 bg-slate-900 rounded-2xl border border-slate-800/60 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 rounded-xl bg-slate-800/80 backdrop-blur-sm hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all duration-200 border border-slate-700/50 hover:border-red-500/30"
              title="Spiel schließen"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800/60">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🦖</span>
                <span>Dinosaur Game</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Drücke die Leertaste zum Springen!</p>
            </div>

            {/* Game container */}
            <div className="bg-white aspect-video w-full flex items-center justify-center">
              <iframe
                ref={iframeRef}
                src="https://chromedino.com/"
                className="w-full h-full border-none"
                title="Google Dinosaur Game"
                allow="fullscreen"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
