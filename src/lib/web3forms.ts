export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  inquiryType: string;
  subject: string;
  message: string;
};

export const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

// Web3Forms' free plan only accepts submissions from the browser, so this runs client-side.
// The access key is designed to be public: it only lets a form send email to our inbox.
export async function sendToWeb3Forms(inquiry: Inquiry): Promise<"sent" | "skipped" | "failed"> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  if (!accessKey) return "skipped";

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Website inquiry: ${inquiry.subject}`,
        from_name: "Infotainment Academy website",
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || "Not given",
        "Inquiry type": inquiry.inquiryType,
        message: inquiry.message,
        botcheck: false,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    const data = (await response.json().catch(() => null)) as { success?: unknown } | null;
    return response.ok && data?.success === true ? "sent" : "failed";
  } catch {
    return "failed";
  }
}
