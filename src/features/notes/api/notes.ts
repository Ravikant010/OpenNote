import { Note } from "@/types";

export async function fetchAllNotes(): Promise<Note[]> {
  const response = await fetch(`/api/all-notes`);
  if (!response.ok) {
    throw new Error('Failed to fetch all notes');
  }
  const { notes } = await response.json();
  return notes || [];
}

export async function deleteNote(noteId: number): Promise<void> {
  const response = await fetch(`/api/deleteNote?noteId=${noteId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete note');
  }
}

export async function createNote(note: Partial<Note>): Promise<Note> {
  const response = await fetch('/api/save-note', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error('Failed to create note');
  }
  return response.json();
}
