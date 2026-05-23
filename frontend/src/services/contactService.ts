import { supabase } from "@/lib/supabase";
import type { ContactFormData } from "@/types/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(data: ContactFormData): string | null {
  if (!data.name || data.name.trim().length < 2) {
    return "Name must be at least 2 characters";
  }
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    return "Please provide a valid email";
  }
  if (!data.message || data.message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }
  return null;
}

export async function submitContact(data: ContactFormData) {
  const validationError = validate(data);
  if (validationError) {
    throw new Error(validationError);
  }

  const { error } = await supabase.from("contacts").insert({
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    message: data.message.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }
}
