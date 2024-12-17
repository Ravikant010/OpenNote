import { X } from "lucide-react";
import CloseMenu from "./close_menu";
import { formats } from "./formating";
import Quill from "quill";
import { RefObject } from "react";
import { Button } from "@/components/ui/button";

export function Colors({_function, quillRef}:{
    _function : ()=>void,
    quillRef: RefObject<Quill>
}) {
    console.log(quillRef)
    const colors = [
      "#87CEEB", // Sky Blue
      "#F08080", // Light Coral
      "#98FB98", // Pale Green
      "#FFD700", // Golden Yellow
      "#E6E6FA", // Lavender
      "#FA8072", // Salmon
      "#BA55D3", // Medium Orchid
      "#20B2AA", // Light Sea Green
      "#708090", // Slate Gray
      "#F4A460"  // Sandy Brown
    ];
  if(quillRef.current)
    return (
      <div className="flex overflow-x-auto w-full">
        <CloseMenu _function={_function} />
        {colors.map((color, key) => (
          <Button
            key={key}
            style={{ backgroundColor: color }}
            className="w-7 h-7 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0"
           onClick={()=>formats.color(quillRef.current, color)}>
            
          </Button>
        ))}
      </div>
    );
  }
  

  import React from 'react';
  import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

  
  export function Alignment({ onAlign }: { onAlign?: (alignment: string) => void }) {
    return (
      <div className="flex gap-2">
        {/* Align Left */}
        <Button
          variant="ghost"
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => onAlign('left')}
        >
          <AlignLeft className="w-5 h-5" />
        </Button>
  
        {/* Align Center */}
        <Button
          variant="ghost"
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => onAlign('center')}
        >
          <AlignCenter className="w-5 h-5" />
        </Button>
  
        {/* Align Right */}
        <Button
          variant="ghost"
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => onAlign('right')}
        >
          <AlignRight className="w-5 h-5" />
        </Button>
  
        {/* Align Justify */}
        <Button
          variant="ghost"
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={() => onAlign('justify')}
        >
          <AlignJustify className="w-5 h-5" />
        </Button>
      </div>
    );
  }
  


  export function Fonts({ onFontSelect }: { onFontSelect?: (font: string) => void }) {
    const fonts = [
      { name: 'Arial', style: 'Arial, sans-serif' },
      { name: 'Times New Roman', style: '"Times New Roman", serif' },
      { name: 'Georgia', style: 'Georgia, serif' },
      { name: 'Courier New', style: '"Courier New", monospace' },
      { name: 'Verdana', style: 'Verdana, sans-serif' },
      { name: 'Tahoma', style: 'Tahoma, sans-serif' },
      { name: 'Comic Sans MS', style: '"Comic Sans MS", cursive' },
      { name: 'Impact', style: 'Impact, sans-serif' },
      { name: 'Trebuchet MS', style: '"Trebuchet MS", sans-serif' },
      { name: 'Lucida Console', style: '"Lucida Console", monospace' },
    ];
  
    return (
      <div className="flex  gap-2">
        {fonts.map((font) => (
          <Button
            key={font.name}
            variant="ghost"
            className="p-2 text-left rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            style={{ fontFamily: font.style }}
            onClick={() => onFontSelect(font.name)}
          >
            {font.name}
          </Button>
        ))}
      </div>
    );
  }


export function List(){

}



export function Size({ onSizeSelect }: { onSizeSelect?: (size: string) => void }) {
    const sizes = [
      { label: 'Small', size: '12px' },
      { label: 'Normal', size: '16px' },
      { label: 'Large', size: '20px' },
      { label: 'X-Large', size: '24px' },
      { label: 'XX-Large', size: '32px' },
      { label: 'Huge', size: '40px' },
    ];
  
    return (
      <div className="flex  gap-2">
        {sizes.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            className="p-2 text-left rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            style={{ fontSize: item.size }}
            onClick={() => onSizeSelect(item.size)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    );
  }


  export function Headers({ onHeaderSelect }: { onHeaderSelect: (headerLevel?: number) => void }) {
    const headers = [
      { label: 'Header 1', level: 1 },
      { label: 'Header 2', level: 2 },
      { label: 'Header 3', level: 3 },
      { label: 'Header 4', level: 4 },
      { label: 'Header 5', level: 5 },
      { label: 'Header 6', level: 6 },
    ];
  
    return (
      <div className="flex  gap-2">
        {headers.map((item) => (
          <Button
            key={item.level}
            variant="ghost"
            className="p-2 text-left rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
            style={{ fontSize: `${32 - item.level * 4}px`, fontWeight: 'bold' }} // Dynamic size for header
            onClick={() => onHeaderSelect(item.level)}
          >
            {item.label}
          </Button>
        ))}
      </div>
    );
  }
  