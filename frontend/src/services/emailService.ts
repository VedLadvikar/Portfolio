import emailjs from "@emailjs/browser";

const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

/** Sends the contact form via EmailJS using form field names expected by the template. */
export async function sendEmail(form: HTMLFormElement): Promise<void> {
  if (!serviceId || !templateId || !publicKey) {
    throw new Error("EmailJS environment variables are not configured");
  }

  await emailjs.sendForm(serviceId, templateId, form, { publicKey });
}
