"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Calendar, Tag, User, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { get_user_by_id } from "@/services/actions/User";

import UserAvatar from "./UserAvatar";
import { useRouter } from "next/navigation";

interface NoteCardProps {
  project: {
    title: string;
    description: string;
    userId: number;
    category: string;
    note_id: number;
    created_at?: string;
  };
}

export const NoteCard: React.FC<NoteCardProps> = ({ project }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [plainText, setPlainText] = useState(project.description);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stripHtmlTags = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
      };
      setPlainText(stripHtmlTags(project.description || ""));
    }
  }, [project.description]);

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const userData = await get_user_by_id(project.userId);
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, [project.userId]);

  const getCategoryColor = (category: string) => {
    const colors = {
      'Tech': 'bg-blue-50 text-blue-700 border-blue-200',
      'Health': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Education': 'bg-purple-50 text-purple-700 border-purple-200',
      'Business': 'bg-orange-50 text-orange-700 border-orange-200',
      'Life': 'bg-pink-50 text-pink-700 border-pink-200',
      'Travel': 'bg-indigo-50 text-indigo-700 border-indigo-200',
      'Art': 'bg-rose-50 text-rose-700 border-rose-200',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return new Date().toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
    
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const getReadTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime < 1 ? 1 : readTime;
  };

  return (
    <Card 
      className="group relative w-full h-80 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-gray-200 hover:-translate-y-1 overflow-hidden"
      onClick={() => {
        if (user) {
          router.push(`/user/${user.username}/note/${project.note_id}`);
        }
      }}
    >
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="w-full h-full bg-gradient-to-bl from-gray-400 to-transparent transform rotate-45"></div>
      </div>

      <CardContent className="p-6 h-full flex flex-col">
        {/* Header Section - Fixed Height */}
        <div className="flex items-start justify-between mb-4 min-h-[32px]">
          <Badge 
            variant="secondary" 
            className={`${getCategoryColor(project.category)} border-0 text-xs font-semibold px-3 py-1.5 rounded-full`}
          >
            {project.category}
          </Badge>
          
          {/* Read Time */}
          <div className="flex items-center text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 mr-1" />
            {getReadTime(plainText)} min
          </div>
        </div>

        {/* Title Section - Fixed Height with Clamping */}
        <div className="mb-4 min-h-[3.5rem] max-h-[3.5rem] overflow-hidden">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200">
            {project.title}
          </h3>
        </div>

        {/* Description Section - Fixed Height with Clamping */}
        <div className="mb-6 flex-grow min-h-[4.5rem] max-h-[4.5rem] overflow-hidden">
          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {plainText || "No description available..."}
          </p>
        </div>

        {/* Spacer to push footer to bottom */}
        <div className="flex-grow"></div>

        {/* Footer Section - Fixed Height */}
        <div className="mt-auto pt-4 border-t border-gray-50">
          {/* User Info Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-full animate-pulse flex-shrink-0" />
                  <div className="w-16 h-3 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : user ? (
                <>
                  <UserAvatar className="h-6 w-6 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-700 truncate">
                    {user.username}
                  </span>
                </>
              ) : (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-3 w-3 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-500">Anonymous</span>
                </div>
              )}
            </div>

            {/* Date */}
            <div className="flex items-center text-xs text-gray-400 flex-shrink-0 ml-2">
              <Calendar className="w-3 h-3 mr-1" />
              {formatDate(project.created_at)}
            </div>
          </div>

          {/* Read More Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700 transition-colors duration-200">
              <span>Read Article</span>
              <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
            
            {/* Progress Indicator */}
            <div className="w-16 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50/0 via-blue-50/0 to-blue-50/0 group-hover:from-blue-50/10 group-hover:via-transparent group-hover:to-purple-50/5 transition-all duration-500 rounded-2xl pointer-events-none" />
    </Card>
  );
};

export default NoteCard;
