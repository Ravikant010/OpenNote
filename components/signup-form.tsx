'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usernameSchema, passwordSchema } from '@/models/index'
import Auth from '@/app/login/auth'
import { signup } from '@/services/actions/auth-actions'

export default function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Ensure client-side only code runs here
  }, [])

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await usernameSchema.parseAsync({ email })
      setStep(2)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await passwordSchema.parseAsync({ password })
      await signup({ email, password, providerId: "open-note" })
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Welcome to Open-Note</h1>
          <p className="mt-2 text-sm text-gray-600">
            Contact management designed for teams and individuals
          </p>
        </div>

        <div className="mt-8">
          <Auth />

          <div className="mt-6 text-sm">
            <div className="relative flex items-center">
              <div className="flex-grow border-t border-gray-300" />
              <span className="px-2 text-gray-500">Or continue with</span>
              <div className="flex-grow border-t border-gray-300" />
            </div>
          </div>

          {step === 1 ? (
            <form onSubmit={handleUsernameSubmit} className="mt-6 space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <Button type="submit" className="w-full transition-colors duration-300 hover:bg-gray-700 hover:text-white rounded-lg">
                Next
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="mt-6 space-y-6">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <Button type="submit" className="w-full transition-colors duration-300 hover:bg-gray-700 hover:text-white rounded-lg">
                Sign up
              </Button>
            </form>
          )}

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  )
}