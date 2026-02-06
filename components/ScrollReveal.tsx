import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

/**
 * ScrollReveal - Reveals content with a smooth animation on scroll
 * Creates a staggered text reveal effect as elements come into view
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Split text into characters if it's text content
    const element = elementRef.current;
    const text = element.textContent || "";

    // Only apply character split if it's actual text
    if (text && element.children.length === 0) {
      element.innerHTML = text
        .split("")
        .map((char) =>
          char === " "
            ? `<span class="inline-block w-1"></span>`
            : `<span class="inline-block overflow-hidden"><span class="inline-block">${char}</span></span>`
        )
        .join("");
    }

    const chars = element.querySelectorAll("span > span");

    gsap.fromTo(
      chars,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.02,
        delay,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "top 20%",
          scrub: 0.5,
          markers: false,
        },
        ease: "power2.out",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
