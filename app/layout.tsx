import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const body = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});

const sans = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://haivtse191090.github.io/loi-xin-loi-vung-ve-quan-ap/"),
  title: "Lời xin lỗi vụng về (Quân AP)",
  description:
    "Một trải nghiệm nhỏ, nhẹ nhàng và chân thành để xin lỗi Vy vì đã lỡ đọc nhầm tên bạn ấy thành Vi.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "512x512", type: "image/png" }]
  },
  openGraph: {
    title: "Lời xin lỗi vụng về (Quân AP)",
    description: "Mình xin lỗi Vy vì sự bất cẩn đó.",
    images: ["/images/hero-note.png"],
    locale: "vi_VN",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: "#17182a",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${display.variable} ${body.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
