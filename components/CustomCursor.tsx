import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * CustomCursor - Premium custom cursor with particle and parallax effects
 * Creates a smooth, interactive cursor experience with glow and trail effects
 * Automatically disables on mobile/touch devices
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLCanvasElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const trailRef2 = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
  }>>([]);

  useEffect(() => {
    // Detect mobile/touch device
    const isTouchDevice = () => {
      return (
        (typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            navigator.maxTouchPoints > 0)) ||
        false
      );
    };

    setIsMobile(isTouchDevice());

    // Also check for small screens
    const handleResize = () => {
      setIsMobile(isTouchDevice() || window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return; // Skip initialization on mobile

    // Initialize canvas trail
    if (trailRef.current) {
      const ctx = trailRef.current.getContext("2d");
      trailRef2.current = ctx;
      trailRef.current.width = window.innerWidth;
      trailRef.current.height = window.innerHeight;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setTargetPos({ x, y });

      // Add particle trail - reduced on lower-end devices
      if (Math.random() > 0.75) {
        particlesRef.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 4,
          vy: (Math.random() - 0.5) * 4,
          life: 1,
        });
      }

      // Keep only recent particles - limit for performance
      if (particlesRef.current.length > 30) {
        particlesRef.current.shift();
      }
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Animation loop for smooth cursor movement and particles
    let animationFrameId: number;
    const animateCursor = () => {
      setCursorPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.15,
        y: prev.y + (targetPos.y - prev.y) * 0.15,
      }));

      // Update particles
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          vy: p.vy + 0.1, // gravity
          life: p.life - 0.02,
        }))
        .filter((p) => p.life > 0);

      // Draw particles on canvas
      if (trailRef2.current && trailRef.current) {
        const ctx = trailRef2.current;
        ctx.clearRect(0, 0, trailRef.current.width, trailRef.current.height);

        particlesRef.current.forEach((p) => {
          ctx.fillStyle = `rgba(245, 158, 11, ${p.life * 0.4})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetPos, isMobile]);

  // Animate cursor based on hover state
  useEffect(() => {
    if (isMobile) return;

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        width: isHovering ? 40 : 24,
        height: isHovering ? 40 : 24,
        duration: 0.3,
        ease: "power2.out",
      });
    }

    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: isHovering ? 1 : 0.6,
        scale: isHovering ? 1.5 : 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [isHovering, isMobile]);

  if (isMobile) {
    return null; // Don't render custom cursor on mobile
  }

  return (
    <>
      {/* Particle trail canvas */}
      <canvas
        ref={trailRef}
        className="fixed inset-0 pointer-events-none z-50"
      />

      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-6 h-6 bg-amber-400/20 border-2 border-amber-400 rounded-full pointer-events-none z-50 mix-blend-screen"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* Glow effect */}
      <div
        ref={glowRef}
        className="fixed w-16 h-16 bg-gradient-radial from-amber-400/30 to-transparent rounded-full pointer-events-none z-40 blur-xl"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Hide default cursor on desktop */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
    </>
  );
}
