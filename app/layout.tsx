import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";

import ThemeProvider  from "@/components/ThemeProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "open-note",
  description: "write your note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
     className=" antialiased"
      >
       
        <ThemeProvider>

          {children}

   
        </ThemeProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
