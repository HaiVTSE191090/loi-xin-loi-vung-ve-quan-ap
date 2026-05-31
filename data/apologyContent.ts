export const navItems = [
  { label: "Begin", target: "start" },
  { label: "Care", target: "careless" },
  { label: "Feeling", target: "feeling" },
  { label: "Sorry", target: "apology" },
  { label: "Gallery", target: "gallery" },
  { label: "Gift", target: "gift" },
  { label: "Play", target: "play" },
  { label: "Choice", target: "choice" }
];

export const apologySections = [
  {
    id: "careless",
    variant: "note",
    eyebrow: "01 / I noticed it",
    title: "Tui xin nhận lỗi",
    body: "This space is for the part where I explain the mistake plainly, without making excuses.",
    detail: "29/05/2026 12:09:00",
  },
  {
    id: "feeling",
    variant: "horizontal",
    eyebrow: "02 / Her feeling matters",
    title: "Những lỗi lâm tui gay ....",
    body: "I will write this part later, with a few sincere lines about why being called correctly matters.",
    marquee: [
      "Giỡn quá đáng với Vy",
      "Gọi sai tên Vy",
      "Không để ý Vy",
      "Không chơi Roblox với Vy",
      "Mây Mây",
      "Vân Vân",
    ],
  },
  {
    id: "apology",
    variant: "scramble",
    eyebrow: "03 / The apology",
    title: "This space is for my apology.",
    body: "Keep it short, direct, and honest. No pressure. No over-explaining. Just the truth.",
    reveal:
      "Tui xin lỗi. tui sẽ cẩn thận hơn trong việc giỡn, tui sẽ để ý hơn trong những lần sau để giỡn không bị quá đà!",
  },
  {
    id: "promise",
    variant: "promise",
    eyebrow: "04 / What changes",
    title: "I will pay closer attention.",
    body: "I will write this part later, as a small promise that sounds calm and real.",
    promises: ["Lắng Nghe", "Để ý mấy thứ nhỏ", "Không đọc sai tên nữa vì tên là của cha của mẹ để lại..."],
  },
];

export const sliderImages = [
  { src: "/images/apology-slider/soft-note.svg", alt: "Soft apology note with hearts" },
  { src: "/images/apology-slider/tiny-envelope.svg", alt: "Tiny apology envelope illustration" },
  { src: "/images/apology-slider/warm-gift.svg", alt: "Warm gift box illustration" },
  { src: "/images/apology-slider/petal-rain.svg", alt: "Falling petals apology illustration" },
  { src: "/images/apology-slider/moon-message.svg", alt: "Moon and message illustration" },
  { src: "/images/apology-slider/heart-bandaid.svg", alt: "Heart with small bandaid illustration" },
  { src: "/images/apology-slider/tea-peace.svg", alt: "Warm tea and peace note illustration" },
  { src: "/images/apology-slider/cloud-sorry.svg", alt: "Cloud carrying a sorry note illustration" }
];

export const playfulNotes = [
  "a softer sorry",
  "one tiny promise",
  "careful next time",
  "your feeling matters"
];

export const floatingLines = [
  "Vy, I want to say something sincerely...",
  "I know I was careless.",
  "This space is for my apology.",
  "I will write this part later."
];

export const memoryCards = [
  {
    title: "Hay lơ mấy ngừi",
    body: "Tự thiết lập chế độ ưu tiên khi ig hiện tin nhắn của vy",
    tone: "rose"
  },
  {
    title: "Trí nhớ có hạng",
    body: "Dùng note để note lại những thứ cần thiết",
    tone: "gold"
  },
  {
    title: "Bất cẩn",
    body: "Suy nghĩ chậm lại, cẩn thận với từng hành động hơn.",
    tone: "olive"
  }
];
