"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Icons from "../icons/icons"
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";

export default function SignInCard() {

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50">
      <Card className="w-full max-w-md p-6">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-semibold text-center mb-6">
            Sign in to your Dub account
          </h1>

          <Button variant="outline" className="w-full"
            onClick={() => { window.location.href = "http://localhost:3001/v1/auth/google" }}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <div className="text-xs text-center text-muted-foreground">
            You signed in with Google last time
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icons.mail className="mr-2 h-4 w-4" />
            Continue with Email
          </Button>

          <Button variant="outline" className="w-full" onClick={() => {}}>
            <Icons.lock className="mr-2 h-4 w-4" />
            Continue with SAML SSO
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Don&#39;t have an account?{" "}
            <a href="/register" className="text-primary hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

