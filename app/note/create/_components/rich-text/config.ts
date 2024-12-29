import Quill from 'quill';
import type { ListType } from './types/editor';

export const formats = {
  bold: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('bold', !format.bold);
    }
  },
  italic: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('italic', !format.italic);
    }
  },
  underline: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('underline', !format.underline);
    }
  },
  strike: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('strike', !format.strike);
    }
  },
  script: (quill: Quill, value: 'sub' | 'super') => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      if (value === 'sub') {
        // Apply or remove subscript
        quill.format('script', format.script === 'sub' ? false : 'sub');
      } else if (value === 'super') {
        // Apply or remove superscript
        quill.format('script', format.script === 'super' ? false : 'super');
      }
    }
  },
  
  align: (quill: Quill, value: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('align', format.align === value ? false : value);
    }
  },
  background: (quill: Quill, color: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('background', format.background === color ? false : color);
    }
  },
  color: (quill: Quill, color?: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('color', format.color === color ? false : color);
    }
  },
  font: (quill: Quill, font?: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('font', format.font === font ? false : font);
    }
  },
  size: (quill: Quill, size?: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('size', format.size === size ? false : size);
    }
  },
  blockquote: (quill: Quill) => {
    const selection = quill.getSelection();
  if (selection) {
      const format = quill.getFormat(selection);
      quill.format('blockquote', !format.blockquote);
 
    }
  },
  header: (quill: Quill, level: number) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('header', format.header === level ? false : level);
    }
  },
  list: (quill: Quill, value: ListType) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('list', format.list === value ? false : value);
    }
  },
  'code-block': (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('code-block', !format['code-block']);
    }
  },
  code: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('code', !format.code);
    }
  },
  link: (quill: Quill, url?: string) => {
    const selection = quill.getSelection();
    if (selection) {
      if (url) {
        quill.format('link', url);
      } else {
        quill.format('link', false);
      }
    }
  },
  indent_plus: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      const currentIndent = Number(format.indent) || 0;
      
      // Prevent indent from going beyond a reasonable limit (e.g., 8 levels)
      if (currentIndent < 8) {
        quill.format('indent', currentIndent + 1);
      }
    }
  },
  
  indent_minus: (quill: Quill) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      const currentIndent = Number(format.indent) || 0;
      
      // Only decrease if current indent is greater than 0
      if (currentIndent > 0) {
        quill.format('indent', currentIndent - 1);
      } else {
        quill.format('indent', false); // Remove indent if at 0
      }
    }
  },
  direction: (quill: Quill, value: string) => {
const selection = quill.getSelection();
if (selection) {
const format = quill.getFormat(selection);
quill.format('direction', format.direction === value ? false : value);
} 

  },
  formula: (quill: Quill, formula?: string) => {
    const selection = quill.getSelection();
    if (selection) {
      const format = quill.getFormat(selection);
      quill.format('formula', format.formula === formula ? false : formula);
    }
  }
};