import { randomBytes, createHash } from 'crypto';

export function generateId(): string {
  return randomBytes(16).toString('hex');
}

export function generateApiKey(): string {
  return `jka_${randomBytes(32).toString('hex')}`;
}

export function hashApiKey(apiKey: string): string {
  return createHash('sha256').update(apiKey).digest('hex');
}

export function validateEmail(email: string): boolean {
  // Basic email validation - consider using a library like validator.js for production
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  // Basic sanitization - consider using DOMPurify or validator.js for production
  // This removes common XSS vectors but is not comprehensive
  return input
    .trim()
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '');
}
