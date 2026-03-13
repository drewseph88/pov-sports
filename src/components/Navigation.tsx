"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-border">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between md:justify-between">
          {/* Spacer for mobile centering */}
          <div className="w-10 md:hidden" />

          {/* Logo - centered on mobile, left on desktop */}
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity duration-250 md:flex-none absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0"
          >
            <Image
              src="/images/povlogo2.png"
              alt="POV Sports"
              width={200}
              height={60}
              className="h-auto w-[150px] sm:w-[200px]"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors duration-250 ${pathname === "/" ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              Home
            </Link>
            <Link
              href="/creators"
              className={`text-sm font-medium transition-colors duration-250 ${pathname === "/creators" ? "text-white" : "text-white/60 hover:text-white"}`}
            >
              Creators
            </Link>
            <Link
              href="/upload"
              className="inline-flex items-center justify-center px-4 py-2 min-h-touch text-sm font-medium text-black bg-white rounded-[12px] hover:bg-white/90 transition-colors duration-250"
            >
              Upload a Clip
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        style={{ top: "80px" }}
      >
        <nav className="flex items-center justify-center h-full -mt-20">
          <div className="flex flex-col items-start gap-8">
            <Link
              href="/"
              className="relative text-2xl font-normal text-white/50 transition-colors duration-250"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname === "/" && (
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
              Home
            </Link>
            <Link
              href="/creators"
              className="relative text-2xl font-normal text-white/50 transition-colors duration-250"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname === "/creators" && (
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
              Creators
            </Link>
            <Link
              href="/upload"
              className="relative text-2xl font-semibold text-white transition-colors duration-250"
              onClick={() => setMobileMenuOpen(false)}
            >
              {pathname?.startsWith("/upload") && (
                <span className="absolute -left-5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/70" />
              )}
              Upload a Clip <span className="inline-block ml-1">→</span>
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
