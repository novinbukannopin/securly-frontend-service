import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cvDOB(dob: Date): string {
  return format(dob, 'yyyy-MM-dd HH:mm:ss.SSS');
}

export function isTokenInvalidOrExpired(token: string | undefined): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    );
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
}

export function generateShortLink(): string {
  return Math.random().toString(36).substring(2, 7);
}
