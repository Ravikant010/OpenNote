import React from 'react';
import { FormatComponentProps } from './types';
import { Alignment, Colors, Fonts, Headers, Size } from './rich-text-formatting';

export const FormatComponent: React.FC<FormatComponentProps> = ({ name, handleCloseComponent, quillRef }) => {
  switch (name) {
    case 'color':
      return <Colors key="color" handleCloseComponent={handleCloseComponent} quillRef={quillRef} />;
    case 'align':
      return <Alignment key="align" handleCloseComponent={handleCloseComponent} quillRef={quillRef} />;
    case 'font':
      return <Fonts key="font" quillRef={quillRef} handleCloseComponent={handleCloseComponent} />;
    case 'size':
      return <Size key="size" quillRef={quillRef} handleCloseComponent={handleCloseComponent} />;
    case 'header':
      return <Headers key="header" quillRef={quillRef} handleCloseComponent={handleCloseComponent} />;
    default:
      return null;
  }
};