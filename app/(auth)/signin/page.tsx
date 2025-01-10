"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usernameSchema, passwordSchema } from "@/models/index";
import { login } from "@/services/actions/auth-actions";
import { useRouter } from "next/navigation";

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

      // Validate email and password
      //   usernameSchema.parse(email); // Validate email as a string
      //   passwordSchema.parse(password); // Validate password as a string

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
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
      </div>
    </div>
  );
}
