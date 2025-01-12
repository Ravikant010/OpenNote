'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usernameSchema, passwordSchema } from '@/models/index'
import Auth from '@/app/(auth)/login/auth'
import { signup } from '@/services/actions/auth-actions'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function SignupForm() {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

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
      router.push('/')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-pink-500/20 blur-[120px] animate-pulse" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto space-y-8 p-6 relative z-10"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Open Note
          </h1>
          <p className="text-lg text-muted-foreground">
            Your ideas, beautifully organized
          </p>
        </div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-card/80 backdrop-blur-lg rounded-xl border border-border/50 p-8 space-y-6 shadow-2xl"
        >
          {/* Auth providers */}
          <Auth />

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-sm uppercase">
              <span className="bg-card px-4 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Step 1: Email input */}
          {step === 1 ? (
            <form onSubmit={handleUsernameSubmit} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 h-12 text-base"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300"
              >
                Continue
              </Button>
            </form>
          ) : (
            /* Step 2: Password input */
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-background/50 h-12 text-base"
                  placeholder="Create a password"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300"
              >
                Create Account
              </Button>
            </form>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </motion.div>

        {/* Sign-in link */}
        <p className="text-center text-base text-muted-foreground">
          Already have an account?{" "}
          <a href="/signin" className="font-medium text-primary hover:underline">
            Sign in
          </a>
        </p>
      </motion.div>
    </div>
  )
}