# Loi xin loi vung ve (Quan AP)

Next.js apology experience for GitHub Pages.

## Local preview

```powershell
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Media

The site automatically loads local media from:

```text
public/audio/background.mp3
public/video/background.mp4
```

Audio and video start only after the visitor taps the intro button, so browser autoplay rules are respected. If either file cannot load, the UI falls back without throwing console errors.

## Editable text

Placeholder apology copy lives in:

```text
data/apologyContent.ts
```

Main sections are rendered through `components/ApologySection.tsx`.

## GitHub Pages

This repo builds with `next build` and deploys the exported `out/` directory through GitHub Actions.
