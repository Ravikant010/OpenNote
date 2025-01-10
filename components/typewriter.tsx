"use client";
import { TypewriterEffectSmooth } from "@/components/ui/type-writer";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "O",
      className: "text-black", // Black
    },
    {
      text: "P",
      className: "text-black", // Black
    },
    {
      text: "E",
      className: "text-black", // Black
    },
    {
      text: "N",
      className: "text-black", // Black
    },
    {
      text: "N",
      className: "text-blue-500", // Blue
    },
    {
      text: "O",
      className: "text-blue-500", // Blue
    },
    {
      text: "T",
      className: "text-blue-500", // Blue
    },
    {
      text: "E",
      className: "text-blue-500", // Blue
    },
  ];

  return <TypewriterEffectSmooth words={words} className="text-black" />;
}
