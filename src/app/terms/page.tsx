import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        This website is a public portfolio for {site.name}. Content is provided as-is for informational
        purposes. Project case studies describe original studio work and fictional client names unless
        otherwise noted.
      </p>
      <p>
        You may not scrape the contact endpoint, attempt to inject markup, or use the form to send
        unsolicited mail. We may rate-limit or block abusive traffic.
      </p>
      <p>
        Commissioned production is governed by a separate statement of work. Nothing on this site is an
        offer until both sides sign one.
      </p>
    </LegalLayout>
  );
}
