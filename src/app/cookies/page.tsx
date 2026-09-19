import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Cookie Policy",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy">
      <p>
        We use one first-party preference cookie named <code>cookie-consent</code> after you choose
        Accept or Reject. It stores only that choice, lasts one year, and is set with <code>SameSite=Lax</code>.
      </p>
      <p>
        The site does not load third-party advertising or analytics scripts. Rejecting extras still lets
        you browse; we simply remember that you asked us not to add optional cookies later.
      </p>
    </LegalLayout>
  );
}
