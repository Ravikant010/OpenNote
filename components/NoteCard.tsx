"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { get_user_by_id } from "@/services/actions/User";
import { User } from "@/db/schema";
import dynamic from 'next/dynamic';
import UserAvatar from "./UserAvatar";
import DOMPurify from 'dompurify';
import { useRouter } from "next/navigation";

interface NoteCardProps {
  project: {
    title: string;
    description: string;
    userId: number;
    category: string;
    note_id: number;
  };
}

export const NoteCard: React.FC<NoteCardProps> = ({ project }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Move sanitization to useEffect or a click handler
  const [sanitizedDescription, setSanitizedDescription] = useState(project.description);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSanitizedDescription(DOMPurify.sanitize(project.description || ""));
    }
  }, [project.description]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await get_user_by_id(project.userId);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    getUser();
  }, [project.userId]);

  return (
    <Card className="w-full   transition-colors duration-200 cursor-pointer border-0 shadow-none rounded-none bg-gray-100"
    onClick={() => {
      if (user) {
        router.push(`/user/${user.username}/note/${project.note_id}`);
      }
    }}>
      <CardContent className="p-6 w-full">
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
            {project.title}
          </h3>

          {/* Description */}
          <div 
            className="text-sm text-gray-600 line-clamp-3 min-h-[4.5rem]"
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
          />

          {/* Footer: User Info, Category, and Date */}
          <div className="text-blue-500 flex items-center">
              Read More
              <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          <div className="flex items-center justify-start pt-4 text-xs text-gray-500">
            <div className="flex items-center space-x-2 justify-start">
              {user ? (
                <>
              <UserAvatar className="h-6 w-6"/>
                  <span>{user.username || "Loading..."}</span>
                </>
              ) : (
                <Avatar className={`h-10 w-10 `}>
                {/* Avatar Image */}
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/pixel-art/svg/${Math.random()}`} // Use the user's avatar URL or fallback to an empty string
                  alt={"User"} // Use the username as alt text or fallback to "User"
                />
          
                {/* Avatar Fallback */}
                <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                 user
                </AvatarFallback>
              </Avatar>
              )}
              <span className="text-gray-300">|</span>
              <span>{project.category}</span>
              <span className="text-gray-300">|</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>

            {/* Read More */}
            
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;