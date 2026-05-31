"use client";

import { useState } from "react";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { memoryCards } from "@/data/apologyContent";
import { mediaSources } from "@/lib/media";

export default function InteractiveSection() {
  const [openedGift, setOpenedGift] = useState(false);
  const [cards, setCards] = useState(memoryCards);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section id="gift" className="interactive-section section-panel">
      <div className="interactive-copy">
        <p className="eyebrow">Interactive corner</p>
        <h2>A small apology world.</h2>
        <p>Open the gift will have sơm surprise</p>
      </div>

      <div className="interactive-grid">
        <div className="gift-stage">
          <AnimatePresence mode="popLayout">
            {!openedGift ? (
              <motion.button
                key="gift"
                layoutId="gift-shell"
                className="gift-box"
                type="button"
                onClick={() => setOpenedGift(true)}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 170, damping: 20 }}
              >
                <span className="gift-glow" />
                <span className="gift-lid" />
                <span className="gift-base" />
                <strong>Open a small gift</strong>
              </motion.button>
            ) : (
              <motion.article
                key="video"
                layoutId="gift-shell"
                className="gift-reveal-card"
                initial={{ borderRadius: 32 }}
                animate={{ borderRadius: 30 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 19 }}
              >
                <div className="gift-video-header">
                  <span>For this part</span>
                  <button type="button" onClick={() => setOpenedGift(false)}>
                    Minimize
                  </button>
                </div>
                <div className="gift-video-shell">
                  {!videoFailed ? (
                    <video
                      src={mediaSources.video}
                      muted
                      loop
                      playsInline
                      autoPlay
                      controls
                      preload="metadata"
                      onError={() => setVideoFailed(true)}
                    />
                  ) : (
                    <div className="video-reveal-fallback">
                      <strong>Video could not load.</strong>
                      <span>Keep the placeholder here and check `public/video/background.mp4`.</span>
                    </div>
                  )}
                </div>
                <p>Phần này tui định hát... nhưng mà hát dở quá nên phải đưa quân AP vào hát chứ không mấy người dỗi tui là phải.</p>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        <motion.figure
          className="cute-apology-image"
          whileHover={{ y: -8, rotate: -1.2 }}
          transition={{ type: "spring", stiffness: 120, damping: 16 }}
        >
          <img src={mediaSources.apologyNote} alt="Cute blank apology note with paper hearts" />
        </motion.figure>

        <Reorder.Group axis="y" values={cards} onReorder={setCards} className="memory-cards">
          {cards.map((card) => (
            <Reorder.Item
              key={card.title}
              value={card}
              className={`memory-card tone-${card.tone}`}
              whileDrag={{ scale: 1.04, rotate: -1.5 }}
              whileHover={{ x: 6 }}
            >
              <strong>{card.title}</strong>
              <span>{card.body}</span>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </section>
  );
}
