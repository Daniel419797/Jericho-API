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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
