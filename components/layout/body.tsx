"use client"
import React from 'react'

type Props = {}

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/theme-toggle";
import { getSession } from "@/lib/session";
import { HeroSection } from "@/components/home/hero-section";

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



import { FeatureCard } from "@/components/ui/feature-card";

const features = [
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
];

export default function Body() {
  return (
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
          {features.map(feature => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              defaultImage={feature.bgImage}
              hoverImage={feature.hoverGif}
            />
          ))}
        </div>
      </div>
    </section>
  );
}