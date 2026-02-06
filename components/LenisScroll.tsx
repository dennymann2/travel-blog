import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisScrollProps {
  children: React.ReactNode;
}

let lenisInstance: Lenis | null = null;

export function LenisScroll({ children }: LenisScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile/touch device
    const isTouchDevice = () => {
      return (
        (typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0)) ||
        window.innerWidth < 768
      );
    };

    setIsMobile(isTouchDevice());

    const handleResize = () => {
      setIsMobile(isTouchDevice());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with optimizations
    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2, // Shorter duration on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing function
      syncTouch: isMobile, // Better touch support on mobile
    });

    lenisInstance = lenis;

    // Animation loop for Lenis
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisInstance = null;
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="lenis-scroll-container">
      {children}
    </div>
  );
}

// Helper function to access Lenis instance globally
export function getLenisInstance(): Lenis | null {
  return lenisInstance;
}
