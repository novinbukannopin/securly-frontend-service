'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icons from '../icons/icons';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/custom/password-input';
import { client } from '@/lib/axios';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const loginAccountSchema = z.object({
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

export default function SignInCard() {
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
        router.replace('/dashboard');
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
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50'>
      <Card className='w-full max-w-md p-6'>
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
                      <PasswordInput placeholder={'......'} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className={'w-full'}>
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
              window.location.href = 'http://localhost:3001/v1/auth/google';
            }}
          >
            <Icons.google className='mr-2 h-4 w-4' />
            Continue with Google
          </Button>

          <div className='text-center text-xs text-muted-foreground'>
            You signed in with Google last time
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
        </CardContent>

        <CardFooter className='justify-center'>
          <p className='text-sm text-muted-foreground'>
            Don&#39;t have an account?{' '}
            <a href='/register' className='text-primary hover:underline'>
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
