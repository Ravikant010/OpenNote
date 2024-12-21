"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "quill/dist/quill.snow.css";

// Dynamic import for Quill
const Quill = dynamic(
  async () => {
    const { default: Quill } = await import('quill');
    return ({ forwardedRef, ...props }: any) => <div ref={forwardedRef} {...props} />;
  },
  { 
    ssr: false,
    loading: () => <div>Loading editor...</div>
  }
);

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
          const QuillModule = await import('quill');
          const quill = new QuillModule.default(editorRef.current, {
         
            placeholder: 'Write something...',
          });
          quillRef.current = quill;
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