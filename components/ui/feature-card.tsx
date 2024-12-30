"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

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
        className={cn(
          "group relative w-full cursor-pointer overflow-hidden rounded-md shadow-xl mx-auto flex flex-col justify-end p-4 border border-transparent dark:border-neutral-800",
          "h-96"
        )}
      >
        {/* Default Image */}
        <Image
          src={defaultImage}
          alt={`${title} default`}
          layout="fill"
          objectFit="cover"
          className="transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          priority
        />

        {/* Hover GIF or Video */}
        <Image
          src={defaultImage}
        fill
          alt={title}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />

        {/* Content */}
        <div className="text relative z-10 bg-black bg-opacity-50 p-4 rounded-md">
          <h1 className="font-bold text-xl md:text-3xl text-gray-50">
            {title}
          </h1>
          <p className="font-normal text-base text-gray-50 mt-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
