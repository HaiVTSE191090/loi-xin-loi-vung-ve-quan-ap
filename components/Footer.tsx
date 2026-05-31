"use client";

const socials = ["Facebook", "Instagram", "TikTok"];

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Social placeholders</p>
      <div>
        {socials.map((social) => (
          <a key={social} href="#" onClick={(event) => event.preventDefault()}>
            {social}
          </a>
        ))}
      </div>
    </footer>
  );
}
