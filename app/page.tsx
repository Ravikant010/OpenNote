"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import Menu from "@/components/menu";
import NoteCard, { Note } from "@/components/note-card";
import { useToast } from "@/hooks/use-toast";
import { FloatingNav } from "@/components/ui/floating_navbar";
import { LayoutDashboard, PlusCircle, UserCircle } from "lucide-react";
import { GridBackground } from "@/components/ui/GridBG";
import { BentoGrid, BentoGridDemo } from "@/components/ui/BentoGrid";

async function fetchAllNotes() {
  const response = await fetch(`/api/all-notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch all notes');
  }
  const { notes } = await response.json();
  if(!notes) return [];
  return notes;
}

export default function Home() {
  const [isShowMenu, setShowMenu] = useState(false);
  const [loader, setLoader] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast();
// const session = getSession()
  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }

  const handleLoadeer = () => {    setLoader(false);  }
  useEffect(() => {
    fetchAllNotes().then(setNotes).then(handleLoadeer).catch(error => {
      console.error(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    });

  }, []);

  const handleDelete = async (noteId: number) => {
    try {
      await fetch(`/api/deleteNote?noteId=${noteId}`, {
        method: 'DELETE',
      });
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      toast({
        title: "Success",
        description: "Note deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };


  if(loader) return <div>Loading...</div>

  return (
    <main className="min-h-screen w-full">
      <div className="fixed top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <FloatingNav navItems={[
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: <LayoutDashboard className="w-5 h-5" />
        },
        {
          name: "Create Note",
          link: "/note/create",
          icon: <PlusCircle className="w-5 h-5" />
        },
        {
          name: "Profile",
          link: "/profile",
          icon: <UserCircle className="w-5 h-5" />
        }
      ]}/>
   
      <section className="relative w-full overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] md:w-[1500px] lg:w-[2000px] h-[400px] rounded-[100%] bg-gradient-to-b from-purple-500/30 via-purple-500/10 to-transparent blur-[100px] z-30 pointer-events-none" />
     
        <GridBackground>
          <div className="w-full px-4 py-16 sm:py-24 lg:py-32">
            <h1 className="text-[2rem] sm:text-[2.4rem] text-center flex flex-col items-center justify-center font-bold capitalize font-sans bg-transparent bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent max-w-4xl mx-auto leading-relaxed relative z-20">
              Open Note <br/>
              <span className="text-xl sm:text-2xl mt-4">
                Share Your Ideas with the World 
                Create, Edit, and Publish Notes Seamlessly
              </span>
            </h1>
            
            <div className="flex justify-center mt-12 sm:mt-20 relative z-20">
              <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 tracking-wider">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Create Note
                </span>
              </button>
            </div>
          </div>
        </GridBackground>
      </section>

      <section className="w-full px-4 py-12 sm:py-16 lg:py-24 relative overflow-hidden -mt-32 sm:-mt-48 lg:-mt-60">
        {/* Large circular blur backgrounds */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-pink-500/20 blur-[120px] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-20">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            What the World is Writing
          </h1>
          <div className="w-48 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full mb-8 sm:mb-12 animate-pulse" />
        </div>

        <div className="relative z-20">
          {/* BentoGrid with circular glow */}
          <div className="relative rounded-2xl mx-auto max-w-[1000px]">
            {/* Circular glow effect */}
            <div className="absolute -inset-10 bg-gradient-radial from-purple-500/20 via-fuchsia-500/10 to-transparent rounded-full blur-[100px]" />
            <div className="relative rounded-xl overflow-hidden mt-12 sm:mt-16 lg:mt-20">
              <BentoGridDemo />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-16 sm:py-20 lg:py-24 relative overflow-hidden font-sans leading-relaxed -mt-16 sm:-mt-24 lg:-mt-32">
        {/* Background Elements */}
        <div className="absolute inset-0 top-48">
          <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-[100px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10 mt-20 sm:mt-32 lg:mt-40">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-8 leading-relaxed">
            We Are Excited to Have You Join Our Community
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 sm:my-24 lg:my-32">
            {[
              {
                title: "Study Notes",
                description: "Create and organize your academic notes with ease",
                bgImage: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                hoverGif: "https://i.giphy.com/media/3o7btZ1Gm7ZL25pLMs/giphy.gif"
              },
              {
                title: "Research Papers",
                description: "Collaborate on academic research and papers",
                bgImage: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                hoverGif: "https://i.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif"
              },
              {
                title: "Project Ideas",
                description: "Document and share your innovative project concepts",
                bgImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
                hoverGif: "https://i.giphy.com/media/l0HlMZrXA2H7aqpwI/giphy.gif"
              },

            ].map(e=> <CardDemo key={e.title} title={e.title} description={e.description} defaultImage={e.bgImage} hoverImage={e.hoverGif} />)
           } 
          </div>

          <footer className="mt-56 border-t border-slate-200 dark:border-slate-800 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Features</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Integrations</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Pricing</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Documentation</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Guides</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Help Center</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">About</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Blog</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Careers</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Privacy</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Terms</a></li>
                  <li><a href="#" className="text-sm text-slate-600 dark:text-slate-400 hover:text-purple-500">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-200 dark:border-slate-800 pt-8 text-center">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {new Date().getFullYear()} Open Note. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </section>
  
    </main>
  );
}

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/session";

interface CardDemoProps {
  title?: string;
  description?: string;
  defaultImage?: string;
  hoverImage?: string;
  className?: string;
}

export function CardDemo({
  title = "Background Overlays",
  description = "This card is for some special elements, like displaying background gifs on hover only.",
  defaultImage = "https://images.unsplash.com/photo-1476842634003-7dcca8f832de?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  hoverImage = "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWlodTF3MjJ3NnJiY3Rlc2J0ZmE0c28yeWoxc3gxY2VtZzA5ejF1NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/syEfLvksYQnmM/giphy.gif",
  className,
}: CardDemoProps) {
  return (
    <div className={cn("max-w-xs w-full", className)}>
      <div
        style={{
          backgroundImage: `url(${defaultImage})`,
          '--hover-image': `url(${hoverImage})`
        } as React.CSSProperties}
        className={cn(
          "group w-full cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "bg-cover bg-center",
          "before:fixed before:inset-0 before:opacity-0 before:z-[-1]",
          "hover:bg-[image:var(--hover-image)]",
          "hover:after:content-[''] hover:after:absolute hover:after:inset-0 hover:after:bg-black hover:after:opacity-50",
          "transition-all duration-500"
        )}
      >
        <div className="text relative z-50">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50 relative">
            {title}
          </h1>
          <p className="font-normal text-base text-gray-50 relative my-4">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
