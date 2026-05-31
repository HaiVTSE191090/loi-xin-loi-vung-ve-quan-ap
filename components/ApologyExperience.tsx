"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { apologySections } from "@/data/apologyContent";
import { useLenisScroll } from "@/hooks/useLenisScroll";
import { mediaSources } from "@/lib/media";
import AmbientParticles from "@/components/AmbientParticles";
import ApologySection from "@/components/ApologySection";
import AudioController from "@/components/AudioController";
import FloatingText from "@/components/FloatingText";
import Footer from "@/components/Footer";
import ForgivenessChoice from "@/components/ForgivenessChoice";
import Header from "@/components/Header";
import HorizontalTextSection from "@/components/HorizontalTextSection";
import InfiniteApologySlider from "@/components/InfiniteApologySlider";
import InteractiveSection from "@/components/InteractiveSection";
import IntroScreen from "@/components/IntroScreen";
import MotionPathImage from "@/components/MotionPathImage";
import RebuiltInteractiveGame from "@/components/RebuiltInteractiveGame";
import ScrambleTextSection from "@/components/ScrambleTextSection";
import VideoBackground from "@/components/VideoBackground";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ApologyExperience() {
  const [started, setStarted] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  useLenisScroll();

  return (
    <main className={`experience-shell ${started ? "is-opened" : ""}`}>
      <VideoBackground active={started} />
      <AmbientParticles active={started} />
      <FloatingText active={started} />

      <AnimatePresence>
        {!introComplete && (
          <IntroScreen onOpen={() => setStarted(true)} onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>

      <Header opened={started && introComplete} />
      <AudioController active={started} />

      <section id="start" className="hero-section section-panel">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow">A softer place to begin</p>
            <h1>Vy, I want to say something sincerely...</h1>
            <p>
              Cảm ơn Vy đã bấm vào mà không sợ bị hack, nhưng mà bài học cuộc sống là đừng bao giờ nhấp vô link lạ nha Vy !!!
            </p>
          </div>
          <MotionPathImage src={mediaSources.apologyGift} alt="Cute apology gift scene" />
        </div>
      </section>

      <section className="section-stack" aria-label="Apology placeholders">
        {apologySections.map((section, index) => {
          if (section.variant === "horizontal") {
            return <HorizontalTextSection key={section.id} {...section} />;
          }

          if (section.variant === "scramble") {
            return <ScrambleTextSection key={section.id} {...section} />;
          }

          return <ApologySection key={section.id} index={index} {...section} />;
        })}
      </section>

      <InfiniteApologySlider />
      <InteractiveSection />
      <RebuiltInteractiveGame />
      <ForgivenessChoice />
      <Footer />
    </main>
  );
}
