import Link from "next/link";
import { Check } from "lucide-react";

export default function UploadSuccessPage() {
  return (
    <div className="pt-20 min-h-screen flex items-center">
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="w-8 h-8 text-accent" />
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Your POV clip has been submitted.
        </h1>

        {/* Subtext */}
        <p className="text-text-muted text-lg mb-8 max-w-md mx-auto">
          Thanks for helping capture the energy of live sports. We&apos;ll review
          your clip and credit you if it&apos;s featured.
        </p>

        {/* Confirmation Details */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center justify-center gap-2 text-text-muted">
            <Check className="w-4 h-4 text-accent" />
            <span>Full quality received</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-text-muted">
            <Check className="w-4 h-4 text-accent" />
            <span>No compression applied</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/upload"
            className="inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold text-black bg-white rounded-[12px] hover:bg-white/90 transition-colors duration-250"
          >
            Submit Another Clip
          </Link>
          <Link
            href="/creators"
            className="inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold text-white bg-surface border border-border rounded-[12px] hover:bg-surface-hover transition-colors duration-250"
          >
            I Film Games Often →
          </Link>
        </div>
      </div>
    </div>
  );
}
