'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Cookies from 'js-cookie';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { BarChart, Globe, Laptop, LinkIcon, Settings } from 'lucide-react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { client } from '@/lib/axios';
import { PasswordInput } from '@/components/custom/password-input';
import Icons from '../icons/icons';
import { GOOGLE_AUTH } from '@/lib/env';

const loginAccountSchema = z.object({
  email: z
    .string()
    .min(4, 'Email must be at least 4 characters.')
    .email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters.')
    .regex(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])/,
      'Password must contain at least one letter, one number, and one special character.',
    ),
});

type LoginAccountSchemaValues = z.infer<typeof loginAccountSchema>;

export default function SignInPage() {
  const router = useRouter();

  const form = useForm<LoginAccountSchemaValues>({
    resolver: zodResolver(loginAccountSchema),
  });

  async function onSubmit(values: LoginAccountSchemaValues) {
    try {
      const res = await client.post('/auth/login', values);
      if (res.status === 200) {
        toast.success('Login successful');
        Cookies.set('token', res.data.tokens.access.token);
        router.replace('/links');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error(e.response?.data.message);
        console.log(values);
      }
    }
  }

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      router.replace('/dashboard');
    }
  }, [router]);

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50'>
      {/* Decorative Elements - Left Side */}
      <div className='absolute left-10 top-10 md:left-20 md:top-20'>
        <div className='rounded-lg bg-card p-6 shadow-lg backdrop-blur-sm'>
          <div className='flex items-center space-x-3'>
            <Globe className='h-6 w-6 text-gray-500 dark:text-white' />
            <div className='text-sm text-gray-500 dark:text-white'>
              <Link href={'/'}>securly.com/dashboard</Link>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-20 left-16 hidden md:block'>
        <div className='rounded-lg bg-card p-6 shadow-lg backdrop-blur-sm'>
          <div className='flex flex-col space-y-4'>
            <LinkIcon className='h-6 w-6 text-gray-500 dark:text-white' />
            <BarChart className='h-6 w-6 text-gray-500 dark:text-white' />
            <Settings className='h-6 w-6 text-gray-500 dark:text-white' />
          </div>
        </div>
      </div>

      {/* Decorative Elements - Right Side */}
      <div className='absolute right-10 top-1/4 hidden md:block'>
        <div className='rounded-lg bg-card p-6 shadow-lg backdrop-blur-sm'>
          <div className='flex items-center space-x-3'>
            <Laptop className='h-6 w-6 text-gray-500 dark:text-white' />
            <div className='text-sm text-gray-500 dark:text-white'>
              Analytics Dashboard
            </div>
          </div>
        </div>
      </div>

      {/* Floating Dots */}
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/4 top-1/3 h-2 w-2 rounded-full bg-pink-400' />
        <div className='absolute right-1/3 top-1/4 h-2 w-2 rounded-full bg-blue-400' />
        <div className='absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-purple-400' />
        <div className='absolute bottom-1/3 right-1/4 h-2 w-2 rounded-full bg-indigo-400' />
      </div>

      {/* Sign In Card */}
      <Card className='relative z-10 mx-4 w-full max-w-md p-6'>
        <CardContent className='space-y-4'>
          <h1 className='mb-6 text-center text-xl font-semibold'>
            Sign in to your Securly account
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='......' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>
          </Form>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator className='w-full' />
            </div>
            <div className='relative flex justify-center text-xs uppercase'>
              <span className='bg-background px-2 text-muted-foreground'>
                OR
              </span>
            </div>
          </div>

          <Button
            variant='outline'
            className='w-full'
            onClick={() => {
              window.location.href =
                (GOOGLE_AUTH as string) ||
                // 'https://securly-backend-cdf7dcf51dee.herokuapp.com/v1/auth/google';
                'http://localhost:3001/v1/auth/google';
            }}
          >
            <Icons.google className='mr-2 h-5 w-5' />
            Continue with Google
          </Button>

          <div className='text-center text-xs text-muted-foreground'>
            You signed in with Google last time
          </div>

          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <Separator className='w-full' />
            </div>
          </div>
        </CardContent>

        <CardFooter className='justify-center'>
          <p className='text-sm text-muted-foreground'>
            Don&apos;t have an account?{' '}
            <Link href='/register' className='text-primary hover:underline'>
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>

      {/* Footer */}
      <footer className='relative z-10 mt-8 text-center'>
        <div className='text-sm text-gray-500'>
          © 2024 Securly, Inc.{' '}
          <Link href='/privacy' className='text-gray-600 hover:underline'>
            Privacy Policy
          </Link>
          {' · '}
          <Link href='/terms' className='text-gray-600 hover:underline'>
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
