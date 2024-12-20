import React from 'react';
import { Button } from "@/components/ui/button";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import CloseMenu from '../CloseMenu';

import Quill from "quill";
import { FormattingProps } from './types';
import { TextFormatting } from './text-editor-formatting';
import { AlignPosition } from './types/editor';

// Shared button styles
const baseButtonStyles = "rounded-md hover:bg-gray-200 dark:hover:bg-gray-800";

// Color configuration
const COLORS = [
  { value: "#87CEEB", name: "Sky Blue" },
  { value: "#F08080", name: "Light Coral" },
  { value: "#98FB98", name: "Pale Green" },
  { value: "#FFD700", name: "Golden Yellow" },
  { value: "#E6E6FA", name: "Lavender" },
  { value: "#FA8072", name: "Salmon" },
  { value: "#BA55D3", name: "Medium Orchid" },
  { value: "#20B2AA", name: "Light Sea Green" },
  { value: "#708090", name: "Slate Gray" },
  { value: "#F4A460", name: "Sandy Brown" }
];

// Font configuration
const FONTS = [
  { value: "serif", name: "Serif" },
  { value: "", name: "Sans-Serif" },
  { value: "monospace", name: "Monospace" },

];

// Size configuration
const SIZES = [
  { value: "small", name: "Small" },
  { value: "", name: "Normal" },
  { value: "large", name: "Large" },
  { value: "huge", name: "Huge" }
];

export function Colors({ handleCloseComponent, quillRef }: FormattingProps) {
  const quill = quillRef.current;
  if (!quill) return null;
  
  const formatter = new TextFormatting(quill);
  
  return (
    <div className="flex overflow-x-auto w-full">
      <CloseMenu onClose={handleCloseComponent} />
      {COLORS.map(({ value, name }) => (
        <Button
          key={value}
          style={{ backgroundColor: value }}
          className="w-7 h-7 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0"
          onClick={() => formatter.setColor(value)}
          title={name}
        />
      ))}
    </div>
  );
}

export function Alignment({ handleCloseComponent, quillRef }: FormattingProps) {
  const quill = quillRef.current;
  if (!quill) return null;

  const formatter = new TextFormatting(quill);

  const alignmentOptions: Array<{
    icon: React.FC<{ className?: string }>;
    value: AlignPosition;
    label: string;
  }> = [
    { icon: AlignLeft, value: 'left', label: 'Align Left' },
    { icon: AlignCenter, value: 'center', label: 'Align Center' },
    { icon: AlignRight, value: 'right', label: 'Align Right' },
    { icon: AlignJustify, value: 'justify', label: 'Align Justify' }
  ];

  return (
    <div className="flex gap-2">
      <CloseMenu onClose={handleCloseComponent} />
      {alignmentOptions.map(({ icon: Icon, value, label }) => (
        <Button
          key={value}
          variant="ghost"
          className={`p-2 ${baseButtonStyles}`}
          onClick={() => formatter.setAlign(value)}
          title={label}
        >
          <Icon className="w-5 h-5" />
        </Button>
      ))}
    </div>
  );
}

export function Fonts({ handleCloseComponent, quillRef }: FormattingProps) {
  const quill = quillRef.current;
  if (!quill) return null;

  const formatter = new TextFormatting(quill);

  return (
    <div className="flex gap-2">
      <CloseMenu onClose={handleCloseComponent} />
      {FONTS.map(({ value, name }) => (
        <Button
          key={value}
          variant="ghost"
          className={`p-2 text-left ${baseButtonStyles}`}
          style={{ fontFamily: value }}
          onClick={() => formatter.setFont(value)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

export function Size({ handleCloseComponent, quillRef }: FormattingProps) {
  const quill = quillRef.current;
  if (!quill) return null;

  const formatter = new TextFormatting(quill);

  return (
    <div className="flex gap-2">
      <CloseMenu onClose={handleCloseComponent} />
      {SIZES.map(({ value, name }) => (
        <Button
          key={value}
          variant="ghost"
          className={`p-2 text-left ${baseButtonStyles}`}
          style={{ fontSize: value === 'small' ? '12px' : value === '' ? '16px' : value === 'large' ? '20px' : '40px' }}
          onClick={() => formatter.setSize(value)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
}

export function Headers({ handleCloseComponent, quillRef }: FormattingProps) {
  const quill = quillRef.current;
  if (!quill) return null;

  const formatter = new TextFormatting(quill);

  const headers = Array.from({ length: 6 }, (_, i) => ({
    level: i + 1,
    fontSize: `${32 - (i + 1) * 4}px`
  }));

  return (
    <div className="flex gap-2">
      <CloseMenu onClose={handleCloseComponent} />
      {headers.map(({ level, fontSize }) => (
        <Button
          key={level}
          variant="ghost"
          className={`p-2 text-left ${baseButtonStyles}`}
          style={{ fontSize, fontWeight: 'bold' }}
          onClick={() => formatter.setHeader(level as any)}
        >
          Header {level}
        </Button>
      ))}
    </div>
  );
}
