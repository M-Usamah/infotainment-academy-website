import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  "media-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    const oldServices = ["ar-vr", "game-development", "3d-interactive", "game-art", "apps-web", "archviz"];
    const oldProjects = [
      "northline-arena",
      "ember-circuit",
      "halo-of-rooms",
      "paper-lantern",
      "drift-protocol",
      "night-market",
      "echo-garden",
      "signal-house",
    ];
    const oldArticles = [
      "spatial-retail-is-a-pacing-problem",
      "heat-is-the-new-polygon-budget",
      "why-our-archviz-starts-with-sound",
    ];
    return [
      ...oldServices.map((slug) => ({ source: `/services/${slug}`, destination: "/services", permanent: true })),
      ...oldProjects.map((slug) => ({ source: `/portfolio/${slug}`, destination: "/portfolio", permanent: true })),
      ...oldArticles.map((slug) => ({ source: `/news/${slug}`, destination: "/news", permanent: true })),
      { source: "/services/art-technical-art", destination: "/services/technical-art", permanent: true },
      { source: "/careers/unity-engineer", destination: "/careers/unreal-developer", permanent: true },
      { source: "/careers/producer", destination: "/careers", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
