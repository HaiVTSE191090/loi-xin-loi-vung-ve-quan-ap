"use client";

import { motion } from "framer-motion";
import { floatingLines } from "@/data/apologyContent";

type FloatingTextProps = {
  active: boolean;
};

export default function FloatingText({ active }: FloatingTextProps) {
  return (
    <div className="floating-text" aria-hidden="true">
      {floatingLines.map((line, index) => (
        <motion.span
          key={line}
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: [0.1, 0.42, 0.1], y: [-6, -28, -6] } : {}}
          transition={{
            duration: 8 + index,
            delay: index * 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ left: `${8 + index * 21}%`, top: `${18 + (index % 2) * 48}%` }}
        >
          {line}
        </motion.span>
      ))}
    </div>
  );
}
