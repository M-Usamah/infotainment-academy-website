import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout } from "@/components/legal-layout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        {site.name} collects only what you send us. The contact form stores your name, email, optional
        phone number, subject, and message so a producer can reply. We do not sell personal data.
      </p>
      <p>
        Messages are validated and sanitized on the server. We keep inquiry logs only as long as needed
        to respond and to protect the form against abuse.
      </p>
      <p>
        Essential cookies remember cookie-banner choice. Analytics and advertising cookies are not loaded
        on this site. Questions:{" "}
        <a className="text-gold" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>
      <p>
        See also the <Link href="/cookies">cookie policy</Link> and{" "}
        <Link href="/terms">terms of service</Link>.
      </p>
    </LegalLayout>
  );
}
