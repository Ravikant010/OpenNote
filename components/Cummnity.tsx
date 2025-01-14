"use client";

import { Bookmark, Search, TrendingUp, Filter, Clock } from "lucide-react";
import { useState } from "react";
import { Note } from "@/db/schema";
import { NoteCard } from "./NoteCard";

export const CommunityNotes = ({ notes }: { notes: Note[] }) => {
  const [activeFilter, setActiveFilter] = useState("latest");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 ">
      {notes.map((note) => (
        <div key={note.id}>
          <NoteCard
            project={{
              title: note.title,
              description: note.content,
              userId: note.userId,
              note_id: note.id,
              category: Array.isArray(note.tags) && note.tags.length > 0 ? note.tags[0] : "General",
            }}
          />
        </div>
      ))}
    </div>
  );
};