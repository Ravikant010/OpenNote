// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import Quill from "quill";
// import "quill/dist/quill.snow.css";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { CircleChevronUp, Parentheses, X } from "lucide-react";

// import { menu_options } from "./_types/menu";
// import RichTextMenu from "./_components/RichTextMenu";

// type Props = {};
// export default function Page({}: Props) {
//   const editorRef = useRef<HTMLDivElement | null>(null);
//   const quillRef = useRef<Quill | null>(null);
//   useEffect(() => {
//     if (!quillRef.current && document.getElementById("editor-container")) {
//       const container = document.getElementById("editor-container");
//       const quill = new Quill(container as HTMLElement);
//       quillRef.current = quill;
//       console.log(quillRef);
//     }
//   }, []);
//   const [ShowRichTextOptions, setRichTextOptions] = useState(false);
//   function handleMenu() {
//     setRichTextOptions(!ShowRichTextOptions);
//   }



//   return (
//     <div className="relative h-dvh flex flex-col">
//     <div className="flex w-full items-center p-2">
//       <Button variant={"ghost"}>Cancel</Button>
//       <div className="flex-1 text-center">Notes</div>
//       <Button variant={"ghost"}>Save</Button>
//     </div>
//     <Separator />
    
//     <div className="text-sm text-gray-500 flex justify-between p-2">
//       <div>{new Date().toLocaleDateString()}</div>
//       <div>{new Date().toLocaleTimeString()}</div>
//     </div>
    
//     <div 
//       ref={editorRef}
//       contentEditable
//       className="flex-grow overflow-auto p-4 border min-h-[200px] bg-white dark:bg-transparent"
    
//     />
    
//     {/* Rich Text Options - Fixed Positioning */}
//     <div className={`
//       fixed 
//       bottom-0 
//       left-0 
//       right-0 
   
//       transition-transform 
//       duration-300 
//       ${ShowRichTextOptions ? 'translate-y-0' : 'translate-y-full'}
//     `}>
//    {quillRef &&quillRef.current &&
//       <RichTextMenu ref  = {quillRef} />
//    }

//     </div>
    
//     {/* Chevron Button - Fixed Positioning */}
//     <div className={`
//       fixed 
//       bottom-5 
//       left-1/2 
//       -translate-x-1/2 
     
//       transition-all 
//       duration-300 
//       ${ShowRichTextOptions ? 'opacity-0' : 'opacity-100'}
//     `}>
//       <CircleChevronUp
//         width={26}
//         height={26}
//         className="cursor-pointer hover:scale-110"
//         onClick={handleMenu}
//       />
//     </div>
//   </div>
//   );
// }



// "use client";
// import React, { useRef, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
// import { CircleChevronUp, Parentheses, X } from "lucide-react";
// import { 
//     Bold, 
//     Italic, 
//     Underline, 
//     Strikethrough, 
//     Superscript,
//     Palette,
//     Type,
//     StrikethroughIcon,
//     AlignLeft,
//     RotateCcw,
//     Heading1,
//     Quote,
//     Indent,
//     List,
//     Code,
//     FileCode,
//     Link,
//     Image,
//     Video
// } from 'lucide-react';

// export default function Page() {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const [ShowRichTextOptions, setRichTextOptions] = useState(false);

//   function handleMenu() {
//     setRichTextOptions(!ShowRichTextOptions);
//   }

//   // Custom formatting functions
//   const applyFormat = (format: string) => {
//     if (!editorRef.current) return;

//     // Ensure editor is focused
//     editorRef.current.focus();

//     // Get current selection
//     const selection = window.getSelection();
//     if (!selection || selection.rangeCount === 0) return;

