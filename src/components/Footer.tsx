import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { name: "NBA", href: "https://www.instagram.com/nbafanpov" },
    { name: "NFL", href: "https://www.instagram.com/nflfanpov" },
    { name: "UFC", href: "https://www.instagram.com/ufcfanpov" },
    { name: "Soccer", href: "https://www.instagram.com/pitchsidepov" },
    { name: "Golf", href: "https://www.instagram.com/pgafanpov" },
  ];

  return (
    <footer className="border-t border-border bg-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Social Links */}
        <div className="flex flex-wrap gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-white transition-colors duration-250 text-sm"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Contact */}
        <div className="mb-6">
          <a
            href="mailto:contact@pov-sports.com"
            className="text-accent hover:text-accent/80 transition-colors duration-250 text-sm"
          >
            contact@pov-sports.com
          </a>
        </div>

        {/* Legal Links */}
        <div className="flex gap-4 mb-8">
          <Link
            href="#"
            className="text-text-subtle hover:text-text-muted transition-colors duration-250 text-sm"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-text-subtle hover:text-text-muted transition-colors duration-250 text-sm"
          >
            Privacy
          </Link>
        </div>

        {/* Note */}
        <p className="text-text-subtle text-xs">
          Only upload videos you filmed
        </p>
      </div>
    </footer>
  );
}
