"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const sections = [
  {
    id: "nhan-loi",
    kicker: "Điều mình đã làm sai",
    title: "Mình đã bất cẩn.",
    body: "Mình đã lỡ đọc nhầm tên Vy thành Vi. Nghe thì nhỏ thôi, nhưng lỗi nhỏ vẫn là lỗi khi nó chạm đến điều riêng của một người."
  },
  {
    id: "cam-xuc",
    kicker: "Mình hiểu điều đó",
    title: "Tên của Vy xứng đáng được gọi đúng.",
    body: "Nếu việc đó khiến Vy thấy mình thiếu chú ý hoặc không đủ tôn trọng, mình hiểu. Mình không muốn sự vụng về của mình làm Vy thấy khó chịu."
  },
  {
    id: "xin-loi",
    kicker: "Nói thẳng và rõ",
    title: "Mình xin lỗi Vy vì sự bất cẩn đó.",
    body: "Không phải để làm quá mọi chuyện, cũng không phải để biện minh. Chỉ là mình muốn nhận lỗi đàng hoàng, bằng một lời xin lỗi tử tế."
  },
  {
    id: "loi-hua",
    kicker: "Sau lời xin lỗi",
    title: "Mình sẽ chú ý hơn.",
    body: "Từ giờ mình sẽ cẩn thận hơn khi gọi tên Vy, vì sự tôn trọng đôi khi nằm ở những điều rất nhỏ như vậy."
  },
  {
    id: "ket",
    kicker: "Không ép Vy phải trả lời ngay",
    title: "Chỉ mong Vy biết lời xin lỗi này là thật lòng.",
    body: "Vy không cần phải thông cảm ngay. Mình chỉ muốn Vy biết rằng mình đã nhận ra lỗi của mình và thật sự muốn sửa nó."
  }
];

const emailText = `Tiêu đề: Xin lỗi Vy vì mình đã đọc nhầm tên bạn

Vy thân mến,

Mình muốn gửi lời xin lỗi đến bạn vì mình đã lỡ đọc nhầm tên bạn thành "Vi". Mình biết đây không phải là chuyện quá nghiêm trọng, nhưng mình hiểu tên của mỗi người là điều nên được gọi đúng và được tôn trọng.

Việc nhầm lẫn này là do mình bất cẩn, không phải vì mình thiếu tôn trọng bạn. Mình thật sự xin lỗi và sẽ chú ý hơn để không lặp lại điều này.

Mong Vy thông cảm cho mình. Cảm ơn Vy vì đã đọc email này.

Trân trọng,
Thanh Hải`;

function assetPath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

