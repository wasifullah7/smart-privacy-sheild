import { Header } from "@/components/Header";
import { HowItWorks } from "@/components/HowItWorks";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      <Header />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </div>
  );
}