//     const range = selection.getRangeAt(0);
//     const selectedText = range.toString();
//     switch(option.name) {
//       case 'bold':
//         formats.bold(quillRef.current);
//         break;
//       case 'italic':
//         formats.italic(quillRef.current);
//         break;
//       case 'underline':
//         formats.underline(quillRef.current);
//         break;
//       case 'strike':
//         formats.strike(quillRef.current);
//         break;
//       case 'script':
//         formats.script(quillRef.current, "");
//         break;
//       case 'color':
//         formats.color(quillRef.current);
//         break;
//       case 'background':
//         formats.background(quillRef.current);
//         break;
//       case 'font':
//         formats.font(quillRef.current);
//         break;
//       case 'size':
//         formats.size(quillRef.current);
//         break;
//       case 'align':
//         formats.align(quillRef.current);
//         break;
//       case 'direction':
//         formats.direction(quillRef.current);
//         break;
//       case 'header':
//         formats.header(quillRef.current);
//         break;
//       case 'blockquote':
//         formats.blockquote(quillRef.current);
//         break;
//       case 'indent':
//         formats.indent(quillRef.current);
//         break;
//       case 'list':
//         formats.list(quillRef.current);
//         break;
//       case 'code':
//         formats.code(quillRef.current);
//         break;
//       case 'code-block':
//         formats.codeBlock(quillRef.current);
//         break;
//       case 'formula':
//         formats.formula(quillRef.current);
//         break;
//       case 'link':
//         formats.link(quillRef.current);
//         break;
//       case 'image':
//         formats.image(quillRef.current);
//         break;
//       case 'video':
//         formats.video(quillRef.current);
//         break;
//     }
//   }}
//     switch(format) {
//       case 'bold':
//         document.execCommand('bold', false, undefined);
//         break;
//       case 'italic':
//         document.execCommand('italic', false, undefined);
//         break;
//       case 'underline':
//         document.execCommand('underline', false, undefined);
//         break;
//       case 'strike':
//         document.execCommand('strikethrough', false, undefined);
//         break;
//       case 'align-left':
//         document.execCommand('justifyLeft', false, undefined);
//         break;
//       case 'align-center':
//         document.execCommand('justifyCenter', false, undefined);
//         break;
//       case 'align-right':
//         document.execCommand('justifyRight', false, undefined);
//         break;
//       case 'header':
//         // This is more complex and might require wrapping in a heading tag
//         break;
//       case 'list-bullet':
//         document.execCommand('insertUnorderedList', false, undefined);
//         break;
//       case 'list-ordered':
//         document.execCommand('insertOrderedList', false, undefined);
//         break;
//     }
//   };

//   const menu_options = [
//     {
//         section: "Text Formatting",
//         options: [
//             { name: "bold", description: "Toggle bold text" },
//             { name: "italic", description: "Toggle italic text" },
//             { name: "underline", description: "Toggle underline" },
//             { name: "strike", description: "Toggle strikethrough" },
//         ]
//     },
//     {
//         section: "Text Alignment",
//         options: [
//             { name: "align-left", description: "Align left" },
//             { name: "align-center", description: "Align center" },
//             { name: "align-right", description: "Align right" },
//         ]
//     },
//     {
//         section: "List Formatting",
//         options: [
//             { name: "list-bullet", description: "Bullet list" },
//             { name: "list-ordered", description: "Numbered list" },
//         ]
//     }
//   ];

//   function getIcon(name: string) {
//     switch(name) {
//       case 'bold':
//         return <Bold size={16} />;
//       case 'italic':
//         return <Italic size={16} />;
//       case 'underline':
//         return <Underline size={16} />;
//       case 'strike':
//         return <StrikethroughIcon size={16} />;
//       case 'align-left':
//         return <AlignLeft size={16} />;
//       case 'align-center':
//         return <RotateCcw size={16} />;
//       case 'align-right':
//         return <Heading1 size={16} />;
//       case 'list-bullet':
//         return <List size={16} />;
//       case 'list-ordered':
//         return <Indent size={16} />;
//       default:
//         return null;
//     }
//   }

//   function Rich_text_formating() {
//     return (
//       <>
//       <div 
//         className="rounded-full dark:bg-[#232426] w-fit mx-auto my-2" 
//         onClick={handleMenu}
//       >
//        <X width={26} height={26} /> 
//        </div> 
//         <div className="flex flex-col overflow-y-auto max-h-96">
//           <div className="w-full dark:bg-[#151617] h-fit p-3 bg-[#FDFEFD]">
//             {menu_options.map((section, sectionIndex) => (
//               <div 
//                 key={sectionIndex} 
//                 className="flex flex-col gap-2 items-start dark:text-[#DADCDE] font-semibold"
//               >
//                 <h3 className="text-xs text-gray-500 whitespace-nowrap">
//                   {section.section}
//                 </h3>
//                 <div className="flex overflow-x-auto whitespace-nowrap gap-2 w-full pb-2">
//                   {section.options.map((option, optionIndex) => (
//                     <Button
//                       key={`${sectionIndex}-${optionIndex}`}
//                       className="px-3 py-2 rounded-full cursor-pointer transition-colors flex-shrink-0 dark:bg-[#232426] dark:text-[#DFE1E2]"
//                       variant={"outline"}
//                       onClick={() => applyFormat(option.name)}
//                     >
//                       {getIcon(option.name)}
//                       <span className="ml-2 text-xs whitespace-nowrap">
//                         {option.name}
//                       </span>
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <div className="relative h-dvh flex flex-col">
//       <div className="flex w-full items-center p-2">
//         <Button variant={"ghost"}>Cancel</Button>
//         <div className="flex-1 text-center">Notes</div>
//         <Button variant={"ghost"}>Save</Button>
//       </div>
//       <Separator />
      
