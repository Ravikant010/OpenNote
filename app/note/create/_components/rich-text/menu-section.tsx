import React from 'react';
import { Button } from '@/components/ui/button';
import { MenuSectionProps } from './types';
import { FormatComponent } from './format-components';
import {getIcon} from './utils';

export const MenuSectionComponent: React.FC<MenuSectionProps> = ({
  section,
  activeComponent,
  onOptionClick,
  onCloseComponent,
  quillRef,
}) => {
  return (
    <div className="flex flex-col gap-2 items-start dark:text-[#DADCDE] font-semibold my-2">
      <h3 className="text-xs text-[#DADCDE] whitespace-nowrap font-sans font-medium">
        {section.section}
      </h3>
      <div className="flex overflow-x-auto whitespace-nowrap gap-2 w-full pb-2">
        {section.options.map((option) => (
          activeComponent === option.name ? (
            <div key={option.name} className="w-fit">
              <FormatComponent
                name={option.name}
                handleCloseComponent={onCloseComponent}
                quillRef={quillRef}
              />
            </div>
          ) : (
            <Button
              key={option.name}
              className="px-3 py-2 rounded-full cursor-pointer transition-colors flex-shrink-0 dark:bg-[#232426] dark:text-[#DFE1E2]"
              variant="outline"
              onClick={() => onOptionClick(option)}
            >
              <span className="ml-2 text-xs whitespace-nowrap gap-1 flex p-0 font-medium font-sans">
                {getIcon(option.name)}
                {option.label}
              </span>
            </Button>
          )
        ))}
      </div>
    </div>
  );
};