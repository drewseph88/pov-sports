import Hero from "@/components/home/Hero";
import MultiSportGrid from "@/components/home/MultiSportGrid";
import MissionStatement from "@/components/home/MissionStatement";
import HowItWorks from "@/components/home/HowItWorks";

export default function Home() {
  return (
    <div>
      <Hero />
      <MissionStatement />
      <MultiSportGrid />
      <HowItWorks />
    </div>
  );
}
