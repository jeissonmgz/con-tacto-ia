import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import UseCases from "@/components/landing/UseCases";
import Differential from "@/components/landing/Differential";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      <Hero />
      <HowItWorks />
      <UseCases />
      <Differential />
    </main>
  );
}
