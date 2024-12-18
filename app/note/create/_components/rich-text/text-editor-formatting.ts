import Quill from "quill";
import { formats } from "./config";
import { AlignPosition } from "./types/editor";
import { HeaderLevel, ListType } from "../text-editor-formatting";

// // Types and Interfaces
// export interface QuillEditor extends Quill {
//   getSelection(): QuillRange | null;
//   getFormat(range: QuillRange): Record<string, any>;
//   format(format: string, value: any): any;
//   formatText(index: number, length: number, format: string, value: any): void;
//   insertEmbed(index: number, type: string, value: string, source?: string): void;
//   setSelection(index: number, length: number): void;
// }

// export interface QuillRange {
//   index: number;
//   length: number;
// }

// // Type definitions for format values
// export type AlignPosition = 'left' | 'center' | 'right' | 'justify';
// export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;
// export type ListType = 'bullet' | 'ordered';
// export type FormatType = 
//   | 'background' 
//   | 'bold' 
//   | 'color' 
//   | 'font' 
//   | 'code' 
//   | 'italic' 
//   | 'link' 
//   | 'size' 
//   | 'strike' 
//   | 'underline' 
//   | 'blockquote' 
//   | 'header' 
//   | 'align' 
//   | 'list' 
//   | 'direction' 
//   | 'code-block' 
//   | 'formula';

// Configuration
export const EditorConfig = {
  image: {
    defaultWidth: 100,
    format: 'image/jpeg',
  },
  url: {
    defaultProtocol: 'https://',
  },
} as const;

// Text formatting class that uses the formats object
export class TextFormatting {
  private quill: Quill;

  constructor(quill: Quill) {
    this.quill = quill;
  }

  // Text style formatters
  bold = () => formats.bold(this.quill);
  italic = () => formats.italic(this.quill);
  underline = () => formats.underline(this.quill);
  strike = () => formats.strike(this.quill);
  code = () => formats.code(this.quill);
  blockquote = () => formats.blockquote(this.quill);
  codeBlock = () => formats["code-block"](this.quill);

  // Color and font formatters
  setBackground = (color?: string) => formats.background(this.quill, color);
  setColor = (color?: string) => formats.color(this.quill, color);
  setFont = (font?: string) => formats.font(this.quill, font);
  setSize = (size?: string) => formats.size(this.quill, size);

  // Structure formatters
  setHeader = (level: HeaderLevel) => formats.header(this.quill, level);
  setList = (type: ListType) => formats.list(this.quill, type);
  setAlign = (position: AlignPosition) => formats.align(this.quill, position);

  // Insert formatters
  setLink = (url?: string) => formats.link(this.quill, url);
  setFormula = (formula?: string) => formats.formula(this.quill, formula);
}

// Export the formats object for direct access if needed
export { formats };
