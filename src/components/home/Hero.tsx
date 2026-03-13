"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function Hero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Calculate progress: 0 at top, 1 when scrolled past hero
      const progress = Math.min(scrollY / (windowHeight * 0.6), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Derived values for smooth transitions
  const videoOpacity = 1 - scrollProgress * 0.4;
  const contentOpacity = 1 - scrollProgress * 0.6;
  const overlayOpacity = scrollProgress * 0.5;

  return (
    <section className="relative h-screen pt-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background video - Desktop */}
      <video
        src="/videos/horiz_bgd.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-100 ${
          hasMounted && isMobile ? "hidden" : ""
        }`}
        style={{ opacity: videoOpacity }}
      />

      {/* Background video - Mobile (vertical) */}
      {hasMounted && isMobile && (
        <video
          src="/videos/bgd-video1.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-100"
          style={{ opacity: videoOpacity }}
        />
      )}

      {/* Layered gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.45) 45%,
              rgba(0,0,0,0.35) 70%,
              rgba(0,0,0,0.65) 100%
            )
          `,
        }}
      />

      {/* Scroll-based darkening overlay */}
      <div
        className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-100"
        style={{ opacity: overlayOpacity }}
      />

      {/* Subtle radial accent glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 35%, rgba(14,165,233,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Bottom fade gradient - intensifies on scroll for seamless handoff */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #050505 0%, transparent 100%)",
          opacity: 0.5 + scrollProgress * 0.5,
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto transition-all duration-100"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${scrollProgress * -20}px)`,
        }}
      >
        {/* Headline */}
        <div className="max-w-4xl mx-auto" style={{ textShadow: "0 4px 20px rgba(0,0,0,0.6)" }}>
          {/* Desktop headline */}
          <h1 className="hidden md:block text-7xl font-semibold tracking-tight leading-[1.05] text-white opacity-0 fade-up">
            The <span className="text-accent">Best View</span><br />
            Is From the Crowd.
          </h1>
          {/* Mobile headline - optimized line breaks */}
          <h1 className="md:hidden text-[2.75rem] font-semibold tracking-tight leading-[1.05] text-white opacity-0 fade-up">
            The <span className="text-accent">Best View</span><br />
            Is From the Crowd.
          </h1>
        </div>

        {/* Subtext */}
        <p className="text-lg md:text-xl text-white/75 max-w-3xl mx-auto mt-10 md:mt-6 opacity-0 fade-up delay-100">
          A new way to experience sports — powered by the fans who film it.
        </p>

        {/* CTA - Desktop */}
        <div className="hidden md:flex gap-4 mt-10 justify-center opacity-0 fade-up delay-200">
          <Button as="link" href="/upload" variant="primary">
            Submit Your POV
          </Button>
          <Button as="link" href="/creators" variant="ghost">
            Join the Creator Network →
          </Button>
        </div>

        {/* CTA - Mobile */}
        <div className="flex md:hidden flex-col items-center gap-4 mt-10 w-full max-w-xs opacity-0 fade-up delay-200">
          <Button as="link" href="/upload" variant="primary" className="w-full">
            Submit Your POV
          </Button>
          <Button as="link" href="/creators" variant="ghost" className="w-full">
            Join the Creator Network →
          </Button>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-up {
          animation: fadeUp 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
}
