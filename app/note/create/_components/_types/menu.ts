import { FormatType } from '../text-editor-formatting';

export type MenuOption = {
  name: string;
  label: string;
  formatType: FormatType | 'component';
  value?: string;
};

export type MenuSection = {
  section: string;
  options: MenuOption[];
};

export const menu_options: MenuSection[] = [
  {
    section: 'Text',
    options: [
      { name: 'bold', label: 'Bold', formatType: 'bold' },
      { name: 'italic', label: 'Italic', formatType: 'italic' },
      { name: 'underline', label: 'Underline', formatType: 'underline' },
      { name: 'strike', label: 'Strike', formatType: 'strike' },
    ]
  },
  {
    section: 'Style',
    options: [
      { name: 'color', label: 'Color', formatType: 'component' },
      { name: 'font', label: 'Font', formatType: 'component' },
      { name: 'size', label: 'Size', formatType: 'component' },
    ]
  },
  {
    section: 'Structure',
    options: [
      { name: 'header', label: 'Header', formatType: 'component' },
      { name: 'blockquote', label: 'Quote', formatType: 'blockquote' },
      { name: 'bullet', label: 'Bullet List', formatType: 'list', value: 'bullet' },
      { name: 'ordered', label: 'Numbered List', formatType: 'list', value: 'ordered' },
      { name: 'code', label: 'Code', formatType: 'code' },
      { name: 'align', label: 'Align', formatType: 'component' },
    ]
  },
  {
    section: 'Insert',
    options: [
      { name: 'link', label: 'Link', formatType: 'link' },
      // { name: 'image', label: 'Image', formatType: 'image' },
      { name: 'formula', label: 'Formula', formatType: 'formula' },
      { name: 'code-block', label: 'Code Block', formatType: 'code-block' },
    ]
  }
];
