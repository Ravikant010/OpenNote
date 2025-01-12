import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import AnimateOnScroll from "../animation";
import { NoteCard } from "../NoteCard";

const communityProjects = [
  {
    title: "Project Collaboration on AI Tools",
    description:
      "A group of developers collaborating on building AI tools for better productivity. Join their efforts and contribute!",
    username: "john_doe",
    avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`, // Random avatar URL
    category: "Tech",
  },
  {
    title: "Open-Source Documentation",
    description:
      "Community-driven open-source documentation for developers. Contribute to make resources more accessible to everyone.",
    username: "jane_doe",
    avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`, // Random avatar URL
    category: "Tech",
  },
  {
    title: "Improving Web Accessibility",
    description:
      "A passionate group working on improving web accessibility standards across platforms. Be part of the movement!",
    username: "mark_smith",
    avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`, // Random avatar URL
    category: "Tech",
  },
  {
    title: "Healthy Eating for Busy Professionals",
    description:
      "A wellness group focused on promoting healthy eating habits among busy professionals. Share your recipes and tips!",
    username: "lucy_adams",
    avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`, // Random avatar URL
    category: "Health",
  },
  {
    title: "Fitness Training for Beginners",
    description:
      "Join a group that’s helping beginners get started with fitness routines. Share your progress and support others!",
    username: "sara_brown",
    avatarUrl: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`, // Random avatar URL
    category: "Health",
  },
  // Add more community-driven projects as needed
];


export default function CommunitySection() {
  return (
    <>
      {communityProjects.map((project, index) => (
        <AnimateOnScroll key={index} animationClass="opacity-100 translate-y-0">
          <NoteCard project={project} />
        </AnimateOnScroll>
      ))}
    </>
  );
}