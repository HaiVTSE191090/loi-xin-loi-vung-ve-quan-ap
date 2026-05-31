"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { mediaSources } from "@/lib/media";

type IntroScreenProps = {
  onOpen: () => void;
  onComplete: () => void;
};

gsap.registerPlugin(useGSAP);

const sparkles = Array.from({ length: 18 }, (_, index) => index);

export default function IntroScreen({ onOpen, onComplete }: IntroScreenProps) {
  const screenRef = useRef<HTMLElement>(null);
  const [opening, setOpening] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("intro-scroll-lock");
    document.body.classList.add("intro-scroll-lock");

    return () => {
      document.documentElement.classList.remove("intro-scroll-lock");
      document.body.classList.remove("intro-scroll-lock");
    };
  }, []);

  const { contextSafe } = useGSAP(
    () => {
      gsap.to(".intro-orbit", {
        rotation: 360,
        duration: 26,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".intro-image-frame", {
        y: -10,
        rotation: -1.4,
        duration: 4.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.from(".intro-spark", {
        autoAlpha: 0,
        scale: 0,
        y: 18,
        duration: 1.2,
        stagger: { amount: 0.65, from: "random" },
        ease: "back.out(1.8)"
      });
    },
    { scope: screenRef }
  );

  const openExperience = contextSafe(() => {
    if (opening || !screenRef.current) return;
    setOpening(true);
    onOpen();

    gsap
      .timeline({ defaults: { ease: "power3.inOut" }, onComplete })
      .to(".intro-card", { y: -36, scale: 0.92, autoAlpha: 0, duration: 0.72 })
      .to(".intro-image-frame", { y: -120, scale: 0.72, rotation: -8, autoAlpha: 0, duration: 0.76 }, "<0.06")
      .to(".intro-portal", { scale: 22, autoAlpha: 1, duration: 1.08 }, "<0.02")
      .to(".intro-curtain.is-left", { xPercent: -105, duration: 1.08 }, "<")
      .to(".intro-curtain.is-right", { xPercent: 105, duration: 1.08 }, "<")
      .to(screenRef.current, { autoAlpha: 0, duration: 0.34 }, "-=0.22");
  });

  return (
    <motion.section
      ref={screenRef}
      className="intro-screen"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-label="Open the apology"
    >
      <div className="intro-curtain is-left" aria-hidden="true" />
      <div className="intro-curtain is-right" aria-hidden="true" />
      <div className="intro-portal" aria-hidden="true" />
      <div className="intro-orbit" aria-hidden="true">
        {sparkles.map((sparkle) => (
          <i key={sparkle} className="intro-spark" />
        ))}
      </div>

      <motion.figure
        className="intro-image-frame"
        initial={{ opacity: 0, y: 34, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      >
        <img src={mediaSources.heroNote} alt="" />
      </motion.figure>

      <motion.div
        className="intro-card"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="eyebrow">Before the music starts</p>
        <h2>Open this softly</h2>
        <p>A quiet little doorway before the music, video, and words begin.</p>
        <button className="primary-button intro-open-button" type="button" onClick={openExperience} disabled={opening}>
          <span>{opening ? "Opening..." : "Open the apology"}</span>
        </button>
      </motion.div>
    </motion.section>
  );
}
