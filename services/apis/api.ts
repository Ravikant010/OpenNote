"use server"
interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export async function fetchAllNotes(): Promise<Note[]> {
  try {
    const response = await fetch(`http://localhost:3000/api/all-notes`);
    if (!response.ok) {
      throw new Error('Failed to fetch all notes');
    }
    const { notes } = await response.json();
    if (!notes) return [];
    return notes as Note[];
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
}