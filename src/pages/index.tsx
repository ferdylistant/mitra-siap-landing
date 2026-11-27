import { MotionConfig } from "framer-motion";
import Seo from "@/components/Seo";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Clients from "@/components/Clients";
import Features from "@/components/Features";
import TryIt from "@/components/TryIt";
import Showcase from "@/components/Showcase";
import WhySiap from "@/components/WhySiap";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import Cta from "@/components/Cta";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";
import { ScrollProgress } from "@/components/motion";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <Seo withSchema />
      <ScrollProgress />
      <Header />
      <main id="konten">
        <Hero />
        <Clients />
        <Features />
        <TryIt />
        <Showcase />
        <WhySiap />
        <HowItWorks />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
      <FloatingWhatsapp />
    </MotionConfig>
  );
}
