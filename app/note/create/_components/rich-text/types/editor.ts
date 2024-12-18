import Quill from "quill";

// Quill Editor Types
export interface QuillRange {
  index: number;
  length: number;
}

// export interface QuillEditor extends Quill {
//   getSelection(): QuillRange | null;
//   getFormat(range: QuillRange): Record<string, any>;
//   format(format: string, value: any): any;
//   formatText(index: number, length: number, format: string, value: any): void;
//   insertEmbed(index: number, type: string, value: string, source?: string): void;
//   setSelection(index: number, length: number): void;
// }

// Format Types
export type AlignPosition = 'left' | 'center' | 'right' | 'justify';
export type HeaderLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type ListType = 'bullet' | 'ordered';
export type FormatType = 
  | 'background' 
  | 'bold' 
  | 'color' 
  | 'font' 
  | 'code' 
  | 'italic' 
  | 'link' 
  | 'size' 
  | 'strike' 
  | 'script'
  | 'underline' 
  | 'blockquote' 
  | 'header' 
  | 'indent' 
  | 'list'
  | 'align' 
  | 'direction'
  | 'code-block'
  | 'formula'
  | 'image'
  | 'video';
