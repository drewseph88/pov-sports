"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useRef, useState, useEffect, useCallback } from "react";

const sports = [
  {
    name: "NBA",
    handle: "@nbafanpov",
    video: "/videos/nba_clip.MP4",
    logo: "/images/nbafanpov_logo.png",
    instagram: "https://instagram.com/nbafanpov",
  },
  {
    name: "NFL",
    handle: "@nflfanpov",
    video: "/videos/nfl_clip.MP4",
    logo: "/images/nflfanpov_logo.png",
    instagram: "https://instagram.com/nflfanpov",
  },
  {
    name: "UFC",
    handle: "@ufcfanpov",
    video: "/videos/ufc_clip2.mp4",
    logo: "/images/ufcfanpov_logo.png",
    instagram: "https://instagram.com/ufcfanpov",
  },
  {
    name: "Soccer",
    handle: "@pitchsidepov",
    video: "/videos/soccer_clip.mp4",
    logo: "/images/pitchsidepov_logo.png",
    instagram: "https://instagram.com/pitchsidepov",
  },
  {
    name: "Golf",
    handle: "@pgafanpov",
    video: "/videos/golf_clip.mp4",
    logo: "/images/pgafanpov_logo.png",
    instagram: "https://instagram.com/pgafanpov",
  },
];

// Create extended array for infinite loop effect (duplicate items at start and end)
const extendedSports = [...sports, ...sports, ...sports];
const CARD_WIDTH_PERCENT = 70; // percentage of viewport width
const CARD_GAP = 16; // gap in pixels

export default function MultiSportGrid() {
  const { ref, isVisible } = useScrollReveal();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Calculate card width in pixels
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 280;
    return Math.min((window.innerWidth * CARD_WIDTH_PERCENT) / 100, 300);
  }, []);

  // Initialize carousel to middle set of cards
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = getCardWidth();
    const initialScroll = sports.length * (cardWidth + CARD_GAP);
    carousel.scrollLeft = initialScroll;
  }, [getCardWidth]);

  // Handle scroll for pagination and infinite loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrolling) return;

      const cardWidth = getCardWidth();
      const scrollPosition = carousel.scrollLeft;
      const cardWithGap = cardWidth + CARD_GAP;

      // Calculate which card is centered
      const centerOffset = (carousel.offsetWidth - cardWidth) / 2;
      const adjustedScroll = scrollPosition + centerOffset;
      const currentIndex = Math.round(adjustedScroll / cardWithGap) % sports.length;
      setActiveIndex(currentIndex < 0 ? sports.length + currentIndex : currentIndex);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Check for infinite loop reset after scroll ends
      scrollTimeout = setTimeout(() => {
        const totalWidth = sports.length * cardWithGap;
        const minScroll = totalWidth - centerOffset;
        const maxScroll = totalWidth * 2 - centerOffset;

        if (scrollPosition < minScroll - cardWithGap) {
          setIsScrolling(true);
          carousel.scrollLeft = scrollPosition + totalWidth;
          setTimeout(() => setIsScrolling(false), 50);
        } else if (scrollPosition > maxScroll) {
          setIsScrolling(true);
          carousel.scrollLeft = scrollPosition - totalWidth;
          setTimeout(() => setIsScrolling(false), 50);
        }
      }, 100);
    };

    carousel.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      carousel.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [getCardWidth, isScrolling]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-6"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Top gradient transition */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(5,5,5,0.9) 0%, transparent 100%)",
        }}
      />

      <div
        className={`max-w-6xl mx-auto text-center transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Eyebrow */}
        <p className="text-sm tracking-widest uppercase text-white/60 mb-4">
          MULTI-SPORT NETWORK
        </p>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-semibold text-white max-w-3xl mx-auto mb-4">
          Check out our coverage across every major sport.
        </h2>

        {/* Subtext */}
        <p className="text-base md:text-lg text-white/70 mb-12">
          NBA • NFL • UFC • Soccer • Golf — and expanding.
        </p>

        {/* Sport Cards - Mobile Carousel */}
        <div className="md:hidden -mx-6">
          <div
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{
              paddingLeft: `calc((100vw - ${CARD_WIDTH_PERCENT}vw) / 2)`,
              paddingRight: `calc((100vw - ${CARD_WIDTH_PERCENT}vw) / 2)`,
            }}
          >
            {extendedSports.map((sport, index) => (
              <a
                key={`${sport.name}-${index}`}
                href={sport.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-xl overflow-hidden border border-border flex-shrink-0 snap-center"
                style={{ width: `${CARD_WIDTH_PERCENT}vw`, maxWidth: "300px" }}
              >
                {/* Video or Placeholder */}
                {sport.video ? (
                  <video
                    src={sport.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full aspect-[9/16] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[9/16] bg-white/10" />
                )}

                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Sport Logo (top-left) */}
                <div className="absolute top-3 left-3">
                  {sport.logo ? (
                    <img
                      src={sport.logo}
                      alt={`${sport.name} logo`}
                      className={`${sport.name === "Golf" ? "h-8" : "h-6"} w-auto object-contain drop-shadow-lg`}
                    />
                  ) : (
                    <span className="text-white font-semibold text-base">{sport.name}</span>
                  )}
                </div>

                {/* Handle (bottom-left) */}
                <div className="absolute bottom-3 left-3 text-white/90 text-sm">
                  {sport.handle}
                </div>
              </a>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {sports.map((sport, index) => (
              <div
                key={sport.name}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sport Cards - Desktop Grid */}
        <div className="hidden md:grid grid-cols-5 gap-5 max-w-5xl mx-auto">
          {sports.map((sport) => (
            <a
              key={sport.name}
              href={sport.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden border border-border transition-all duration-300 hover:-translate-y-2 hover:border-accent"
            >
              {/* Video or Placeholder */}
              {sport.video ? (
                <video
                  src={sport.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full aspect-[9/16] object-cover"
                />
              ) : (
                <div className="w-full aspect-[9/16] bg-white/10" />
              )}

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Shine sweep effect on hover */}
              <div className="card-shine absolute inset-0 pointer-events-none" />

              {/* Sport Logo (top-left) */}
              <div className="absolute top-2 left-2">
                {sport.logo ? (
                  <img
                    src={sport.logo}
                    alt={`${sport.name} logo`}
                    className={`${sport.name === "Golf" ? "h-6" : "h-4"} w-auto object-contain drop-shadow-lg`}
                  />
                ) : (
                  <span className="text-white font-semibold text-sm">{sport.name}</span>
                )}
              </div>

              {/* Handle (bottom-left) */}
              <div className="absolute bottom-2 left-2 text-white/90 text-xs">
                {sport.handle}
              </div>
            </a>
          ))}
        </div>

        {/* Expansion Text */}
        <div className="mt-10 text-center">
          <div className="text-white/50 text-4xl mb-2">+</div>
          <p className="text-lg text-white/50">
            More sports launching soon.
          </p>
        </div>
      </div>

      <style jsx>{`
        .card-shine {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.06) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 60%
          );
          background-size: 250% 100%;
          background-position: 200% 0;
          opacity: 0;
        }

        :global(.group:hover) .card-shine {
          opacity: 1;
          animation: shimmer 0.5s ease-out forwards;
        }

        @keyframes shimmer {
          from {
            background-position: 200% 0;
          }
          to {
            background-position: -100% 0;
          }
        }

        :global(.scrollbar-hide) {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        :global(.scrollbar-hide)::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
