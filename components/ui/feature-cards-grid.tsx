"use client";

import { FeatureCard } from "./feature-card";

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

export function FeatureCardsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16 sm:my-24 lg:my-32">
      {features.map((feature) => (
        <FeatureCard
          key={feature.title}
          title={feature.title}
          description={feature.description}
          defaultImage={feature.bgImage}
          hoverImage={feature.hoverGif}
        />
      ))}
    </div>
  );
}
