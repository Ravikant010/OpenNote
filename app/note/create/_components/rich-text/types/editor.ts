import Quill from "quill";

// Quill Editor Types
export interface QuillRange {
  index: number;
  length: number;
}

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
