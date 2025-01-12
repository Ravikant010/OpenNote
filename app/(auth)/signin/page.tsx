"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { login } from "@/services/actions/auth-actions";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) return;

    try {
      // Get values from the form using formRef
      const email = (formRef.current["email"] as HTMLInputElement).value;
      const password = (formRef.current["password"] as HTMLInputElement).value;

      // Create FormData object
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      // Perform login action with FormData
      const response = await login(formData);

      if (response.success) {
        router.push("/"); // Redirect to home page on successful login
      } else {
        //@ts-ignore
        setError(response.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password."
      );
    }
  };

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

          {/* Login form */}
          <form ref={formRef} onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                className="bg-background/50 h-12 text-base"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-base">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                className="bg-background/50 h-12 text-base"
                placeholder="Enter your password"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full h-12 text-base bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300"
            >
              Login
            </Button>
          </form>
        </motion.div>

        {/* Sign-up link */}
        <p className="text-center text-base text-muted-foreground">
          Don't have an account?{" "}
          <a href="/login" className="font-medium text-primary hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}