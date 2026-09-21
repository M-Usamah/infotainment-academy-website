"use client";

import { FormEvent, useState } from "react";

type FieldErrors = Record<string, string>;

const initial = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  companyWebsite: "",
};

export function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [banner, setBanner] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrors({});
    setBanner("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await response.json()) as {
        error?: string;
        fields?: FieldErrors;
        message?: string;
      };

      if (!response.ok) {
        setErrors(data.fields ?? {});
        setBanner(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("ok");
      setBanner(data.message ?? "Sent.");
      setValues(initial);
    } catch {
      setStatus("error");
      setBanner("Network error. Try again in a moment.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <input
        type="text"
        name="companyWebsite"
        value={values.companyWebsite}
        onChange={(event) => setValues({ ...values, companyWebsite: event.target.value })}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />
      <Field
        label="Your name"
        error={errors.name}
        value={values.name}
        onChange={(value) => setValues({ ...values, name: value })}
        required
      />
      <Field
        label="Email"
        type="email"
        error={errors.email}
        value={values.email}
        onChange={(value) => setValues({ ...values, email: value })}
        required
      />
      <Field
        label="Phone (optional)"
        type="tel"
        error={errors.phone}
        value={values.phone}
        onChange={(value) => setValues({ ...values, phone: value })}
      />
      <Field
        label="Subject"
        error={errors.subject}
        value={values.subject}
        onChange={(value) => setValues({ ...values, subject: value })}
        required
      />
      <label className="grid gap-2 text-sm">
        Message
        <textarea
          required
          rows={6}
          maxLength={4000}
          value={values.message}
          onChange={(event) => setValues({ ...values, message: event.target.value })}
          className="rounded-2xl border border-line bg-depth/40 px-4 py-3 text-base outline-none focus:border-action"
        />
        {errors.message ? <span className="text-danger">{errors.message}</span> : null}
      </label>
      {banner ? (
        <p className={status === "ok" ? "text-mist" : "text-danger"} role="status">
          {banner}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={status === "sending"}
        className="rounded-full bg-action px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Get in touch"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <label className="grid gap-2 text-sm" htmlFor={id}>
      {label}
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-2xl border border-line bg-depth/40 px-4 py-3 text-base outline-none focus:border-action"
      />
      {error ? <span className="text-danger">{error}</span> : null}
    </label>
  );
}
