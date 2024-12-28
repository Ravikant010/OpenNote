"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface NavItem {
  name: string;
  link: string;
  icon: ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
}

export function FloatingNav({ navItems, className }: FloatingNavProps) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn("fixed top-4 left-1/2 -translate-x-1/2 z-50", className)}
    >
      <div className="flex items-center gap-4 p-2 rounded-full bg-gray-950/50 backdrop-blur-lg border border-gray-800/50">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="p-2 text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2"
          >
            {item.icon}
            <span className="hidden sm:inline">{item.name}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
