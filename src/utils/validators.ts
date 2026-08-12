/**
 * Password policy, kept in one place so registration and any future
 * change-password form cannot drift apart.
 */
export const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v: string) => /[a-z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
  {
    label: "One special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
] as const;

export const isValidPassword = (password: string): boolean =>
  PASSWORD_RULES.every((rule) => rule.test(password));

/** Which rules a password currently fails, for inline hints. */
export const passwordProblems = (password: string): string[] =>
  PASSWORD_RULES.filter((rule) => !rule.test(password)).map(
    (rule) => rule.label,
  );

export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

/** Accepts +252..., 252..., or a local 61xxxxxxx style number. */
export const isValidPhone = (phone: string): boolean =>
  /^\+?[0-9\s-]{7,15}$/.test(phone.trim());

export const isNonEmpty = (value?: string | null): boolean =>
  Boolean(value && value.trim().length > 0);

/** Check-out must be strictly after check-in, and check-in not in the past. */
export const validateStayDates = (
  checkIn: string,
  checkOut: string,
): string | null => {
  if (!checkIn || !checkOut) return "Please choose both dates.";

  const start = new Date(checkIn);
  const end = new Date(checkOut);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return "Those dates are not valid.";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) return "Check-in cannot be in the past.";
  if (end <= start) return "Check-out must be after check-in.";
  return null;
};

/** Guards against oversized Cloudinary uploads before we hit the network. */
export const validateImageFile = (
  file: File,
  maxSizeMb = 5,
): string | null => {
  if (!file.type.startsWith("image/")) return `${file.name} is not an image.`;
  if (file.size > maxSizeMb * 1024 * 1024) {
    return `${file.name} is larger than ${maxSizeMb}MB.`;
  }
  return null;
};
