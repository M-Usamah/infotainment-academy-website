import { site } from "@/lib/site";

// Generated so Canonical always matches the domain actually serving the site (RFC 9116).
export const dynamic = "force-static";

export function GET() {
  const body = [
    `Contact: mailto:${site.email}`,
    "Expires: 2027-09-18T00:00:00.000Z",
    "Preferred-Languages: en",
    `Canonical: ${site.url}/.well-known/security.txt`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