export default function ApologyExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ambientRef = useRef<AudioContext | null>(null);
  const [opened, setOpened] = useState(false);
  const [soundState, setSoundState] = useState<"idle" | "playing" | "paused">("idle");
  const [copied, setCopied] = useState(false);
  const { scrollYProgress } = useScroll();
  const veilY = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const portraitSrc = assetPath("/images/vy-source.png");

  const petals = useMemo(
    () =>
      Array.from({ length: 22 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        delay: `${(index % 9) * 1.1}s`,
        duration: `${12 + (index % 7)}s`,
        size: `${8 + (index % 5) * 2}px`
      })),
    []
  );

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

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

  useGSAP(
    () => {
      gsap.set(".story-card", { y: 38, autoAlpha: 0 });
      gsap.to(".soft-orbit", {
        y: -18,
        rotation: 4,
        duration: 5.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.4
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    if (!opened) return;
    gsap.to(".story-card", {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12
    });
  }, [opened]);

  async function openExperience() {
    setOpened(true);
    try {
      const context = new AudioContext();
      const gain = context.createGain();
      const low = context.createOscillator();
      const high = context.createOscillator();
      low.type = "sine";
      high.type = "triangle";
      low.frequency.value = 174;
      high.frequency.value = 261.63;
      gain.gain.value = 0.025;
      low.connect(gain);
      high.connect(gain);
      gain.connect(context.destination);
      low.start();
      high.start();
      ambientRef.current = context;
      setSoundState("playing");
    } catch {
      setSoundState("idle");
    }
  }

  function toggleSound() {
    const ambient = ambientRef.current;
    if (ambient) {
      if (ambient.state === "running") {
        void ambient.suspend();
        setSoundState("paused");
      } else {
        void ambient.resume();
        setSoundState("playing");
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      void audio.play();
      setSoundState("playing");
    } else {
      audio.pause();
      setSoundState("paused");
    }
  }

  async function copyEmail() {
    await navigator.clipboard.writeText(emailText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <main ref={rootRef} className={`experience ${opened ? "is-opened" : ""}`}>
      <CanvasGlow />
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

      {!opened && (
        <motion.section
          className="intro-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="intro-frame">
            <p className="mini-label">Lời xin lỗi vụng về (Quân AP)</p>
            <h1>Vy à, có một điều mình muốn nói thật lòng...</h1>
            <p>
              Một lời xin lỗi nhỏ, được viết lại cẩn thận hơn để không giống một bức thư dài,
              mà giống một khoảnh khắc biết nhận lỗi.
            </p>
            <button className="open-button" type="button" onClick={openExperience}>
              Mở lời xin lỗi
            </button>
            <span className="sound-note">Có thể đặt nhạc hợp pháp trong /public/audio/background.mp3</span>
          </div>
        </motion.section>
      )}

      <header className="cinema-header">
        <a href="#mo-dau" aria-label="Về đầu trang">
          Lời xin lỗi vụng về
        </a>
        <button type="button" onClick={toggleSound} disabled={soundState === "idle"}>
          {soundState === "playing" ? "Tắt nhạc" : soundState === "paused" ? "Bật nhạc" : "Nhạc nền"}
        </button>
      </header>

      <section id="mo-dau" className="hero-scene">
        <motion.div className="hero-veil" style={{ y: veilY }} aria-hidden="true" />
        <div className="hero-copy">
          <motion.p
            className="mini-label"
            initial={{ opacity: 0, y: 18 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            Gửi Vy, bằng sự tử tế
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25 }}
          >
            Mình không muốn lỗi nhỏ này bị bỏ qua như chưa từng xảy ra.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={opened ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.42 }}
          >
            Vì tên của Vy là điều riêng của Vy. Mình đã đọc sai, và mình muốn nói lại cho
            đúng: Vy, mình xin lỗi.
          </motion.p>
        </div>
        <div className="portrait-wrap soft-orbit" aria-hidden="true">
          <Image src={portraitSrc} alt="" width={300} height={300} priority />
        </div>
        <div className="tiny-gift soft-orbit" aria-hidden="true">
          <span />
        </div>
      </section>

      <section className="story-flow" aria-label="Các phần của lời xin lỗi">
        {sections.map((section, index) => (
          <motion.article
            id={section.id}
            className="story-card"
            key={section.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px" }}
            transition={{ duration: 0.75, delay: index * 0.04 }}
          >
            <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <p className="mini-label">{section.kicker}</p>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </div>
          </motion.article>
        ))}
      </section>

      <section className="closing-scene">
        <div className="closing-copy">
          <p className="mini-label">Bản ngắn để giữ lại</p>
          <h2>Vy, mình xin lỗi vì đã gọi nhầm tên bạn.</h2>
          <p>
            Mình sẽ chú ý hơn, không để sự bất cẩn đó lặp lại. Vy không cần phải tha thứ
            ngay; mình chỉ mong Vy hiểu rằng lời xin lỗi này là thật lòng.
          </p>
        </div>
        <div className="email-panel">
          <p className="mini-label">Email Gmail</p>
          <pre>{emailText}</pre>
          <button type="button" onClick={copyEmail}>
            {copied ? "Đã sao chép" : "Sao chép email"}
          </button>
        </div>
      </section>

      <section className="media-note" aria-label="Tùy chọn nhạc và video">
        <div>
          <p className="mini-label">Nhạc / video hợp lệ</p>
          <h2>Không dùng lại nhạc hay video bản quyền trái phép.</h2>
          <p>
            Nếu bạn có file hợp pháp, đặt mp3 tại <code>public/audio/background.mp3</code>.
            Nếu muốn dùng video local, đặt tại <code>public/video/background.mp4</code> rồi mình
            có thể bật nền video nhẹ. Cũng có thể thêm embed YouTube chính thức nếu bạn muốn
            hiển thị MV.
          </p>
          <p className="status-line">
            Hiện web dùng nền âm thanh tự tạo sau cú bấm đầu tiên. Nếu muốn nhạc riêng, đặt file hợp pháp vào đúng thư mục này.
          </p>
        </div>
      </section>
    </main>
  );
}

function CanvasGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    let frame = 0;
    let raf = 0;
    const particles = Array.from({ length: 44 }, (_, index) => ({
      x: (index * 83) % window.innerWidth,
      y: (index * 47) % window.innerHeight,
      r: 1.2 + (index % 5) * 0.65,
      s: 0.15 + (index % 6) * 0.035
    }));

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      frame += 1;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach((particle, index) => {
        const drift = Math.sin(frame * 0.006 + index) * 18;
        particle.y -= particle.s;
        if (particle.y < -20) particle.y = window.innerHeight + 20;
        context.beginPath();
        context.fillStyle = `rgba(255, 221, 168, ${0.12 + (index % 4) * 0.035})`;
        context.shadowColor = "rgba(255, 204, 150, 0.55)";
        context.shadowBlur = 16;
        context.arc(particle.x + drift, particle.y, particle.r, 0, Math.PI * 2);
        context.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="glow-canvas" aria-hidden="true" />;
}
