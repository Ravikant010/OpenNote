import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import AnimateOnScroll from "../animation";

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

const CommunityCard: React.FC<{
  project: {
    title: string;
    description: string;
    username: string;
    avatarUrl: string;
    category: string;
  };
}> = ({ project }) => {
  return (
    <Card className="flex-1 p-6 bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.02]">
      <div className="flex flex-col space-y-4">
        {/* User Info */}
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={project.avatarUrl} />
            <AvatarFallback>{project.username}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-gray-800">
            {project.username}
          </span>
        </div>

        {/* Project Title and Description */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 md:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Category Badge */}
        <div>
          <Badge variant="outline" className="rounded-full border-gray-300 text-black ml-2">
            {project.category}
          </Badge>
        </div>

        {/* Explore Button */}
        <Button
          variant="ghost"
          className="mt-2 w-fit rounded-full text-gray-800 hover:bg-gray-100"
        >
          Explore More
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default function CommunitySection() {
  return (
    <>
      {communityProjects.map((project, index) => (
        <AnimateOnScroll key={index} animationClass="opacity-100 translate-y-0">
          <CommunityCard project={project} />
        </AnimateOnScroll>
      ))}
    </>
  );
}