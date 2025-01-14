"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Link,
  Image,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Save,
  Undo,
  Redo,
  ChevronRight,
  ChevronLeft,
  Type,
  ListOrdered,
  Quote,
  Code,
  Coffee,
  Eye,
  Superscript,
  Subscript,
  Heading4,
  Heading5,
  Heading6,
} from "lucide-react";
import { IconBackground, IconTextColor } from "@tabler/icons-react";
import { create_note } from "@/services/actions/saveNote";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { noteSchema } from "@/models";
import { useRouter } from "next/navigation";

// ToolbarButton Component
interface ToolbarButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
  command?: string;
  activeFormats?: Set<string>;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  command,
  activeFormats,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors group relative
      ${
        activeFormats?.has(command || "") ? "bg-blue-100" : "hover:bg-blue-50"
      }`}
    title={label}
  >
    <Icon
      size={20}
      className={`${
        activeFormats?.has(command || "")
          ? "text-blue-600"
          : "text-gray-600 group-hover:text-blue-600"
      }`}
    />
    <span
      className={`text-xs mt-1 ${
        activeFormats?.has(command || "")
          ? "text-blue-600"
          : "text-gray-500 group-hover:text-blue-600"
      } text-wrap`}
    >
      {label}
    </span>
  </button>
);

// ToolbarDivider Component
const ToolbarDivider: React.FC = () => (
  <div className="h-px bg-gray-200 w-full my-2" />
);

// Toolbar Component
interface ToolbarProps {
  formatText: (command: string, value?: string) => void;
  activeFormats: Set<string>;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  formatText,
  activeFormats,
  isSidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { toast } = useToast();

  const handleLink = () => {
    toast({
      title: "Insert Link",
      description: "Enter the URL for the link:",
      action: (
        <div className="p-4">
          <Input
            id="link-url"
            placeholder="https://example.com"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const url = e.currentTarget.value;
                if (url) {
                  formatText("createLink", url);
                  toast({ title: "Link added successfully!" });
                }
              }
            }}
          />
        </div>
      ),
    });
  };

  const handleImage = () => {
    toast({
      title: "Insert Image",
      description: "Enter the URL for the image:",
      action: (
        <div className="p-4">
          <Input
            id="image-url"
            placeholder="https://example.com/image.png"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const url = e.currentTarget.value;
                if (url) {
                  formatText("insertImage", url);
                  toast({ title: "Image added successfully!" });
                }
              }
            }}
          />
        </div>
      ),
    });
  };

  const handleColor = (type: "foreColor" | "backColor") => {
    toast({
      title: `Set ${type === "foreColor" ? "Text" : "Background"} Color`,
      description: `Enter a color (e.g., red, #ff0000):`,
      action: (
        <div className="p-4">
          <Input
            id="color-input"
            placeholder={
              type === "foreColor" ? "Text color" : "Background color"
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const color = e.currentTarget.value;
                if (color) {
                  formatText(type, color);
                  toast({ title: `Color applied successfully!` });
                }
              }
            }}
          />
        </div>
      ),
    });
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarCollapsed ? "w-16" : "w-fit"
      } border-l bg-white shadow-sm flex flex-col`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        className="p-2 hover:bg-gray-100 border-b transition-colors"
      >
        {isSidebarCollapsed ? (
          <ChevronLeft size={20} />
        ) : (
          <ChevronRight size={20} />
        )}
      </button>

      {/* Toolbar Groups */}
      <div
        className={`flex-col gap-4 p-2 overflow-y-auto ${
          isSidebarCollapsed ? "hidden" : "flex"
        }`}
      >
        {/* History */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={Undo}
              onClick={() => formatText("undo")}
              label="Undo"
            />
            <ToolbarButton
              icon={Redo}
              onClick={() => formatText("redo")}
              label="Redo"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Text Formatting */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={Bold}
              onClick={() => formatText("bold")}
              label="Bold"
              command="bold"
              activeFormats={activeFormats}
            />
            <ToolbarButton
              icon={Italic}
              onClick={() => formatText("italic")}
              label="Italic"
              command="italic"
              activeFormats={activeFormats}
            />
            <ToolbarButton
              icon={Underline}
              onClick={() => formatText("underline")}
              label="Underline"
              command="underline"
              activeFormats={activeFormats}
            />
            <ToolbarButton
              icon={Superscript}
              onClick={() => formatText("superscript")}
              label="Sup"
            />
            <ToolbarButton
              icon={Subscript}
              onClick={() => formatText("subscript")}
              label="Sub"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Colors */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={IconTextColor}
              onClick={() => handleColor("foreColor")}
              label="Text Color"
            />
            <ToolbarButton
              icon={IconBackground}
              onClick={() => handleColor("backColor")}
              label="Background Color"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Alignment */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={AlignLeft}
              onClick={() => formatText("justifyLeft")}
              label="Left"
            />
            <ToolbarButton
              icon={AlignCenter}
              onClick={() => formatText("justifyCenter")}
              label="Center"
            />
            <ToolbarButton
              icon={AlignRight}
              onClick={() => formatText("justifyRight")}
              label="Right"
            />
            <ToolbarButton
              icon={AlignJustify}
              onClick={() => formatText("justifyFull")}
              label="Justify"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Lists */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={List}
              onClick={() => formatText("insertUnorderedList")}
              label="Bullet"
            />
            <ToolbarButton
              icon={ListOrdered}
              onClick={() => formatText("insertOrderedList")}
              label="Number"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Headings */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={Heading1}
              onClick={() => formatText("formatBlock", "<h1>")}
              label="H1"
            />
            <ToolbarButton
              icon={Heading2}
              onClick={() => formatText("formatBlock", "<h2>")}
              label="H2"
            />
            <ToolbarButton
              icon={Heading3}
              onClick={() => formatText("formatBlock", "<h3>")}
              label="H3"
            />
            <ToolbarButton
              icon={Heading4}
              onClick={() => formatText("formatBlock", "<h4>")}
              label="H4"
            />
            <ToolbarButton
              icon={Heading5}
              onClick={() => formatText("formatBlock", "<h5>")}
              label="H5"
            />
            <ToolbarButton
              icon={Heading6}
              onClick={() => formatText("formatBlock", "<h6>")}
              label="H6"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Special Formats */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={Quote}
              onClick={() => formatText("formatBlock", "<blockquote>")}
              label="Quote"
            />
            <ToolbarButton
              icon={Code}
              onClick={() => formatText("formatBlock", "<pre>")}
              label="Code"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Insert */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Link} onClick={handleLink} label="Link" />
            <ToolbarButton icon={Image} onClick={handleImage} label="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

// EditorLayout Component
const EditorLayout = () => {
  const [title, setTitle] = useState("");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState(new Set<string>());
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const [lastSaved, setLastSaved] = useState("Not saved");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const checkActiveFormats = () => {
      const formats = new Set<string>();
      if (document.queryCommandState("bold")) formats.add("bold");
      if (document.queryCommandState("italic")) formats.add("italic");
      if (document.queryCommandState("underline")) formats.add("underline");
      setActiveFormats(formats);
    };

    document.addEventListener("selectionchange", checkActiveFormats);
    return () =>
      document.removeEventListener("selectionchange", checkActiveFormats);
  }, []);

  const updateWordCount = () => {
    const text = editorRef.current?.innerText || "";
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);
    setWordCount(words.length);
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateWordCount();
  };

  const simulateSave = async () => {
    try {
      const now = new Date();
      setLastSaved(`Last saved at ${now.toLocaleTimeString()}`);

      const noteData = {
        title: title.trim(),
        content: editorRef.current?.innerHTML || "",
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as const;

      const validatedNote = noteSchema.parse(noteData);
      await create_note({
        title: validatedNote.title,
        content: validatedNote.content,
        isPublic: validatedNote.isPublic ?? true,
        tags: null
      });

      toast({
        title: "Note Saved",
        description: "Your note has been saved successfully!",
      });

      router.push("/");
    } catch (error) {
      console.error("Failed to save note:", error);
      toast({
        title: "Error",
        description: "Failed to save the note. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      {/* Top Navbar */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16 xl:h-18">
            <div className="flex items-center gap-4 flex-1 w-full">
              <span className="text-sm md:text-2xl font-bold text-blue-600 xl:w-32">
                Open Note Editor
              </span>
              <span className="text-sm text-gray-500 line-clamp-1 md:line-clamp-0">
                {lastSaved}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye size={18} />
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={simulateSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-100 ease-in-out"
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Main Content Area */}
        <div className="flex-1 px-8 py-6 xl:max-w-7xl mx-auto">
          {/* Document Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Document"
            className="w-full text-4xl font-bold text-gray-900 mb-6 outline-none border-b border-gray-300 pb-2 focus:border-blue-600 transition-colors bg-transparent"
          />

          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Type size={14} />
                {wordCount} words
              </span>
              <span className="flex items-center gap-1">
                <Coffee size={14} />
                {Math.ceil(wordCount / 200)} min read
              </span>
            </div>
          </div>

          {/* Editor Area */}
          <div
            ref={editorRef}
            contentEditable={!isPreview}
            onKeyDown={(e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                formatText("insertText", "    ");
              }
            }}
            onInput={updateWordCount}
            className={`h-[calc(100vh-250px)] bg-white editor border rounded-lg shadow-sm p-6 outline-none overflow-scroll 
              ${isPreview ? "prose max-w-none" : ""}`}
            style={{ whiteSpace: "pre-wrap" }}
          />
        </div>

        {/* Toolbar */}
        <Toolbar
          formatText={formatText}
          activeFormats={activeFormats}
          isSidebarCollapsed={isSidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </div>
    </div>
  );
};

export default EditorLayout;