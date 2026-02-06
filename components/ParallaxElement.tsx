import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxElementProps {
  children: React.ReactNode;
  offset?: number;
  speed?: number;
  className?: string;
}

/**
 * ParallaxElement - Creates a parallax scroll effect on child elements
 * The element moves at a different speed than the viewport scroll
 * Automatically disables on mobile for better performance
 */
export function ParallaxElement({
  children,
  offset = 50,
  speed = 0.5,
  className = "",
}: ParallaxElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile
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
    if (!elementRef.current || isMobile) return; // Skip parallax on mobile

    gsap.to(elementRef.current, {
      y: offset * speed,
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [offset, speed, isMobile]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
