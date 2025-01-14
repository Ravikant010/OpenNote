"use client";
import React from "react";
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
  Heading4,
  Heading5,
  Heading6,
  Undo,
  Redo,
  ChevronRight,
  ChevronLeft,
  ListOrdered,
  Quote,
  Code,
  Superscript,
  Subscript,
} from "lucide-react";
import { IconBackground, IconTextColor } from "@tabler/icons-react";
import { useToast } from "@/hooks/use-toast";

interface ToolbarButtonProps {
  icon: React.ElementType;
  onClick: () => void;
  label: string;
  isActive?: boolean;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  icon: Icon,
  onClick,
  label,
  isActive,
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors group relative
      ${isActive ? "bg-blue-100" : "hover:bg-blue-50"}`}
    title={label}
  >
    <Icon
      size={20}
      className={`${
        isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
      }`}
    />
    <span
      className={`text-xs mt-1 ${
        isActive ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600"
      } text-wrap`}
    >
      {label}
    </span>
  </button>
);

export const ToolbarDivider: React.FC = () => (
  <div className="h-px bg-gray-200 w-full my-2" />
);

interface ToolbarProps {
  quill: any; // Quill instance
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  quill,
  isSidebarCollapsed,
  setSidebarCollapsed,
}) => {
  const { toast } = useToast();

  const handleFormat = (format: string, value?: any) => {
    if (!quill) {
      toast({
        title: "Error",
        description: "Quill editor is not available.",
        variant: "destructive",
      });
      return;
    }

    try {
      const range = quill.getSelection();
      if (range) {
        quill.format(format, value);
      }
    } catch (error) {
      toast({
        title: "Unsupported format",
        description: "This formatting option is not yet supported.",
        variant: "destructive",
      });
    }
  };

  const handleLink = () => {
    if (!quill) return;
    const url = prompt("Enter the URL:");
    if (url) {
      const range = quill.getSelection();
      if (range) {
        quill.format("link", url);
      }
    }
  };

  const handleImage = () => {
    if (!quill) return;
    const url = prompt("Enter the image URL:");
    if (url) {
      const range = quill.getSelection();
      if (range) {
        quill.insertEmbed(range.index, "image", url);
      }
    }
  };

  const handleColor = (type: "color" | "background") => {
    if (!quill) return;
    const color = prompt(`Enter ${type === "color" ? "text" : "background"} color:`);
    if (color) {
      quill.format(type, color);
    }
  };

  if (!quill) return null; // Do not render the toolbar if Quill is not available

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
        {isSidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
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
            <ToolbarButton icon={Undo} onClick={() => quill.history.undo()} label="Undo" />
            <ToolbarButton icon={Redo} onClick={() => quill.history.redo()} label="Redo" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Text Formatting */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={Bold}
              onClick={() => handleFormat("bold")}
              label="Bold"
              isActive={quill.getFormat().bold }
            />
            <ToolbarButton
              icon={Italic}
              onClick={() => handleFormat("italic")}
              label="Italic"
              isActive={quill.getFormat().italic}
            />
            <ToolbarButton
              icon={Underline}
              onClick={() => handleFormat("underline")}
              label="Underline"
              isActive={quill.getFormat().underline}
            />
            <ToolbarButton
              icon={Superscript}
              onClick={() => handleFormat("script", "super")}
              label="Sup"
            />
            <ToolbarButton
              icon={Subscript}
              onClick={() => handleFormat("script", "sub")}
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
              onClick={() => handleColor("color")}
              label="Text Color"
            />
            <ToolbarButton
              icon={IconBackground}
              onClick={() => handleColor("background")}
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
              onClick={() => handleFormat("align", "")}
              label="Left"
            />
            <ToolbarButton
              icon={AlignCenter}
              onClick={() => handleFormat("align", "center")}
              label="Center"
            />
            <ToolbarButton
              icon={AlignRight}
              onClick={() => handleFormat("align", "right")}
              label="Right"
            />
            <ToolbarButton
              icon={AlignJustify}
              onClick={() => handleFormat("align", "justify")}
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
              onClick={() => handleFormat("list", "bullet")}
              label="Bullet"
            />
            <ToolbarButton
              icon={ListOrdered}
              onClick={() => handleFormat("list", "ordered")}
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
              onClick={() => handleFormat("header", 1)}
              label="H1"
            />
            <ToolbarButton
              icon={Heading2}
              onClick={() => handleFormat("header", 2)}
              label="H2"
            />
            <ToolbarButton
              icon={Heading3}
              onClick={() => handleFormat("header", 3)}
              label="H3"
            />
            <ToolbarButton
              icon={Heading4}
              onClick={() => handleFormat("header", 4)}
              label="H4"
            />
            <ToolbarButton
              icon={Heading5}
              onClick={() => handleFormat("header", 5)}
              label="H5"
            />
            <ToolbarButton
              icon={Heading6}
              onClick={() => handleFormat("header", 6)}
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
              onClick={() => handleFormat("blockquote")}
              label="Quote"
            />
            <ToolbarButton
              icon={Code}
              onClick={() => handleFormat("code-block")}
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