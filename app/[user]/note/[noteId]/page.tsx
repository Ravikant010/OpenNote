"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from "@/components/NoteCard";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarDays, Clock, Tag, ChevronLeft, Share2 } from "lucide-react";

async function fetchNoteDetails(user: string, noteId: string) {
  const response = await fetch(`/api/note/?user=${user}&noteId=${noteId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch note details');
  }
  const { note } = await response.json();
  return note;
}

export default function NoteDetailsPage() {
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const user = pathname.split('/')[1];
  const noteId = pathname.split('/')[3];

  useEffect(() => {
    fetchNoteDetails(user, noteId)
      .then(note => {
        setNote(note);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
          duration: 3000,
        });
      });
  }, [user, noteId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 p-4 flex items-center justify-center">
        <Card className="max-w-md w-full bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Note not found or unavailable.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.back()}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              // Implement share functionality
              toast({
                title: "Coming Soon",
                description: "Sharing feature will be available soon!",
                duration: 3000,
              });
            }}
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {note.title}
          </h1>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>Created {new Date(note.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <CardContent className="p-6">
            <div 
              className="prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: note.content }} 
            />
          </CardContent>
        </Card>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Tag className="h-4 w-4" />
              <span>Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {note.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}