"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type HorizontalTextSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  marquee?: string[];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HorizontalTextSection({
  id,
  eyebrow,
  title,
  body,
  marquee = []
}: HorizontalTextSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const words = marquee.length ? marquee : [title, body];

  useGSAP(
    () => {
      gsap.to(".horizontal-line.is-forward", {
        xPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      gsap.to(".horizontal-line.is-backward", {
        xPercent: 24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} ref={sectionRef} className="horizontal-text-section section-panel">
      <div className="horizontal-marquee" aria-hidden="true">
        <div className="horizontal-line is-forward">
          {[...words, ...words].map((word, index) => (
            <span key={`${word}-a-${index}`}>{word}</span>
          ))}
        </div>
        <div className="horizontal-line is-backward">
          {[...words].reverse().concat(words).map((word, index) => (
            <span key={`${word}-b-${index}`}>{word}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
