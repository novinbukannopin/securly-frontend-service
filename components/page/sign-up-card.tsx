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
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50'>
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
    </div>
  );
}
