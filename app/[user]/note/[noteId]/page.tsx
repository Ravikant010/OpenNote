"use client";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Note } from "@/components/NoteCard";
import { useToast } from "@/hooks/use-toast";

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
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();
  const user = pathname.split('/')[1]; // Extract the user from the path
  const noteId = pathname.split('/')[3]; // Extract the noteId from the path

//   console.log(user, noteId);

  useEffect(() => {
    fetchNoteDetails(user, noteId).then(setNote).catch(error => {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        duration: 3000,
      });
    });
  }, [user, noteId]);

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      <div className="prose max-w-none h-fit" dangerouslySetInnerHTML={{ __html: note.content }} />
      <div className="text-sm text-gray-500 mt-4">
        <p>Created at: {new Date(note.createdAt).toLocaleString()}</p>
        <p>Updated at: {new Date(note.updatedAt).toLocaleString()}</p>
      </div>
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {note.tags.map(tag => (
            <span key={tag} className="badge badge-secondary">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}