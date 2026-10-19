import { z } from "zod";
import { inquiryTypes } from "@/lib/inquiry-types";

const MAX_NAME = 80;
const MAX_SUBJECT = 120;
const MAX_MESSAGE = 4000;
const MAX_PHONE = 24;

const text = (max: number) =>
  z
    .string()
    .trim()
    .min(1, "This field is required.")
    .max(max, `Keep this under ${max} characters.`)
    .refine((value) => !/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(value), {
      message: "Remove special control characters and try again.",
    })
    .refine((value) => !/(?:https?:\/\/|content-type:|bcc:|cc:)/i.test(value.split("\n")[0] ?? ""), {
      message: "That value is not allowed.",
    });

// Fields that end up in email headers (name, subject) or are single-line by nature must
// not carry line breaks; otherwise a value like "Hi\nBcc: x@y" spans two header lines.
const NO_LINE_BREAKS = /^[^\r\n]*$/;
const singleLine = <T extends z.ZodString>(schema: T) =>
  schema.regex(NO_LINE_BREAKS, "Keep this on one line.");

export const contactSchema = z
  .object({
    name: singleLine(text(MAX_NAME)).regex(/^[\p{L}\p{M} .'-]+$/u, "Use letters in your name."),
    email: z
      .string()
      .trim()
      .max(254)
      .email("Enter a valid email address.")
      .refine((value) => !value.includes("\n") && !value.includes("\r"), {
        message: "Enter a valid email address.",
      }),
    phone: z
      .string()
      .trim()
      .max(MAX_PHONE)
      .regex(/^$|^[+0-9() .-]{7,24}$/, "Enter a valid phone number.")
      .optional()
      .or(z.literal("")),
    inquiryType: z.enum(inquiryTypes, "Choose how you would like to start."),
    subject: singleLine(text(MAX_SUBJECT)),
    message: text(MAX_MESSAGE).min(12, "Tell us a little more about the idea."),
    companyWebsite: z.string().max(200).optional().or(z.literal("")),
  })
  .strict();

export type ContactInput = z.infer<typeof contactSchema>;

export function fieldErrorMap(error: z.ZodError): Record<string, string> {
  const map: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !map[key]) {
      map[key] = issue.message;
    }
  }
  return map;
}
