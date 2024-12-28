"use client";
import { redirect } from "next/navigation";
import NoteCard from "@/components/note-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/db/schema";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[] | null;
  isPublic: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

interface ProfilePageProps {
  notes: Note[];
  user: User;
}

export default function ProfilePage({ notes: _notes, user }: ProfilePageProps) {
  if (!user) {
    redirect('/login');
  }

  const [notes, setNotes] = useState<Note[]>(Array.isArray(_notes) ? _notes : []);

  const { toast } = useToast();

  const handleDelete = async (noteId: number) => {
    try {
      await fetch(`/api/deleteNote?noteId=${noteId}`, {
        method: 'DELETE',
      });
      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
      toast({
        title: "Success",
        description: "Note deleted successfully!",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <img
              src={user.avatar || "/default-avatar.png"}
              alt="Profile Picture"
              className="w-32 h-32 rounded-full object-cover"
            />
            <div className="text-center">
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">Total Notes: {notes.length}</p>
            </div>
            {/* <Button
              variant="outline"
              onClick={() => redirect('/edit-profile')}
              className="mt-4"
            >
              Edit Profile
            </Button> */}
          </div>
        </CardContent>
      </Card>
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      
      <NoteCard notes={notes} onDelete={handleDelete}  />
    </div>
  );
}