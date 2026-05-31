"use client";

const socials = [
  { name: "Facebook", url: "https://www.facebook.com/thanhhaivu0501/" },
  { name: "Instagram", url: "https://www.instagram.com/_thannz.harry_/" },
  { name: "TikTok", url: "https://www.tiktok.com/@thanzharry" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Follow me</p>
      <div>
        {socials.map((s) => (
          <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">
            {s.name}
          </a>
        ))}
      </div>
    </footer>
  );
}
