import CreatorSignupForm from "@/components/CreatorSignupForm";
import CreatorsHero from "@/components/creators/CreatorsHero";

export const metadata = {
  title: "Become an Early POV Creator | POV Sports",
  description:
    "Join the first group of POV creators helping build a new kind of sports media from the crowd.",
};

export default function CreatorsPage() {
  return (
    <div className="pt-20">
      <CreatorsHero />

      {/* Sign-up Form Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 bg-surface">
        <div className="max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Join the creator network
          </h2>
          <CreatorSignupForm />
        </div>
      </section>
    </div>
  );
}
