import { useState, useRef } from 'react';
import { type Note } from '@/lib/schema/note';
import Quill from 'quill';

export function useNote() {
  const quillRef = useRef<Quill | null>(null);
  const [title, setTitle] = useState("");
  const [showRichTextOptions, setShowRichTextOptions] = useState(false);
  
  const toggleRichTextOptions = () => setShowRichTextOptions(prev => !prev);
  
  const getCurrentNote = (): Partial<Note> => ({
    title,
    content: quillRef.current?.root.innerHTML || "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return {
    title,
    setTitle,
    quillRef,
    showRichTextOptions,
    toggleRichTextOptions,
    getCurrentNote,
  };
}