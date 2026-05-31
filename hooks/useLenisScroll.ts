"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    lenis.on("scroll", ScrollTrigger.update);

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
}
