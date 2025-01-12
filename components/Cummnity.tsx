"use client";

import { Bookmark, Search, TrendingUp, Filter, Clock } from "lucide-react";
import { useState } from "react";
import { Note } from "@/db/schema";
import { NoteCard } from "./NoteCard";

export const CommunityNotes = ({ notes }: { notes: Note[] }) => {
  const [activeFilter, setActiveFilter] = useState("latest");

  return (
      <div className="container mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
          {notes.map((note, index) => (
            <NoteCard
              key={index}
              project={{
                title: note.title,
                description: note.content,
                userId: note.userId,
                note_id: note.id,
                category: note.category || "General",
              }}
            />
          ))}
        </div>
      </div>
    
  );
};
