"use client";

import { useRef } from "react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

type MotionPathImageProps = {
  src: string;
  alt: string;
};

gsap.registerPlugin(useGSAP, MotionPathPlugin, ScrollTrigger);

export default function MotionPathImage({ src, alt }: MotionPathImageProps) {
  const figureRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const figure = figureRef.current;
      if (!figure) return;
      const trigger = figure.closest(".hero-section");
      if (!trigger) return;

      gsap.to(figure, {
        motionPath: {
          path: [
            { x: 0, y: 0 },
            { x: -28, y: 92 },
            { x: 18, y: 190 },
            { x: -10, y: 295 }
          ],
          curviness: 1.35
        },
        rotate: -1.8,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger,
          start: "top top",
          end: "bottom top",
          scrub: 1.1
        }
      });

      gsap.to(".motion-path-spark", {
        y: "random(18, 42)",
        x: "random(-12, 16)",
        opacity: "random(0.28, 0.72)",
        duration: "random(2.8, 4.4)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18
      });
    },
    { scope: figureRef }
  );

  return (
    <figure ref={figureRef} className="hero-image-card motion-path-image">
      <img src={src} alt={alt} />
      <span className="motion-path-spark spark-a" aria-hidden="true" />
      <span className="motion-path-spark spark-b" aria-hidden="true" />
      <span className="motion-path-spark spark-c" aria-hidden="true" />
    </figure>
  );
}
