import { useState, useEffect } from 'react';
import { Note } from '@/types';
import { fetchAllNotes, deleteNote } from '../api/notes';
import { useToast } from '@/hooks/use-toast';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    try {
      const fetchedNotes = await fetchAllNotes();
      setNotes(fetchedNotes);
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(noteId: number) {
    try {
      await deleteNote(noteId);
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
  }

  return {
    notes,
    isLoading,
    handleDelete,
    refreshNotes: loadNotes,
  };
}
