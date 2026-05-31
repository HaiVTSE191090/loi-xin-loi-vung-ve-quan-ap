const repoName = "loi-xin-loi-vung-ve-quan-ap";
const isGithubPages = process.env.GITHUB_ACTIONS === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  env: {
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? `/${repoName}` : ""
  },
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : ""
};

export default nextConfig;
