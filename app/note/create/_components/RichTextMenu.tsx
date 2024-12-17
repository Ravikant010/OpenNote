import React, { RefObject, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { formats } from './formating';
import { Alignment, Colors, Fonts, Headers, Size } from './nested_formating_functions';
import { menu_options } from '../_types/menu';
import Quill from 'quill';

const RichTextMenu = ({ quillRef, handleMenu }: { quillRef: RefObject<Quill>, handleMenu: () => void }) => {
  const [component, setComponent] = useState<string>('');
function handleCloseMenu(){
  setComponent("")
}
  return (
    <>
      <div
        className="rounded-full dark:bg-[#232426] w-fit mx-auto my-2 cursor-pointer p-2"
        onClick={() => console.log('Menu clicked')}
      >
        <X width={26} height={26} onClick={handleMenu} />
      </div>

      <div className="flex flex-col overflow-y-auto max-h-96">
        <div className="w-full dark:bg-[#151617] h-fit p-3 bg-[#FDFEFD]">
          {menu_options.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className="flex flex-col gap-2 items-start dark:text-[#DADCDE] font-semibold"
            >
              <h3 className="text-xs text-gray-500 whitespace-nowrap">
                {section.section}
              </h3>
              <div className="flex overflow-x-auto whitespace-nowrap gap-2 w-full pb-2">
                {section.options.map((option, optionIndex) =>  component === option.name  
                  ? (
                    component == "color" ? 
                    // When the 'color' button is clicked, show the Colors component
                    <div className='w-fit' key={optionIndex}><Colors key="color-component" _function = {handleCloseMenu} quillRef = {quillRef}/></div> 
                    : component === 'align' ? <Alignment key={sectionIndex}/> : component == "font" ? <Fonts key={sectionIndex}/>: component == "size" ? <Size key={sectionIndex}/> : component == "header" ? <Headers key={sectionIndex} /> : <></>

                  ) :  (
                    <Button
                      key={`${sectionIndex}-${optionIndex}`}
                      className="px-3 py-2 rounded-full cursor-pointer transition-colors flex-shrink-0 dark:bg-[#232426] dark:text-[#DFE1E2]"
                      variant="outline"
                      onClick={() => {
                        if (!quillRef) return;
                        const quillInstance = quillRef.current;
                        if (quillInstance) {
                          switch (option.name) {
                            case 'bold':
                              formats.bold(quillInstance);
                              break;
                            case 'italic':
                              formats.italic(quillInstance);
                              break;
                            case 'color':
                              // Set the component to Colors when 'color' is clicked
                              setComponent("color");
                         
                              break;
                            case 'font':
                              setComponent('font')
                              break;
                            case 'code':
                              formats.code(quillInstance);
                              break;
                            case 'link':
                              formats.link(quillInstance);
                              break;
                            case 'size':
                              setComponent('size')
                              break;
                            case 'strike':
                              formats.strike(quillInstance);
                              break;
                            case 'script':
                              formats.script(quillInstance);
                              break;
                            case 'underline':
                              formats.underline(quillInstance);
                              break;
                            case 'blockquote':
                              formats.blockquote(quillInstance);
                              break;
                            case 'header':
                           setComponent('header')
                              break;
                            case 'indent':
                              formats.indent(quillInstance);
                              break;
                            case 'list':
                              formats.list(quillInstance);
                              break;
                            case 'align':
                            setComponent('align')
                              break;
                            case 'direction':
                              formats.direction(quillInstance);
                              break;
                            case 'code-block':
                              formats['code-block'](quillInstance);
                              break;
                            case 'formula':
                              formats.formula(quillInstance);
                              break;
                            case 'image':
                              formats.image(quillInstance);
                              break;
                            case 'video':
                              formats.video(quillInstance);
                              break;
                            default:
                              console.log(`Format "${option.name}" is not handled.`);
                          }
                        }
                      }}
                    >
                      <span className="ml-2 text-xs whitespace-nowrap gap-2 flex p-0">
                        {option.name}
                      </span>
                    </Button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RichTextMenu;
