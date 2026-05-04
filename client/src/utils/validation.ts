export interface ContactFormData {
  name: string;
  phone: string;
  organization: string;
  intention: string;
}

export interface ContactFormErrors {
  name?: string;
  phone?: string;
  organization?: string;
  intention?: string;
}

/**
 * Validates a phone number: must be exactly 11 digits starting with 1.
 */
export function validatePhone(phone: string): boolean {
  return /^1\d{10}$/.test(phone);
}

/**
 * Validates the contact form data. Returns an object with error messages
 * for each invalid field. An empty object means all fields are valid.
 */
export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name || !data.name.trim()) {
    errors.name = 'required';
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = 'required';
  } else if (!validatePhone(data.phone.trim())) {
    errors.phone = 'phoneFormat';
  }

  if (!data.organization || !data.organization.trim()) {
    errors.organization = 'required';
  }

  if (!data.intention || !data.intention.trim()) {
    errors.intention = 'required';
  }

  return errors;
}
