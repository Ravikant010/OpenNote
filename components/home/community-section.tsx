"use client";

import { FeatureCardsGrid } from "@/components/ui/feature-cards-grid";

export function CommunitySection() {
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

        <FeatureCardsGrid />
      </div>
    </section>
  );
}
