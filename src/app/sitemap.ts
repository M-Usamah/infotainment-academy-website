import type { MetadataRoute } from "next";
import { articles, jobs, projects, services } from "@/lib/data";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/news",
    "/careers",
    "/contact",
    "/privacy",
    "/terms",
    "/cookies",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...services.map((item) => `/services/${item.slug}`),
    ...projects.map((item) => `/portfolio/${item.slug}`),
    ...articles.map((item) => `/news/${item.slug}`),
    ...jobs.map((item) => `/careers/${item.slug}`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
