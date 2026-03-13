"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function MissionStatement() {
  const { ref, isVisible } = useScrollReveal();
  const sectionRef = useRef<HTMLElement>(null);
  const imageStackRef = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [cursorOffset, setCursorOffset] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  // Check for desktop (hover-capable device)
  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far through the section we've scrolled (-1 to 1 range)
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const offset = (viewportCenter - sectionCenter) / windowHeight;

      setParallaxOffset(offset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cursor tracking for depth effect
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isDesktop || !imageStackRef.current) return;

      const rect = imageStackRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset from center (-1 to 1 range)
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      setCursorOffset({ x, y });
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    setCursorOffset({ x: 0, y: 0 });
  }, []);

  return (
    <section
      ref={(el) => {
        (ref as React.MutableRefObject<HTMLElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative overflow-hidden py-20 sm:py-28 lg:py-32 px-4 sm:px-6"
      style={{ backgroundColor: "#050505" }}
    >
      {/* Top gradient transition */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
        }}
      />

      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left side - Text content */}
          <div className="lg:w-1/2 lg:max-w-xl">
            {/* Eyebrow */}
            <p className="text-white/60 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              Creator-Powered
            </p>

            {/* Headline */}
            <h2 className="text-white font-bold leading-tight mb-6">
              <span className="block" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                Fans don&apos;t just watch the game.
              </span>
              <span className="block" style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}>
                They capture it.
              </span>
            </h2>

            {/* Supporting paragraph */}
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8">
              POV turns fan-filmed moments into a new way to experience sports — and gives creators the platform to grow, be discovered, and own their perspective.
            </p>

            {/* CTA */}
            <Button as="link" href="/creators" variant="primary">
              Join the Creator Network →
            </Button>
          </div>

          {/* Right side - Phone stack images */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <div
              ref={imageStackRef}
              className="relative w-full max-w-lg h-[420px] sm:h-[480px] lg:h-[520px]"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image 1 - Left, rotated left (back layer - least cursor movement) */}
              <div
                className="absolute left-0 top-16 w-[38%] rounded-2xl overflow-hidden shadow-xl will-change-transform transition-transform duration-200 ease-out"
                style={{
                  aspectRatio: '9/16',
                  transform: `rotate(-4deg) translateY(${parallaxOffset * 25}px) translate(${cursorOffset.x * 4}px, ${cursorOffset.y * 4}px)`,
                  zIndex: 1,
                }}
              >
                <img
                  src="/images/creatorimage2.jpg"
                  alt="Creator filming sports"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 3 - Center, elevated (front layer - most cursor movement) */}
              <div
                className="absolute left-1/2 top-4 w-[42%] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] will-change-transform transition-transform duration-200 ease-out"
                style={{
                  aspectRatio: '9/16',
                  transform: `translateX(-50%) rotate(1deg) translateY(${parallaxOffset * 8}px) translate(${cursorOffset.x * 12}px, ${cursorOffset.y * 12}px)`,
                  zIndex: 3,
                }}
              >
                <img
                  src="/images/creatorimage3.jpg"
                  alt="Fan capturing the moment"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image 2 - Right, rotated right (back layer - least cursor movement) */}
              <div
                className="absolute right-0 top-20 w-[38%] rounded-2xl overflow-hidden shadow-xl will-change-transform transition-transform duration-200 ease-out"
                style={{
                  aspectRatio: '9/16',
                  transform: `rotate(5deg) translateY(${parallaxOffset * 20}px) translate(${cursorOffset.x * 6}px, ${cursorOffset.y * 6}px)`,
                  zIndex: 1,
                }}
              >
                <img
                  src="/images/creatorimage1.jpg"
                  alt="Sports from the crowd"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
