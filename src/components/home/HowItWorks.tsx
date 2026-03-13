"use client";

import Button from "@/components/ui/Button";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    title: "Capture the Moment",
    description: "Film it from inside the crowd.",
  },
  {
    number: "02",
    title: "Submit Your POV",
    description: "Upload your clip in seconds.",
  },
  {
    number: "03",
    title: "Grow With Us",
    description: "Your footage. Your handle. Distributed across the POV network.",
  },
];

export default function HowItWorks() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative pt-14 pb-20 sm:pt-20 sm:pb-28 lg:pt-24 lg:pb-32 px-4 sm:px-6"
      style={{ backgroundColor: "#030303" }}
    >
      {/* Top gradient transition */}
      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 100%)",
        }}
      />

      <div
        className={`max-w-7xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Section Header */}
        <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl mb-10 sm:mb-20 text-center md:text-left">
          How It Works
        </h2>

        {/* Steps - Horizontal layout with dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`py-8 md:py-0 md:px-8 lg:px-12 ${
                index !== 0 ? "border-t md:border-t-0 md:border-l border-white/10" : ""
              } ${index === 0 ? "md:pl-0" : ""} ${index === steps.length - 1 ? "md:pr-0" : ""}`}
            >
              {/* Big Number */}
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold text-white/20 mb-4">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-10 sm:mt-20">
          <Button as="link" href="/upload" variant="primary">
            Submit Your POV
          </Button>
        </div>
      </div>
    </section>
  );
}
