"use client";

import { BentoGridDemo } from "@/components/ui/BentoGrid";
import { SectionTitle } from "@/components/ui/section-title";

export function FeaturedSection() {
  return (
    <section className="w-full px-4 py-12 sm:py-16 lg:py-24 relative overflow-hidden -mt-32 sm:-mt-48 lg:-mt-60">
      {/* Large circular blur backgrounds */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-pink-500/20 blur-[120px] animate-pulse" />
      </div>

      <SectionTitle title="What the World is Writing" />

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
  );
}
