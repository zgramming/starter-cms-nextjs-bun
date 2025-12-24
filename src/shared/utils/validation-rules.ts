export const validationRules = {
  required: (fieldName: string) => (value: unknown) =>
    value !== undefined && value !== null && value !== ""
      ? null
      : `${fieldName} is required`,

  minLength: (min: number) => (value: unknown) =>
    value && typeof value === "string" && value.length >= min
      ? null
      : `Minimum ${min} characters required`,

  maxLength: (max: number) => (value: unknown) =>
    value && typeof value === "string" && value.length <= max
      ? null
      : `Maximum ${max} characters allowed`,

  email: (value: unknown) =>
    typeof value === "string" && /^\S+@\S+\.\S+$/.test(value)
      ? null
      : "Invalid email format",

  url: (value: unknown) =>
    typeof value === "string" && /^https?:\/\/.+/.test(value)
      ? null
      : "Invalid URL format",

  phone: (value: string) =>
    /^[+]?[\d\s-()]+$/.test(value) ? null : "Invalid phone number",

  numeric: (value: string | number) =>
    !isNaN(Number(value)) ? null : "Must be a number",

  positiveNumber: (value: number) =>
    value > 0 ? null : "Must be greater than 0",

  min: (minValue: number) => (value: number) =>
    value >= minValue ? null : `Must be at least ${minValue}`,

  max: (maxValue: number) => (value: number) =>
    value <= maxValue ? null : `Must be at most ${maxValue}`,

  range: (min: number, max: number) => (value: number) =>
    value >= min && value <= max ? null : `Must be between ${min} and ${max}`,

  pattern: (regex: RegExp, message: string) => (value: string) =>
    regex.test(value) ? null : message,

  alphanumeric: (value: string) =>
    /^[a-zA-Z0-9]+$/.test(value) ? null : "Only letters and numbers allowed",

  noSpecialChars: (value: string) =>
    /^[a-zA-Z0-9\s]+$/.test(value) ? null : "Special characters not allowed",

  password: (value: string) => {
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain a number";
    return null;
  },

  passwordMatch:
    (passwordField: string) =>
    (value: string, values: Record<string, unknown>) =>
      value === values[passwordField] ? null : "Passwords do not match",

  unique: (existingValues: string[]) => (value: string) =>
    !existingValues.includes(value) ? null : "This value already exists",

  date: (value: string | Date) => {
    const date = new Date(value);
    return !isNaN(date.getTime()) ? null : "Invalid date format";
  },

  futureDate: (value: string | Date) => {
    const date = new Date(value);
    return date > new Date() ? null : "Date must be in the future";
  },

  pastDate: (value: string | Date) => {
    const date = new Date(value);
    return date < new Date() ? null : "Date must be in the past";
  },
};

export function composeValidators(
  ...validators: Array<
    (value: unknown, values?: Record<string, unknown>) => string | null
  >
) {
  return (value: unknown, values?: Record<string, unknown>) => {
    for (const validator of validators) {
      const error = validator(value, values);
      if (error) return error;
    }
    return null;
  };
}
