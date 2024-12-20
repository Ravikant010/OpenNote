"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Note } from "@/components/NoteCard";
import NoteList from '@/components/NoteCard';
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast";

async function fetchUserNotes(user: string) {
  const response = await fetch(`/api/notes?user=${user}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const { notes } = await response.json();
  return notes;
}

async function deleteNoteById(noteId: number) {
  const response = await fetch(`/api/deleteNote?noteId=${noteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
  return response.json();
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const pathname = usePathname();
  const user = pathname.split('/')[1]; // Extract the user from the path
  const { toast } = useToast()
  useEffect(() => {
    fetchUserNotes(user).then(setNotes).catch(console.error);
  }, [user]);

  const handleDelete = async (noteId: number) => {
    try {
      await deleteNoteById(noteId);
      await fetchUserNotes(user).then(setNotes); // Refetch notes after deletion
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
      <h1 className="text-2xl font-bold mb-4">Notes for {user}</h1>
      <NoteList notes={notes} onDelete={handleDelete} username = {user}/>
    </div>
  );
}
