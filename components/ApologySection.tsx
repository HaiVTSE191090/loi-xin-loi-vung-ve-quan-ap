"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type ApologySectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  detail?: string;
  promises?: string[];
  index: number;
  variant?: "note" | "promise" | string;
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ApologySection({
  id,
  eyebrow,
  title,
  body,
  detail,
  promises = [],
  index,
  variant = "note"
}: ApologySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = sectionRef.current;
      if (!element) return;

      gsap.fromTo(
        element.querySelector(".section-card"),
        { y: 70, autoAlpha: 0, scale: variant === "promise" ? 0.94 : 0.965, rotate: variant === "note" ? -1.5 : 0 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotate: variant === "note" ? -1 : 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 72%",
            end: "bottom 42%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.to(element.querySelector(".section-aura"), {
        yPercent: index % 2 === 0 ? -14 : 14,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} ref={sectionRef} className="apology-section section-panel">
      <div className="section-aura" aria-hidden="true" />
      <motion.article
        className={`section-card section-card-${variant}`}
        whileHover={{ y: -5, transition: { duration: 0.22 } }}
      >
        <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{body}</p>
        {detail && <small>{detail}</small>}
        {promises.length > 0 && (
          <ul className="promise-list">
            {promises.map((promise) => (
              <li key={promise}>{promise}</li>
            ))}
          </ul>
        )}
      </motion.article>
    </section>
  );
}
