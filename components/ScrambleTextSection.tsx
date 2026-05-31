"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type ScrambleTextSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  reveal?: string;
};

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrambleTextPlugin);

export default function ScrambleTextSection({
  id,
  eyebrow,
  title,
  body,
  reveal
}: ScrambleTextSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const revealText = reveal ?? body;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const target = section?.querySelector(".scramble-reveal");
      if (!section || !target) return;

      target.textContent = "";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 66%",
          toggleActions: "play none none reverse"
        }
      });

      tl.from(".scramble-panel", {
        y: 54,
        autoAlpha: 0,
        duration: 0.75,
        ease: "power3.out"
      }).to(
        target,
        {
          duration: 1.25,
          scrambleText: {
            text: revealText,
            chars: "lowerCase",
            speed: 0.42,
            revealDelay: 0.18
          },
          ease: "none"
        },
        "-=0.18"
      );
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} ref={sectionRef} className="scramble-text-section section-panel">
      <article className="scramble-panel">
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p className="scramble-support">{body}</p>
        <p className="scramble-reveal" aria-label={revealText}>
          {revealText}
        </p>
      </article>
    </section>
  );
}
