"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  quillRef: React.MutableRefObject<any>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ quillRef }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initQuill = async () => {
      if (mounted && editorRef.current && !quillRef.current) {
        try {
          const Quill = (await import('quill'));
          if(Quill){
            //@ts-ignore
          const quill = new Quill(editorRef.current, {
         
            placeholder: 'Write something...',
          });
          quillRef.current = quill;
        }
        } catch (error) {
          console.error('Failed to initialize Quill:', error);
        }
      }
    };

    if (mounted) {
      initQuill();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div
      className="flex-grow overflow-auto mx-2 min-h-[200px] bg-white dark:bg-transparent focus:border-none focus:outline-none font-mono tracking-normal"
      id="editor"
      ref={editorRef}
    ></div>
  );
};

export default QuillEditor;