//       <div className="text-sm text-gray-500 flex justify-between p-2">
//         <div>{new Date().toLocaleDateString()}</div>
//         <div>{new Date().toLocaleTimeString()}</div>
//       </div>
      
//       <div 
//         ref={editorRef}
//         contentEditable
//         className="flex-grow overflow-auto p-4 border min-h-[200px] bg-white dark:bg-transparent"
      
//       />
      
//       {/* Rich Text Options - Fixed Positioning */}
//       <div className={`
//         fixed 
//         bottom-0 
//         left-0 
//         right-0 
//         z-50 
//         transition-transform 
//         duration-300 
//         ${ShowRichTextOptions ? 'translate-y-0' : 'translate-y-full'}
//       `}>
//         <Rich_text_formating />
//       </div>
      
//       {/* Chevron Button - Fixed Positioning */}
//       <div className={`
//         fixed 
//         bottom-5 
//         left-1/2 
//         -translate-x-1/2 
//         z-50 
//         transition-all 
//         duration-300 
//         ${ShowRichTextOptions ? 'opacity-0' : 'opacity-100'}
//       `}>
//         <CircleChevronUp
//           width={26}
//           height={26}
//           className="cursor-pointer hover:scale-110"
//           onClick={handleMenu}
//         />
//       </div>
//     </div>
//   );
// }

"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp } from "lucide-react";
import RichTextMenu from "./_components/RichTextMenu";
import Quill from "quill";

export default function Page() {
 
  const quillRef = useRef<Quill | null>(null);
// const [isQuillInstance,setQuillInstance] = useState(false)

  useEffect(() => {
    if (!quillRef.current  && document.getElementById("editor")) {
   
      const quill = new Quill("#editor");
      quillRef.current = quill;

    }
  }, []);
  // useEffect(() => {
  //   const handleFocus = (e) => {
  //     // Move cursor to the start of the content
  //     const range = document.createRange();
  //     const sel = window.getSelection();
      
  //     if (editorRef.current && editorRef.current.firstChild) {
  //       range.setStart(editorRef.current.firstChild, 0);
  //       range.collapse(true);
        
  //       sel.removeAllRanges();
  //       sel.addRange(range);
  //     }
  //   };

  //   const divElement = editorRef.current;
  //   if (divElement) {
  //     divElement.addEventListener('focus', handleFocus);
      
  //     return () => {
  //       divElement.removeEventListener('focus', handleFocus);
  //     };
  //   }
  // }, []);

  const [ShowRichTextOptions, setRichTextOptions] = useState(false);

  function handleMenu() {
    setRichTextOptions(!ShowRichTextOptions);
  }

  return (
    <div className="relative h-dvh flex flex-col">
      <div className="flex w-full items-center p-2">
        <Button variant={"ghost"}>Cancel</Button>
        <div className="flex-1 text-center">Notes</div>
        <Button variant={"ghost"}>Save</Button>
      </div>
      <Separator />

      <div className="text-sm text-gray-500 flex justify-between p-2">
        <div>{new Date().toLocaleDateString()}</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>

      <div

        
        className="flex-grow overflow-auto border min-h-[200px] bg-white dark:bg-transparent focus:border-none focus:outline-none font-mono  tracking-normal bg-red-600 "
        id="editor"
      ></div>

      {/* Rich Text Options - Fixed Positioning */}
      <div
        className={`
          fixed 
          bottom-0 
          left-0 
          right-0 
          transition-transform 
          duration-300 
          ${ShowRichTextOptions ? "translate-y-0" : "translate-y-full"}
        `}
      >
       {
      
      <RichTextMenu quillRef={quillRef} handleMenu={handleMenu} />
       }

      
      </div>

      {/* Chevron Button - Fixed Positioning */}
      <div
        className={`
          fixed 
          bottom-5 
          left-1/2 
          -translate-x-1/2 
          transition-all 
          duration-300 
          ${ShowRichTextOptions ? "opacity-0" : "opacity-100"}
        `}
      >
        <CircleChevronUp
          width={26}
          height={26}
          className="cursor-pointer hover:scale-110"
          onClick={handleMenu}
        />
      </div>
    </div>
  );
}
