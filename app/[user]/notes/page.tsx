"use client"
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react';
import { Note } from "@/components/NoteCard";
import NoteList from '@/components/NoteCard';

async function fetchUserNotes(user: string) {
  const response = await fetch(`/api/notes?user=${user}`);
  if (!response.ok) {
    throw new Error('Failed to fetch notes');
  }
  const{notes} = await  response.json()
console.log(notes)
  return notes;
}
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const pathname = usePathname();
  const user = pathname.split('/')[1]; // Extract the user from the path

  useEffect(() => {
    fetchUserNotes(user).then(setNotes).catch(console.error);
  }, [user]);

  return (
    <div>
      <h1>Notes for {user}</h1>
      <ul>

          <NoteList notes={notes} />
      
      </ul>
    </div>
  );
}
