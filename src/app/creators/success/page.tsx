import Link from "next/link";

export const metadata = {
  title: "Welcome, POV Creator! | POV Sports",
  description: "You're officially an Early POV Creator.",
};

export default function CreatorSuccessPage() {
  return (
    <div className="pt-20">
      <section className="min-h-[calc(100vh-4rem)] flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              You&apos;re officially an Early POV Creator.
            </h1>
            <p className="text-lg text-text-muted leading-relaxed">
              You&apos;re part of the first group helping build POV from the ground
              up. As POV grows, we&apos;re focused on creating real earning
              opportunities for the creators who help make it possible.
            </p>
          </div>

          {/* What Happens Next */}
          <div className="bg-surface rounded-[16px] p-6 sm:p-8 mb-10">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
              What happens next
            </h2>
            <p className="text-lg text-text-muted leading-relaxed mb-6">
              Keep uploading POV clips from the games you attend.
            </p>
            <p className="text-lg text-text-muted leading-relaxed mb-4">
              Watch your inbox for:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                <span className="text-lg text-text-muted">
                  Early access to POV features
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                <span className="text-lg text-text-muted">
                  Opportunities to give feedback and influence the platform
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                <span className="text-lg text-text-muted">
                  Creator partnerships and collaborations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                <span className="text-lg text-text-muted">
                  Giveaways and experimental opportunities
                </span>
              </li>
            </ul>
            <p className="text-base text-text-subtle">
              Not every creator will receive every opportunity — but early
              creators will always be first to hear about them.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/upload"
              className="inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold text-black bg-white rounded-[12px] hover:bg-white/90 transition-colors duration-250"
            >
              Submit a POV clip
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 min-h-touch text-base font-semibold text-white bg-surface border border-border rounded-[12px] hover:bg-surface/80 transition-colors duration-250"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
