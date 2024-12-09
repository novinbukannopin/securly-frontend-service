"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import Icons from "../icons/icons"

export default function SignUpCard() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-rose-50 to-pink-50">
      <Card className="w-full max-w-md p-6">
        <CardContent className="space-y-4">
          <h1 className="text-xl font-semibold text-center mb-6">
            Get started with Dub
          </h1>

          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Work Email"
                className="h-11"
              />
            </div>

            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="h-11"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-11 w-11"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
              </Button>
            </div>

            <Button className="w-full h-11 bg-black hover:bg-black/90 text-white">
              Sign Up
            </Button>
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

          <Button variant="outline" className="w-full h-11" onClick={() => {}}>
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <Button variant="outline" className="w-full h-11" onClick={() => {}}>
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

