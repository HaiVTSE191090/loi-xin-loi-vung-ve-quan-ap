"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { navItems } from "@/data/apologyContent";

type HeaderProps = {
  opened: boolean;
};

gsap.registerPlugin(ScrollToPlugin);

export default function Header({ opened }: HeaderProps) {
  const [activeTarget, setActiveTarget] = useState(navItems[0].target);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.target))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveTarget(visible.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.12, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function scrollToSection(target: string) {
    const section = document.getElementById(target);
    if (!section) return;

    gsap.to(window, {
      duration: 1.05,
      scrollTo: { y: section, offsetY: 18 },
      ease: "power3.inOut"
    });
  }

  return (
    <header className={`site-header story-nav ${opened ? "is-visible" : ""}`}>
      <button className="brand-button" type="button" onClick={() => scrollToSection("start")}>
        for Vy
      </button>
      <nav aria-label="Section navigation">
        {navItems.map((item, index) => {
          const active = activeTarget === item.target;

          return (
          <button
            key={item.target}
            className={active ? "is-active" : ""}
            type="button"
            onClick={() => scrollToSection(item.target)}
            aria-current={active ? "true" : undefined}
          >
            <span className="nav-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="nav-label">{item.label}</span>
            {active && <motion.span layoutId="nav-glow" className="nav-glow" />}
          </button>
          );
        })}
      </nav>
    </header>
  );
}
