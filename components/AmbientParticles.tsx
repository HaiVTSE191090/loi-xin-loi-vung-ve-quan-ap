"use client";

import { useEffect, useMemo, useRef } from "react";
import type { CSSProperties } from "react";

type AmbientParticlesProps = {
  active: boolean;
};

export default function AmbientParticles({ active }: AmbientParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const petals = useMemo(
    () =>
      Array.from({ length: 26 }, (_, index) => ({
        id: index,
        left: `${(index * 31) % 100}%`,
        delay: `${(index % 10) * 0.9}s`,
        duration: `${13 + (index % 7)}s`,
        size: `${9 + (index % 5) * 2}px`
      })),
    []
  );

  useEffect(() => {
    function moveGlow(event: PointerEvent) {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    }

    window.addEventListener("pointermove", moveGlow, { passive: true });
    return () => window.removeEventListener("pointermove", moveGlow);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const ctx = context;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    let raf = 0;
    const particles = Array.from({ length: 74 }, (_, index) => ({
      x: (index * 73) % window.innerWidth,
      y: (index * 41) % window.innerHeight,
      r: 1.3 + (index % 5) * 0.55,
      s: 0.1 + (index % 6) * 0.026,
      hue: index % 3
    }));

    function resize() {
      if (!canvas || !context) return;
      const ratio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    function draw() {
      frame += 1;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        const drift = Math.sin(frame * 0.006 + index) * 18;
        particle.y -= active ? particle.s : particle.s * 0.35;
        if (particle.y < -20) particle.y = window.innerHeight + 20;

        ctx.beginPath();
        const palette =
          particle.hue === 0
            ? "239, 197, 139"
            : particle.hue === 1
              ? "226, 149, 137"
              : "255, 238, 202";

        ctx.fillStyle = `rgba(${palette}, ${0.1 + (index % 4) * 0.028})`;
        ctx.shadowColor = `rgba(${palette}, 0.42)`;
        ctx.shadowBlur = 18;
        ctx.arc(particle.x + drift, particle.y, particle.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return (
    <>
      <div className="ambient-depth" aria-hidden="true">
        <span className="light-leak light-leak-a" />
        <span className="light-leak light-leak-b" />
        <span className="mouse-glow" />
      </div>
      <div className="bokeh-field" aria-hidden="true">
        {Array.from({ length: 16 }, (_, index) => (
          <span
            key={index}
            style={
              {
                "--left": `${(index * 19) % 110 - 8}%`,
                "--top": `${(index * 31) % 100}%`,
                "--size": `${20 + (index % 5) * 9}px`,
                "--speed": `${10 + index * 0.4}s`
              } as CSSProperties
            }
          />
        ))}
      </div>
      <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />
      <div className="petal-layer" aria-hidden="true">
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="petal"
            style={{
              left: petal.left,
              animationDelay: petal.delay,
              animationDuration: petal.duration,
              width: petal.size,
              height: petal.size
            }}
          />
        ))}
      </div>
    </>
  );
}
