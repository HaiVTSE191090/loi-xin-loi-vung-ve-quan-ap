export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string) {
  return `${basePath}${path}`;
}

export const mediaSources = {
  audio: assetPath("/audio/background.mp3"),
  video: assetPath("/video/background.mp4"),
  portrait: assetPath("/images/vy-source.png"),
  heroNote: assetPath("/images/hero-note.png"),
  apologyGift: assetPath("/images/apology-gift-scene.png"),
  apologyNote: assetPath("/images/apology-note-hearts.png")
};

export function localAsset(path: string) {
  return assetPath(path);
}
