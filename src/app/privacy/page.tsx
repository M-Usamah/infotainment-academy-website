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
        phone number, inquiry type, subject, and message so our team can reply. We do not sell
        personal data.
      </p>
      <p>
        Messages are validated and sanitized on our server, then delivered to our inbox by Web3Forms
        (web3forms.com), an email forwarding service that processes them on our behalf. We keep inquiry logs only as long as needed
        to respond and to protect the form against abuse.
      </p>
      <p>
        Essential cookies remember cookie-banner choice. Analytics and advertising cookies are not loaded
        on this site. Questions:{" "}
        <a className="text-action" href={`mailto:${site.email}`}>
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
