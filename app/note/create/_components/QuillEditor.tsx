"use client";
import React, { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  quillRef: React.MutableRefObject<any>;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ quillRef }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initQuill = async () => {
      if (editorRef.current && !quillRef.current) {
        try {
          const Quill = (await import("quill")).default;
          const quill = new Quill(editorRef.current, {
            placeholder: "Write something...",
            theme: "snow", // Ensure the theme is set to "snow" for the default Quill styles
          });

          // Customize the editor's font size
          quill.container.style.fontSize = "2rem";

          // Save the Quill instance to the ref
          quillRef.current = quill;
        } catch (error) {
          console.error("Failed to initialize Quill:", error);
        }
      }
    };

    if (mounted) {
      initQuill();
    }
  }, [mounted, quillRef]);

  useEffect(() => {
    setMounted(true); // Set mounted to true after the component mounts
  }, []);

  if (!mounted) {
    return <div>Loading editor...</div>; // Show a loading state while Quill is initializing
  }

  return (
    <div
      className="flex-grow overflow-auto bg-white dark:bg-transparent focus:border-none focus:outline-none font-mono tracking-normal placeholder:text-white h-[calc(100vh-250px)]"
      id="editor"
      ref={editorRef}
    ></div>
  );
};

export default QuillEditor;