import React, { useState } from 'react';
import { X } from 'lucide-react';
import { formats } from './config';
import { menu_options, MenuOption } from '../_types/menu';
import { MenuSectionComponent } from './menu-section';
import { RichTextMenuProps } from './types';

const RichTextMenu: React.FC<RichTextMenuProps> = ({ quillRef, handleMenu }) => {
  const [activeComponent, setActiveComponent] = useState<string>('');

  const handleCloseComponent = () => {
    setActiveComponent('');
  };

  const handleOptionClick = (option: MenuOption) => {
    if (!quillRef.current) return;

    if (option.formatType === 'component') {
      setActiveComponent(option.name);
      return;
    }

    // Handle direct formatting options
    const formatFunction:any = formats[option.formatType as keyof typeof formats];
    console.log(formatFunction)
    if (formatFunction) {
      if (option.formatType === 'align' || 
          option.formatType === 'background' || 
          option.formatType === 'color' || 
          option.formatType === 'font' || 
          option.formatType === 'size' || 
          option.formatType === 'header' || 
          option.formatType === 'link' || 
          option.formatType === 'formula' ||
          option.formatType === 'list') {
        formatFunction(quillRef.current, option.value || '');
      } else {
        formatFunction(quillRef.current);
      }
    }
  };

  return (
    <>
      <div className="rounded-full dark:bg-[#232426] w-fit mx-auto my-2 cursor-pointer p-2">
        <X width={26} height={26} onClick={handleMenu} />
      </div>

      <div className="flex flex-col overflow-y-auto max-h-96">
        <div className="w-full dark:bg-[#151617] h-fit p-3 bg-[#FDFEFD]">
          {menu_options.map((section) => (
            <MenuSectionComponent
              key={section.section}
              section={section}
              activeComponent={activeComponent}
              onOptionClick={handleOptionClick}
              onCloseComponent={handleCloseComponent}
              quillRef={quillRef}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RichTextMenu;