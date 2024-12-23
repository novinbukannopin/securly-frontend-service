'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function DashboardRedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      Cookies.set('token', token, {
        httpOnly: false, // Bisa diakses dari JavaScript (untuk autentikasi)
        secure: process.env.NODE_ENV === 'production', // Hanya pada HTTPS jika produksi
        sameSite: 'strict', // Melindungi dari serangan CSRF
      });

      router.replace('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router]);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-pink-50 dark:from-gray-900 dark:to-gray-800'>
      <div className='text-center'>
        <div className='inline-block h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500 dark:border-blue-400'></div>
        <h2 className='mt-4 text-2xl font-semibold text-gray-700 dark:text-gray-200'>
          Authenticating...
        </h2>
        <p className='mt-2 text-gray-500 dark:text-gray-400'>
          Please wait while we complete the sign-in process.
        </p>
      </div>
    </div>
  );
}
