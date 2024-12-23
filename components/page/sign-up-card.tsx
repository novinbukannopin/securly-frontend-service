'use client';

import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icons from '../icons/icons';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/custom/password-input';
import { client } from '@/lib/axios';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import Link from 'next/link';
import { BarChart, Globe, Laptop, LinkIcon, Settings } from 'lucide-react';

export const registerAccountSchema = z
  .object({
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
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match.',
    path: ['passwordConfirmation'],
  });

type RegisterAccountSchemaValues = z.infer<typeof registerAccountSchema>;

export default function SignUpCard() {
  const form = useForm<RegisterAccountSchemaValues>({
    resolver: zodResolver(registerAccountSchema),
  });

  async function onSubmit(values: RegisterAccountSchemaValues) {
    try {
      const res = await client.post('/auth/register', {
        email: values.email,
        password: values.password,
      });
      if (res.status === 201) {
        toast.success('Account created successfully');
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        toast.error('Email already taken');
      }
    }
  }

  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 to-pink-50'>
      <div className='absolute left-10 top-10 md:left-20 md:top-20'>
        <div className='rounded-lg bg-card p-6 shadow-lg backdrop-blur-sm'>
          <div className='flex items-center space-x-3'>
            <Globe className='h-6 w-6 text-gray-500 dark:text-white' />
            <div className='text-sm text-gray-500 dark:text-white'>
              securly.com/dashboard
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

      <Card className='w-full max-w-md p-6'>
        <CardContent className='space-y-4'>
          <h1 className='mb-6 text-center text-xl font-semibold'>
            Get started with Securly
          </h1>

          <div className='space-y-4'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
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
                        <PasswordInput placeholder={'......'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='passwordConfirmation'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder={'......'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type='submit' className={'w-full'}>
                  Register
                </Button>
              </form>
            </Form>
          </div>

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
            className='h-11 w-full'
            onClick={() => {
              window.location.href = 'http://localhost:3001/v1/auth/google';
            }}
          >
            <Icons.google className='mr-2 h-4 w-4' />
            Continue with Google
          </Button>
        </CardContent>

        <CardFooter className='justify-center'>
          <p className='text-sm text-muted-foreground'>
            Already have an account?{' '}
            <a href='/login' className='text-primary hover:underline'>
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>

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
