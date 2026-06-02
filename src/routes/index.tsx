import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedLogo } from "@/components/AnimatedLogo";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { WhyChoose } from "@/components/landing/WhyChoose";
import { Features } from "@/components/landing/Features";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GB Browser — Navegador Android privado, rápido e completo" },
      { name: "description", content: "Navegador Android com modo desktop, modo privado, múltiplas abas, downloads, painel administrativo e licença integrada. Assine agora." },
      { property: "og:title", content: "GB Browser — Navegador Android privado e completo" },
      { property: "og:description", content: "Modo desktop, modo privado, painel administrativo e licença integrada. Para uso profissional." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-foreground">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />

      {/* Premium Loader/Reveal Splash Screen */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50"
          >
            <AnimatedLogo onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Landing Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={!showIntro ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={showIntro ? "h-screen overflow-hidden pointer-events-none" : "min-h-screen"}
      >
        <Header />
        <main>
          <Hero />
          <Benefits />
          <WhyChoose />
          <Features />
          <HowItWorks />
          <Pricing />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}
