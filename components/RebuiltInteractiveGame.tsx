"use client";

import { useRef, useState } from "react";
import type { CSSProperties, PointerEvent } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { playfulNotes } from "@/data/apologyContent";

type Spark = {
  id: number;
  x: number;
  y: number;
};

gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);

export default function RebuiltInteractiveGame() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const companionRef = useRef<HTMLDivElement>(null);

  const collectedNotesRef = useRef<Set<string>>(new Set());
  const sparkIdRef = useRef(0);
  const sparkTimeoutsRef = useRef<number[]>([]);

  const [score, setScore] = useState(0);
  const [sparks, setSparks] = useState<Spark[]>([]);

  const emitSparks = (x: number, y: number) => {
    const next = Array.from({ length: 10 }, () => ({
      id: sparkIdRef.current++,
      x,
      y
    }));

    setSparks((current) => [...current, ...next]);

    const timeout = window.setTimeout(() => {
      const nextIds = new Set(next.map((spark) => spark.id));

      setSparks((current) => current.filter((spark) => !nextIds.has(spark.id)));
    }, 1100);

    sparkTimeoutsRef.current.push(timeout);
  };

  const markCollected = (note: string) => {
    if (!note || collectedNotesRef.current.has(note)) return;

    collectedNotesRef.current.add(note);
    setScore((value) => Math.min(value + 1, playfulNotes.length));
  };

  useGSAP(
    () => {
      const stage = stageRef.current;
      if (!stage) return;

      const noteButtons = Array.from(stage.querySelectorAll<HTMLButtonElement>(".game-note"));

      gsap.set(noteButtons, {
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        transformOrigin: "50% 50%",
        force3D: true
      });

      gsap.from(".play-copy, .play-stage", {
        y: 58,
        autoAlpha: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      });

      gsap.to(".orbit-ring", {
        rotate: 360,
        duration: 26,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".floating-heart", {
        y: "random(-24, 28)",
        x: "random(-18, 18)",
        rotate: "random(-12, 12)",
        duration: "random(2.6, 4.8)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.16
      });

      const draggables = Draggable.create(noteButtons, {
        type: "x,y",
        bounds: stage,
        edgeResistance: 0.82,
        minimumMovement: 4,

        onPress() {
          const target = this.target as HTMLButtonElement;
          const currentX = Number(gsap.getProperty(target, "x")) || 0;
          const currentY = Number(gsap.getProperty(target, "y")) || 0;

          gsap.killTweensOf(target);

          gsap.set(target, {
            x: currentX,
            y: currentY,
            scale: 1,
            rotate: 0,
            zIndex: 20
          });

          gsap.to(target, {
            scale: 1.08,
            duration: 0.16,
            ease: "power2.out"
          });
        },

        onRelease() {
          const target = this.target as HTMLButtonElement;

          const currentX = Number(gsap.getProperty(target, "x")) || 0;
          const currentY = Number(gsap.getProperty(target, "y")) || 0;

          const stageRect = stage.getBoundingClientRect();
          const targetRect = target.getBoundingClientRect();

          const sparkX = targetRect.left - stageRect.left + targetRect.width / 2;
          const sparkY = targetRect.top - stageRect.top + targetRect.height / 2;

          const note = target.dataset.note || target.textContent?.trim() || "";

          markCollected(note);
          emitSparks(sparkX, sparkY);

          gsap.killTweensOf(target);

          // Quan trọng:
          // Giữ đúng vị trí hiện tại trước khi chạy hiệu ứng pop.
          // Nhờ vậy button không bị phóng ở vị trí cũ rồi mới nhảy sang vị trí mới.
          gsap.set(target, {
            x: currentX,
            y: currentY,
            scale: 1.08,
            rotate: 0,
            zIndex: 20
          });

          gsap
            .timeline({
              onComplete: () => {
                gsap.set(target, {
                  zIndex: 2
                });
              }
            })
            .to(target, {
              y: currentY - 30,
              scale: 1.16,
              rotate: gsap.utils.random(-7, 7),
              duration: 0.24,
              ease: "back.out(2.1)"
            })
            .to(target, {
              y: currentY,
              scale: 1,
              rotate: 0,
              duration: 0.38,
              ease: "power3.out"
            });
        }
      });

      return () => {
        draggables.forEach((draggable) => draggable.kill());
        sparkTimeoutsRef.current.forEach((timeout) => window.clearTimeout(timeout));
        sparkTimeoutsRef.current = [];
      };
    },
    { scope: sectionRef }
  );

  const moveCompanion = (event: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current;
    const companion = companionRef.current;
    if (!stage || !companion) return;

    const rect = stage.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(companion, {
      x: x * 0.16,
      y: y * 0.16,
      rotate: x * 0.018,
      duration: 0.42,
      ease: "power3.out"
    });
  };

  return (
    <section id="play" ref={sectionRef} className="rebuilt-game-section section-panel">
      <div className="play-copy">
        <p className="eyebrow">Playful pause</p>
        <h2>Collect the little sorry notes.</h2>
        <p>
          Vy kéo mấy cái chữ trong cái hình đó đi... tính năng của nó là phải bấm vô,
          giữ tí rồi mới kéo á nha... chứ không phải lỗi đâu.
        </p>
        <strong>
          {score} / {playfulNotes.length}
        </strong>
      </div>

      <div ref={stageRef} className="play-stage" onPointerMove={moveCompanion}>
        <div className="orbit-ring" aria-hidden="true" />

        <div ref={companionRef} className="soft-companion" aria-hidden="true">
          <span />
        </div>

        {playfulNotes.map((note, index) => (
          <button
            key={note}
            type="button"
            className="game-note"
            data-note={note}
            style={{
              left: `${14 + index * 18}%`,
              top: `${22 + (index % 2) * 34}%`
            }}
          >
            {note}
          </button>
        ))}

        {Array.from({ length: 7 }, (_, index) => (
          <i key={index} className={`floating-heart heart-${index + 1}`} aria-hidden="true" />
        ))}

        {sparks.map((spark, index) => (
          <i
            key={spark.id}
            className="collect-spark"
            style={
              {
                left: spark.x,
                top: spark.y,
                "--spark-x": `${Math.cos(index) * (48 + index * 5)}px`,
                "--spark-y": `${-58 - index * 7}px`
              } as CSSProperties
            }
            aria-hidden="true"
          />
        ))}
      </div>
    </section>
  );
}