"use client";
import { TypewriterEffectSmooth } from "@/components/ui/type-writer";

export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "O",
      className: "text-white text-[12rem] ", // white
    },
    {
      text: "P",
      className: "text-white text-[12rem]", // white
    },
    {
      text: "E",
      className: "text-white text-[12rem]", // white
    },
    {
      text: "N",
      className: "text-white text-[12rem]", // white
    },
    {
      text: "N",
      className: "text-blue-500 text-[12rem]", // Blue
    },
    {
      text: "O",
      className: "text-blue-500 text-[12rem]", // Blue
    },
    {
      text: "T",
      className: "text-blue-500 text-[12rem]", // Blue
    },
    {
      text: "E",
      className: "text-blue-500 text-[12rem]", // Blue
    },
  ];

  return <TypewriterEffectSmooth words={words} className="text-white  font-della-respira" />;
}
