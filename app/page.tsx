"use client";
import { useEffect, useState } from "react";
import { Header } from "@/components/header";
import Menu from "@/components/menu";
import NoteCard, { Note } from "@/components/note-card";
import { useToast } from "@/hooks/use-toast";

async function fetchAllNotes() {
  const response = await fetch(`/api/all-notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch all notes');
  }
  const { notes } = await response.json();
  if(!notes) return [];
  return notes;
}

export default function Home() {
  const [isShowMenu, setShowMenu] = useState(false);
  const [loader, setLoader] = useState(true);
  const [notes, setNotes] = useState<Note[]>([]);
  const { toast } = useToast();

  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }

  const handleLoadeer = () => {    setLoader(false);  }
  useEffect(() => {
    fetchAllNotes().then(setNotes).then(handleLoadeer).catch(error => {
      console.error(error);
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
        duration: 3000,
      });
    });

  }, []);

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
  if(loader) return <div>Loading...</div>

  return (
    <div className=" ">
      <Menu isShowMenu={isShowMenu} toggleMenu={toggleMenu} />
      <Header toggleMenu={toggleMenu} isShowMenu={isShowMenu} />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">All Notes</h1>
       {notes.length ?  <NoteCard notes={notes} onDelete={handleDelete}  /> : <div className="text-center">No notes found</div>}
      </div>
    </div>
  );
}
