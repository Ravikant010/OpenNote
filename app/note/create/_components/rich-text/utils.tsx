import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Strikethrough,
  AlignLeft,
  Palette,
  Type,
  TextQuote,
  List,
  ListOrdered,
  Code,
  Heading1
} from 'lucide-react';

export const getIcon = (name: string): React.ReactNode | null => {
  const iconMap: { [key: string]: typeof Bold } = {
    'bold': Bold,
    'italic': Italic,
    'underline': Underline,
    'strike': Strikethrough,
    'align': AlignLeft,
    'color': Palette,
    'font': Type,
    'size': Type,
    'header': Heading1,
    'blockquote': TextQuote,
    'bullet': List,
    'ordered': ListOrdered,
    'code-block': Code
  };

  const IconComponent = iconMap[name];
  if (IconComponent !== undefined) {
    return React.createElement(IconComponent, { className: "w-4 h-4" });
  }
  return null;
};
