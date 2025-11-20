import { useEffect, useRef, useState } from 'react';

interface DinosaurGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DinosaurGame({ isOpen, onClose }: DinosaurGameProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl mx-4 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-slate-800 hover:bg-red-600/30 text-slate-300 hover:text-red-400 transition-all duration-300 border border-slate-700 hover:border-red-500/50"
          title="Spiel schließen"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Game header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-4 border-b border-slate-700">
          <h2 className="text-xl font-bold text-white">🦖 Dinosaur Game</h2>
          <p className="text-sm text-slate-400">Drücke die Leertaste zum Springen!</p>
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
      </div>
    </div>
  );
}
