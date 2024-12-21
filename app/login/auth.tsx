// pages/firebase-auth.js
"use client"; // This directive tells Next.js to execute this code only on the client
// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, firebaseConfig } from "@/firebase-config"; 
import { Button } from "@/components/ui/button";
import { signup } from "@/services/actions/auth-actions";
import { User } from "@/types/types";
import { useRouter } from "next/navigation";
// Initialize Firebase on the client
// Create a GoogleAuthProvider instance
const provider = new GoogleAuthProvider();
// Sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
   
    const user = result.user;
    const providerData: User = {
      ...user.providerData[0],
      providerId: "google.com",
      emailVerified: user.emailVerified,
      email: user.email || "",
      displayName: user.displayName || "",
      photoURL: user.photoURL || ""
    };
    const emailVerified = user.emailVerified
    // Handle successful sign-in (e.g., redirect to a protected page)
    await signup({...providerData, emailVerified})
    
  } catch (error) {
    // Handle errors
    console.error("Error signing in:", error);
  }
};
export default function Auth() {
  const router = useRouter()
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      return router.push("/")
      // Handle successful sign-in (e.g., redirect to a protected page)
    } catch (error) {
    console.error("Error signing in:", error);
    }
  };
  return (
    <Button
      variant="outline"
      className="w-full justify-center gap-2 border-gray-300 transition-colors duration-300 hover:bg-gray-200 rounded-lg"
      onClick={async () => await handleGoogleSignIn()}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Continue with Google
    </Button>
  );
}
