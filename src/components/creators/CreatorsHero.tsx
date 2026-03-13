"use client";

import { useState, useEffect } from "react";

const stadiumImages = [
  "/images/bballarena.png",
  "/images/nflstadium.png",
  "/images/soccerstadium.png",
  "/images/mmaarena.png",
];

export default function CreatorsHero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % stadiumImages.length);
    }, 7500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Images */}
      {stadiumImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 scale-110 transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
            opacity: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Bottom Gradient Fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(23,23,23,1) 0%, transparent 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-12 sm:pt-16 pb-6 sm:pb-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
            Become an Early POV Creator
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto text-balance">
            POV is partnering with creators before the platform launches. Early
            creators help shape the future of how sports are experienced online.
          </p>
        </div>
      </div>

      {/* Why become a POV Creator Content */}
      <div className="relative z-10 px-4 sm:px-6 pt-4 sm:pt-6 pb-16 sm:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <div>
            <button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="inline-flex items-center gap-3 cursor-pointer"
            >
              <h2 className="text-lg sm:text-xl font-semibold text-accent">
                Why become a POV Creator?
              </h2>
              <svg
                className={`w-5 h-5 text-accent shrink-0 transition-transform duration-300 ease-in-out ${
                  isAccordionOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Animated accordion content */}
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-in-out"
              style={{
                gridTemplateRows: isAccordionOpen ? "1fr" : "0fr",
              }}
            >
              <div className="overflow-hidden">
                <div
                  className={`pt-6 text-left transition-all duration-300 ease-in-out ${
                    isAccordionOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-2"
                  }`}
                >
                  <p className="text-lg text-text-muted leading-relaxed mb-4">
                    POV Creators are fans who film games and want to own their perspective.
                  </p>
                  <p className="text-lg text-text-muted leading-relaxed mb-4">
                    We&apos;re building POV so creators can share their clips, grow an audience,
                    and eventually get paid for their footage.
                  </p>
                  <p className="text-lg text-text-muted leading-relaxed mb-2">
                    Early creators get:
                  </p>
                  <ul className="text-lg text-text-muted leading-relaxed mb-4 list-disc list-inside space-y-1">
                    <li>Priority access when the platform launches</li>
                    <li>A voice in shaping what we build</li>
                    <li>Recognition when their POV is shared with our audience</li>
                  </ul>
                  <p className="text-lg text-white font-medium">
                    If you regularly film games, this is how you can get involved early.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
