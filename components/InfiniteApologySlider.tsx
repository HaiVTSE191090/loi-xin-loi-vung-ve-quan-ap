"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { sliderImages } from "@/data/apologyContent";
import { localAsset } from "@/lib/media";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function InfiniteApologySlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const images = [...sliderImages, ...sliderImages];

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const buildLoop = () => {
        gsap.killTweensOf(track);
        const distance = track.scrollWidth / 2;
        gsap.fromTo(
          track,
          { x: 0 },
          {
            x: -distance,
            duration: 34,
            ease: "none",
            repeat: -1
          }
        );
      };

      buildLoop();
      const refresh = gsap.delayedCall(0.4, buildLoop);
      window.addEventListener("resize", buildLoop);

      gsap.from(".slider-copy, .slider-shell", {
        y: 46,
        autoAlpha: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none reverse"
        }
      });

      return () => {
        refresh.kill();
        window.removeEventListener("resize", buildLoop);
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="gallery" ref={sectionRef} className="infinite-slider-section section-panel">
      <div className="slider-copy">
        <p className="eyebrow">Tiny gallery</p>
        <h2>Small cute pieces for a softer apology.</h2>
        <p>Chỗ này đáng lẽ là tui để hình Vy cho đẹp... Nhưng mà vô lại trang thì thấy tui bị Block ròi....</p>
      </div>

      <div className="slider-shell" aria-label="Infinite apology image slider">
        <div ref={trackRef} className="slider-track">
          {images.map((image, index) => (
            <figure className="slider-card" key={`${image.src}-${index}`} aria-hidden={index >= sliderImages.length}>
              <img src={localAsset(image.src)} alt={image.alt} />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
