import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
        Your Digital Notebook
      </h1>
      
      <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
        Create, organize, and share your notes with ease. Start your journey to better note-taking today.
      </p>

      <div className="flex gap-4 mt-8">
        <Link href="/note/create">
          <Button size="lg">
            Start Writing
          </Button>
        </Link>
        <Link href="/login">
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  );
} 