import { RefObject } from 'react';
import Quill from 'quill';

import { MenuOption, MenuSection } from '../_types/menu';

export interface RichTextMenuProps {
  quillRef: RefObject<Quill>;
  handleMenu?: () => void;
}

export interface FormattingProps {
  handleCloseComponent: () => void;
  quillRef: RefObject<Quill>;
}

export interface FormatComponentProps extends FormattingProps {
  name: string;
}

export interface MenuSectionProps {
  section: MenuSection;
  activeComponent: string;
  onOptionClick: (option: MenuOption) => void;
  onCloseComponent: () => void;
  quillRef: RefObject<Quill>;
}