import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cvDOB(dob: Date): string {
  return format(dob, 'yyyy-MM-dd HH:mm:ss.SSS');
}
