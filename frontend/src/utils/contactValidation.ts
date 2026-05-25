const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFields = {
  from_name: string;
  from_email: string;
  message: string;
};

export function validateContactForm(fields: ContactFields): string | null {
  const name = fields.from_name.trim();
  const email = fields.from_email.trim();
  const message = fields.message.trim();

  if (name.length < 2) {
    return "Please enter your name (at least 2 characters).";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Please enter a valid email address.";
  }

  if (message.length < 10) {
    return "Please enter a message (at least 10 characters).";
  }

  return null;
}
