"use client";

import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  defaultImage: string;
  hoverImage: string;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  defaultImage,
  hoverImage,
  className,
}: FeatureCardProps) {
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
