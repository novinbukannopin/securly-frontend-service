import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';
import { AnalyticsResponse } from '@/types/analytics';

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

export function getUniqueDatesAndClicks(data: AnalyticsResponse | undefined) {
  if (!data) return [];

  const formatDateCreation = (datetime: string) => datetime.split('T')[0];

  const dateClickMap = data.reduce(
    (acc: { [x: string]: any }, link: { createdAt: string }) => {
      const date = formatDateCreation(link.createdAt);
      acc[date] = (acc[date] || 0) + 1; // Increment click count
      return acc;
    },
    {} as Record<string, number>,
  );

  return Object.entries(dateClickMap).map(([date, count]) => ({
    date,
    count,
  }));
}

// export function getCountClicks(data: AnalyticsResponse | undefined) {
//   if (!data) return 0;
//
//   return data.map(
//     (link: {
//       shortCode: any;
//       originalUrl: any;
//       createdAt: any;
//       Clicks: Click[];
//     }) => ({
//       shortCode: link.shortCode,
//       originalUrl: link.originalUrl,
//       createdAt: link.createdAt,
//       count: link.Clicks.map((click) => click.id).length,
//     }),
//   );
// }

export function formatReadableDate(datetime: string | number | Date) {
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Format 24-jam
    timeZone: 'UTC', // Pastikan zona waktu sesuai kebutuhan
  };

  // @ts-ignore
  return new Date(datetime).toLocaleString('id-ID', options);
}
