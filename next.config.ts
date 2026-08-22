import type { NextConfig } from "next";

const repositoryName = "learn-parabola-game";
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const basePath = isGitHubPages ? `/${repositoryName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
