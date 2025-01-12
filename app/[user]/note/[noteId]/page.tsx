"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronLeft, Share2, Bookmark, MoreVertical, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const user = pathname.split("/")[1];
  const noteId = pathname.split("/")[3];

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await fetch(`/api/note/?user=${user}&noteId=${noteId}`);
        if (!response.ok) throw new Error("Failed to fetch note");
        const { note } = await response.json();
        setNote(note);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchNote();
  }, [user, noteId, toast]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600">Note not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b w-full">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 2xl:max-w-[1560px]">
          <div className="h-14 flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
              aria-label="Go back"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="More options">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    <span>Share</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bookmark className="mr-2 h-4 w-4" />
                    <span>Save</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Edit2 className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 2xl:max-w-[1560px]">
        <article className="space-y-6">
          {/* Category & Date */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{note.category}</span>
            <span>•</span>
            <time>{new Date(note.createdAt).toLocaleDateString()}</time>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{note.title}</h1>

          {/* Author */}
          <div className="flex items-center gap-3 py-4 border-y">
            <Avatar className="h-10 w-10">
              <AvatarImage src={note.user?.avatar} alt={note.user?.username} />
              <AvatarFallback className="bg-gray-100 text-gray-600">
                {note.user?.username?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-gray-900">{note.user?.username}</div>
              <div className="text-sm text-gray-500">Author</div>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-gray max-w-none
              prose-p:text-gray-600 
              prose-headings:text-gray-900
              prose-a:text-blue-600 hover:prose-a:text-blue-700
              prose-strong:text-gray-900
              prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-100 
              prose-blockquote:border-l-gray-300
              prose-li:text-gray-600"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
        </article>
      </main>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-white max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 2xl:max-w-[1560px]">
    <div className="space-y-6">
      {/* Category & Date Skeleton */}
      <div className="flex gap-4">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Title Skeleton */}
      <Skeleton className="h-8 w-3/4" />

      {/* Author Skeleton */}
      <div className="flex items-center gap-3 py-4 border-y">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  </div>
);

export default NoteDetailsPage;