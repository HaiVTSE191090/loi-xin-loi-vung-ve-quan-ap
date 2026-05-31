"use client";

import { useRef, useState } from "react";
import type { SyntheticEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ForgivenessChoice() {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const [accepted, setAccepted] = useState(false);

  const { contextSafe } = useGSAP(
    () => {
      const field = fieldRef.current;
      const noButton = noButtonRef.current;

      if (field && noButton) {
        gsap.set(noButton, {
          x: Math.min(field.clientWidth - noButton.offsetWidth - 18, field.clientWidth * 0.66),
          y: Math.min(field.clientHeight - noButton.offsetHeight - 18, field.clientHeight * 0.58)
        });
      }

      gsap.from(".choice-copy, .choice-field", {
        y: 44,
        autoAlpha: 0,
        duration: 0.82,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse"
        }
      });
    },
    { scope: sectionRef }
  );

  const moveNoButton = contextSafe((event?: SyntheticEvent<HTMLButtonElement>) => {
    const field = fieldRef.current;
    const button = noButtonRef.current;
    if (!field || !button) return;

    const maxX = Math.max(0, field.clientWidth - button.offsetWidth - 18);
    const maxY = Math.max(0, field.clientHeight - button.offsetHeight - 18);
    const x = gsap.utils.random(10, maxX, 1);
    const y = gsap.utils.random(10, maxY, 1);

    gsap.to(button, {
      x,
      y,
      rotate: gsap.utils.random(-10, 10, 1),
      duration: 0.48,
      ease: "back.out(1.7)"
    });
  });

  const sayYes = contextSafe(() => {
    setAccepted(true);
    requestAnimationFrame(() => {
      gsap.fromTo(
        ".celebration-piece",
        { y: 20, scale: 0.2, opacity: 0 },
        {
          y: "random(-120, -44)",
          x: "random(-120, 120)",
          scale: "random(0.75, 1.25)",
          opacity: 1,
          rotate: "random(-40, 40)",
          duration: 1.2,
          stagger: 0.035,
          ease: "power3.out"
        }
      );
      gsap.fromTo(
        ".yes-message",
        { y: 18, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.64, ease: "back.out(1.5)" }
      );
    });
  });

  return (
    <section id="choice" ref={sectionRef} className="forgiveness-section section-panel">
      <div className="choice-copy">
        <p className="eyebrow">One tiny question</p>
        <h2>Will you forgive me?</h2>
        <p>Hãy chọn câu trả lời bên trong khung kia nhá...</p>
      </div>

      <div ref={fieldRef} className="choice-field">
        <button type="button" className="yes-button" onClick={sayYes}>
          Yes
        </button>
        {!accepted && (
          <button
            ref={noButtonRef}
            type="button"
            className="no-button"
            onMouseEnter={moveNoButton}
            onPointerEnter={moveNoButton}
            onPointerDown={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
          >
            No
          </button>
        )}

        {accepted && (
          <div className="yes-celebration" aria-live="polite">
            {Array.from({ length: 24 }, (_, index) => (
              <i key={index} className="celebration-piece" />
            ))}
            <p className="yes-message">Nếu đồng ý tha thứ ròi... thì xin hãy mở block cho hải follow lại được hong ...</p>
          </div>
        )}
      </div>
    </section>
  );
}
