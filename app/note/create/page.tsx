// // "use server";
// // import { LargeInput } from "@/components/largeinput";
// // import { Input } from "@/components/ui/input";
// // import React from "react";
// // import Quileditor from "./_comp/quileditor";

// // import { SidebarTrigger } from "@/components/ui/sidebar";
// // import { Menu } from "lucide-react";
// // import Sidebar  from "@/components/sidebar_";
// // type Props = {};
// // export default async function Page({}: Props) {
// //   return (
// //     <div className="h-screen w-full  flex flex-col ">
// //       {/* <div className="h-20 w-full border-b-2 border-gray-800 bg-red-500"></div> */}

// //       <div className="w-full h-full grid grid-cols-12">
// //         {/* <div className="col-span-2 h-full">
// //         <Sidebar/>
// //         </div> */}
// //         <div className="col-span-8 flex flex-col">
// //         <LargeInput />
// //         <Quileditor />
// //          </div>
// //         <div className="col-span-4 bg-green-800"> </div>
// //       </div>
// //     </div>
// //   );
// // }


//   /* <div className="flex-1 grid grid-cols-12 gap-4 w-full">
// <div className="col-span-2">
//   <NoteSidebar />
//   <SidebarTrigger className="mb-4">
//   <Menu className="h-6 w-6" />
// </SidebarTrigger>
// </div>{" "}

// <div className="col-span-8  flex flex-col h-full">
//   <LargeInput />
//   <Quileditor />
// </div>
// <div className="col-span-2 bg-red-800"></div>
// </div> */

// "use client";
// import React, { RefObject, useEffect, useRef, useState } from "react";
// import QuillEditor from "./_components/QuillEditor";
// import {
//   AlignJustify,
//   ArrowLeft,
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Dot,
//   X,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { menu_options } from "./_types/menu";
// import { MenuSectionComponent } from "./_components/rich-text/menu-section";
// import RichTextMenu from "./_components/rich-text";
// import Quill from "quill";
// import { formats } from "./_components/rich-text/config";
// import { MenuOption } from "./_components/_types/menu";
// // import { TextFormatting } from "./_components/rich-text/text-editor-formatting";
// import {
//   Bold,
//   Italic,
//   List,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   ChevronUp,
//   ChevronDown,
// } from "lucide-react";
// import { ToastAction } from "@/components/ui/toast"
// import { useToast } from "@/hooks/use-toast";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import { Note } from "@/models";
// import TextFormatting from "@/components/text_formating/action";
// export default function NotePage() {
// const quillRef = useRef<RefObject<Quill> | null>(null);
//   const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
//   const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
//   const [component, setComponent] = useState("");
//   const { toast } = useToast();
//   const router = useRouter();
//   const titleRef = useRef<HTMLInputElement | null>(null);
//   const handleOptionClick = (option: string, value: string | "") => {
//     console.log(option, value, "Dfdf");
//     if (!quillRef.current) return;
//     TextFormatting(option,value, quillRef as RefObject<Quill> )
//     setComponent(option);
//   };
//   const [notes, setNotes] = useState<Note[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   // Fetch notes on component mount
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const response = await fetch("/api/userallnote");
//         if (!response.ok) {
//           throw new Error("Failed to fetch notes");
//         }
//         const data = await response.json();
//         if (data.success) {
//           setNotes(data.data);
//         } else {
//           setError(data.error);
//         }
//       } catch (error) {
//         //@ts-ignore
//         setError(error.message || "An unexpected error occurred");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchNotes();
//   }, []);
//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }
//   // Render error state
//   if (error) {
//     return <div>Error: {error}</div>;
//   }
//   return (
//     <div className="flex flex-col h-screen w-full bg-white dark:bg-[#030618]">
//       <header className="h-14 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center px-4 text-white shadow-md border-b-2 border-gray-200 dark:border-gray-800 text-center font-sans text-xl font-semibold ">
//         Write Your Note
//       </header>
//       <div className="flex flex-1 overflow-hidden">
//         <div
//           className={`
//           w-64 flex-shrink-0 bg-gray-50 dark:bg-[#0f1011] border-r
//           transition-all duration-300 ease-in-out
//           ${isLeftSidebarOpen ? "" : "-ml-64"}
//         `}
//         >
//           <div className="p-4 h-full overflow-y-auto">
//             <div className="flex justify-between items-center mb-4">
//               {/* <h2 className="font-medium">Notes List</h2>
//               <button
//                 onClick={() => setIsLeftSidebarOpen(false)}
//                 className="lg:hidden"
//               >
//                 <X className="w-5 h-5" />
//               </button> */}
//             </div>
//             <div className="space-y-2">
//               {notes &&notes.map((e,index) => (
//                 <Button  variant={"outline"}
//                   key={index}
//                   className="p-2   shadow text-sm font-medium  transition-colors duration-200 w-full text-start  self-start flex justify-start rounded-2xl px-4"
//                 >
//                  {e.title}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex-1 flex min-w-0">
//           <div
//             className={`transition-transform duration-300 ${
//               isLeftSidebarOpen ? "translate-x-0" : "-translate-x-2"
//             }`}
//           >
//             {isLeftSidebarOpen ? (
//               <Button
//                 onClick={() => setIsLeftSidebarOpen(false)}
//                 className="lg:flex py-1 m-2 h-fit rounded-3xl px-4 mt-8"
//                 variant="outline"
//               >
//                 <ChevronLeft className="w-4 h-4" />
//               </Button>
//             ) : (
//               <Button
//                 onClick={() => setIsLeftSidebarOpen(true)}
//                 className="flex py-1 m-2 h-fit rounded-3xl px-4 mt-8"
//                 variant="outline"
//               >
//                 notes
//               </Button>
//             )}
//           </div>
//           <div className="flex-1 p-4 lg:p-6 bg-white dark:bg-[#030618] overflow-auto font-sans">
//             <div className="w-full h-full">
//               <Input placeholder="Title" className="w-full h-14 mb-10" ref={titleRef} />
//               <QuillEditor quillRef={quillRef} />
//             </div>
//           </div>
//           <Button
//             className="py-1 m-2 h-fit rounded-3xl px-4 mt-8"
//             variant="outline"
//             onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
//           >
//             {isRightSidebarOpen ? <ArrowRight /> : "styles"}
//           </Button>
//           <div
//             className={`
//             w-64 flex-shrink-0 bg-gray-50 dark:bg-[#0f1011] border-l
//             transition-all duration-300 ease-in-out
//             ${isRightSidebarOpen ? "" : "mr-[-256px]"}
//           `}
//           >
//             <div className="p-4 h-full overflow-y-auto">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
//                   Style
//                 </h2>
//                 <button
//                   onClick={() => setIsRightSidebarOpen(false)}
//                   className="lg:hidden"
//                 >
//                   {/* <X className="w-5 h-5" /> */}
//                 </button>
//               </div>
//               {menu_options.map((item, index) => (
//                 <MenuSection
//                   key={index}
//                   section={item.section}
//                   options={item.options}
//                   handleOptionClick={handleOptionClick}
//                   component={component}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//       <Button
//         className="h-14 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center px-4 text-white shadow-md border-t-2 border-gray-200 dark:border-gray-800 text-center font-sans text-xl font-semibold"
//         onClick={async () => {
//           if(titleRef.current) {
// if(!titleRef.current.value)
//            return  toast({
//               title: "Error",
//               description: "Title is required",
//               duration: 3000,
//             });
//           }
//           try {
//             const note = {
//               title: titleRef.current?.value || "",
//               //@ts-ignore
//               content: quillRef?.current?.root.innerHTML || "",
//               createdAt: new Date(),
//               updatedAt: new Date(),
//               isPublic: true,
//             };
//             console.log(note);
//             const validatedNote = z
//               .object({
//                 title: z.string().min(1),
//                 content: z.string().min(1),
//                 createdAt: z.date(),
//                 updatedAt: z.date(),
//                 isPublic: z.boolean(),
//               })
//               .parse(note);
//             const response = await fetch("/api/save-note", {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(note),
//             });
//             const data = await response.json();
//             console.log(data)
//             if (data.success) {
//               toast({
//                 title: "Success",
//                 description: "Note saved successfully!",
//                 duration: 3000,
//               });
//           return   setTimeout(()=>router.push(`/${data?.data.username}/notes`), 1000);
//             }
//             if (!data.success) {
//               throw new Error("Failed to save note");
//             }
//             throw new Error(data.message || "Failed to save note");
//           } catch (error) {
//             toast({
//               title: "Error",
//               //@ts-ignore
//               description: error.message || "An unexpected error occurred.",
//               duration: 3000,
//             });
//           }
//         }}
//       >
//         Save
//       </Button>
//     </div>
//   );
// }
// const componentsToCheck = [
//   "color",
//   "align",
//   "list",
//   "font",
//   "size",
//   "direction",
//   "header",
//   "indent",
//   "script",
//   "background",
// ];
// const MenuSection = ({
//   section,
//   options,
//   handleOptionClick,
//   component,
// }: {
//   section: string;
//   options: { name: string; description: string }[];
//   handleOptionClick: (options: string, value: string | "") => void;
//   component: string;
// }) => {
//   const matchedComponent = componentsToCheck.find((e) => e === component);
//   return (
//     <div className="mb-4">
//       <h3 className="py-1 mb-4 h-fit w-full border-b border-gray-200 dark:border-gray-700 font-medium text-sm uppercase tracking-wide">
//         {section}
//       </h3>
//       <div className="flex flex-wrap gap-2 ml-2">
//         {options.map((option, index) => (
//           <div key={index}>
//             <Button
//               variant={"outline"}
//               key={index}
//               onClick={() => handleOptionClick(option.name, "")}
//               className={`
//                ${
//                  matchedComponent && matchedComponent === option.name
//                    ? "hidden"
//                    : "inline-block"
//                }
//                 py-1 px-3 rounded-full shadow text-sm cursor-pointer w-fit h-fit font-medium transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
//               `}
//             >
//               {option.name}
//             </Button>
//             <div
//               className={`${
//                 matchedComponent && matchedComponent === option.name
//                   ? "flex"
//                   : "hidden"
//               }`}
//             >
//               {matchedComponent && (
//                 <NestedStyling
//                   component={matchedComponent}
//                   handleOptionClick={handleOptionClick}
//                 />
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// function NestedStyling({
//   component,
//   handleOptionClick,
// }: {
//   component: string;
//   handleOptionClick: (option: string, value: string | "") => void;
// }): JSX.Element {
//   const COLORS = [
//     { value: "#87CEEB", name: "Sky Blue" },
//     { value: "#F08080", name: "Light Coral" },
//     { value: "#98FB98", name: "Pale Green" },
//     { value: "#FFD700", name: "Golden Yellow" },
//     { value: "#E6E6FA", name: "Lavender" },
//     { value: "#FA8072", name: "Salmon" },
//     { value: "#BA55D3", name: "Medium Orchid" },
//     { value: "#20B2AA", name: "Light Sea Green" },
//     { value: "#708090", name: "Slate Gray" },
//     { value: "#F4A460", name: "Sandy Brown" },
//   ];
//   const FONTS = [
//     { value: "serif", name: "Serif" },
//     { value: "", name: "Sans-Serif" },
//     { value: "monospace", name: "Monospace" },
//   ];
//   const SIZES = [
//     { value: "small", name: "Small" },
//     { value: "", name: "Normal" },
//     { value: "large", name: "Large" },
//     { value: "huge", name: "Huge" },
//   ];
//   console.log(component);
//   switch (component) {
//     case "color":
//       return (
//         <div className="flex flex-1 flex-wrap gap-2">
//           {COLORS.map(({ value, name }) => (
//             <Button
//               key={value}
//               style={{ backgroundColor: value }}
//               className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//               onClick={() => handleOptionClick("color", value)}
//               title={name}
//             ></Button>
//           ))}
//         </div>
//       );
//     case "background":
//       return (
//         <div className="flex flex-1 flex-wrap gap-2">
//           {COLORS.map(({ value, name }) => (
//             <Button
//               key={value}
//               style={{ backgroundColor: value }}
//               className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//               onClick={() => handleOptionClick("background", value)}
//               title={name}
//             ></Button>
//           ))}
//         </div>
//       );
//     case "indent":
//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             className="w-10 h-10 mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-full self-center"
//             onClick={() => handleOptionClick("indent_minus", "decrease")}
//             title="Decrease Indent"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="w-10 h-10 mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-full self-center"
//             onClick={() => handleOptionClick("indent_plus", "increase")}
//             title="Increase Indent"
//           >
//             <ArrowRight className="w-5 h-5" />
//           </Button>
//         </div>
//       );
//     case "font":
//       return (
//         <div className="flex flex-1 flex-wrap gap-2">
//           {" "}
//           {FONTS.map(({ value, name }) => (
//             <Button
//               key={value}
//               style={{ fontFamily: value }}
//               className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
//               onClick={() => handleOptionClick("font", value)}
//               title={name}
//               variant={"ghost"}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       );
//     case "align":
//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             onClick={() => handleOptionClick("align", "")}
//             title="Align Left"
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//           >
//             <AlignLeft className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             onClick={() => handleOptionClick("align", "center")}
//             title="Align Center"
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//           >
//             <AlignCenter className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             onClick={() => handleOptionClick("align", "right")}
//             title="Align Right"
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//           >
//             <AlignRight className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             onClick={() => handleOptionClick("align", "justify")}
//             title="Align Right"
//             className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//           >
//             <AlignJustify className="w-5 h-5" />
//           </Button>
//         </div>
//       );
//     case "list":
//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("list", "ordered")}
//             title="Ordered List"
//           >
//             <List className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("list", "bullet")}
//             title="Bullet List"
//           >
//             <Dot size={10} />
//           </Button>
//         </div>
//       );
//     case "direction":
//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("direction", "rtl")}
//             title="Right to Left"
//           >
//             <ChevronRight className="w-5 h-5" />
//           </Button>
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("direction", "ltr")}
//             title="Left to Right"
//           >
//             <ChevronLeft className="w-5 h-5" />
//           </Button>
//         </div>
//       );
//     case "size":
//       return (
//         <div className="flex flex-wrap gap-2">
//           {SIZES.map(({ value, name }) => (
//             <Button
//               key={value}
//               variant="ghost"
//               className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
//               onClick={() => handleOptionClick("size", value)}
//               title={name}
//             >
//               {name}
//             </Button>
//           ))}
//         </div>
//       );
//     case "script":
//       return (
//         <div className="flex gap-2">
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("script", "sub")}
//             title="Subscript"
//           >
//             X <sub>2</sub>
//           </Button>
//           <Button
//             variant="ghost"
//             className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
//             onClick={() => handleOptionClick("script", "super")}
//             title="Superscript"
//           >
//             X <sup>2</sup>
//           </Button>
//         </div>
//       );
//     case "header":
//       const headers = Array.from({ length: 6 }, (_, i) => ({
//         level: i + 1,
//         fontSize: `${32 - (i + 1) * 4}px`,
//       }));
//       return (
//         <div className="flex gap-2 flex-wrap my-2">
//           {headers.map(({ level, fontSize }) => (
//             <Button
//               key={level}
//               variant="ghost"
//               className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
//               onClick={() => handleOptionClick("header", level.toString())}
//             >
//               {level}
//             </Button>
//           ))}
//         </div>
//       );
//     default:
//       return <div>No valid component selected</div>;
//   }
"use client"
import React, { useState, useRef, useEffect } from "react";
import {
  Bold, Italic, Underline, Link, Image, List,
  AlignLeft, AlignCenter, AlignRight, AlignJustify,
  Heading1, Heading2, Heading3, Save, Undo, Redo,
  ChevronRight, ChevronLeft, Type, ListOrdered,
  Quote, Code, Coffee, Eye,
  Superscript,
  Subscript,
  Heading4,
  Heading5,
  Heading6
} from "lucide-react";
import { IconBackground, IconTextColor } from "@tabler/icons-react";

const EditorLayout = () => {
  const [title, setTitle] = useState("");
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [activeFormats, setActiveFormats] = useState(new Set());
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef(null);
  const [lastSaved, setLastSaved] = useState("Not saved");

  useEffect(() => {
    const checkActiveFormats = () => {
      const formats = new Set();
      if (document.queryCommandState('bold')) formats.add('bold');
      if (document.queryCommandState('italic')) formats.add('italic');
      if (document.queryCommandState('underline')) formats.add('underline');
      setActiveFormats(formats);
    };

    document.addEventListener('selectionchange', checkActiveFormats);
    return () => document.removeEventListener('selectionchange', checkActiveFormats);
  }, []);

  const updateWordCount = () => {
    const text = editorRef.current?.innerText || "";
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateWordCount();
  };

  const ToolbarButton = ({ icon: Icon, onClick, label, command }) => (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-colors group relative
        ${activeFormats.has(command) ? 'bg-blue-100' : 'hover:bg-blue-50'}`}
      title={label}
    >
      <Icon size={20} className={`${activeFormats.has(command) ? 'text-blue-600' : 'text-gray-600 group-hover:text-blue-600'}`} />
      <span className={`text-xs mt-1 ${activeFormats.has(command) ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'} text-wrap `}>
        {label}
      </span>
    </button>
  );

  const ToolbarDivider = () => (
    <div className="h-px bg-gray-200 w-full my-2" />
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      formatText('insertText', '    ');
    }
    // Support for common keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch(e.key) {
        case 'b': formatText('bold'); e.preventDefault(); break;
        case 'i': formatText('italic'); e.preventDefault(); break;
        case 'u': formatText('underline'); e.preventDefault(); break;
        case 'z': formatText('undo'); e.preventDefault(); break;
        case 'y': formatText('redo'); e.preventDefault(); break;
      }
    }
  };

  const handleLink = () => {
    const url = window.prompt('Enter URL:', 'https://');
    if (url) formatText('createLink', url);
  };

  const handleImage = () => {
    const url = window.prompt('Enter image URL:', 'https://');
    if (url) formatText('insertImage', url);
  };

  const simulateSave = () => {
    // Simulate saving animation
    const now = new Date();
    setLastSaved(`Last saved at ${now.toLocaleTimeString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      {/* Top Navbar */}
      <header className="border-b bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-16 xl:h-18">
            <div className="flex items-center gap-4 flex-1 w-full "> 
            
              <span className=" text-sm md:text-2xl font-bold text-blue-600 xl:w-32 ">Open Note Editor</span>
              <span className="text-sm text-gray-500 line-clamp-1 md:line-clamp-0">{lastSaved}</span>
              
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Eye size={18} />
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={simulateSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-100 ease-in-out"
              >
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 ">
        {/* Main Content Area */}
        <div className="flex-1 px-8 py-6 xl:max-w-7xl mx-auto">
          {/* Document Title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled Document"
            className="w-full text-4xl font-bold text-gray-900 mb-6 outline-none border-b border-gray-300 pb-2 focus:border-blue-600 transition-colors bg-transparent  "
          />
          
          {/* Status Bar */}
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Type size={14} />
                {wordCount} words
              </span>
              <span className="flex items-center gap-1">
                <Coffee size={14} />
                {Math.ceil(wordCount / 200)} min read
              </span>
            </div>
          </div>

          {/* Editor Area */}
          <div
            ref={editorRef}
            contentEditable={!isPreview}
            onKeyDown={handleKeyDown}
            onInput={updateWordCount}
            className={`min-h-[calc(100vh-250px)] bg-white editor border rounded-lg shadow-sm p-6 outline-none overflow-auto
              ${isPreview ? 'prose max-w-none' : ''}`}
            style={{ whiteSpace: 'pre-wrap' }}
          />
        </div>

   
        <div
  className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-fit'} border-l bg-white shadow-sm flex flex-col`}
>
  {/* Collapse Toggle */}
  <button
    onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
    className="p-2 hover:bg-gray-100 border-b transition-colors"
  >
    {isSidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
  </button>


  <div className={` flex-col gap-4 p-2 overflow-y-auto ${isSidebarCollapsed ? "hidden" : "flex"}`} >
    {/* History */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={Undo} onClick={() => formatText('undo')} label="Undo" />
        <ToolbarButton icon={Redo} onClick={() => formatText('redo')} label="Redo" />
      </div>
    </div>

    <ToolbarDivider />

    {/* Text Formatting */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={Bold} onClick={() => formatText('bold')} label="Bold" command="bold" />
        <ToolbarButton icon={Italic} onClick={() => formatText('italic')} label="Italic" command="italic" />
        <ToolbarButton icon={Underline} onClick={() => formatText('underline')} label="Underline" command="underline" />
        <ToolbarButton icon={Superscript} onClick={() => formatText('superscript')} label="Sup" />
        <ToolbarButton icon={Subscript} onClick={() => formatText('subscript')} label="Sub" />
      </div>
    </div>

    <ToolbarDivider />

    {/* Colors */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton
          icon={IconTextColor}
          onClick={() => formatText('foreColor', prompt('Enter text color (e.g., red, #ff0000):'))}
          label="Text Color"
        />
        <ToolbarButton
          icon={IconBackground}
          onClick={() => formatText('backColor', prompt('Enter background color (e.g., yellow, #ffff00):'))}
          label="Background Color"
        />
      </div>
    </div>

    <ToolbarDivider />

    {/* Alignment */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={AlignLeft} onClick={() => formatText('justifyLeft')} label="Left" />
        <ToolbarButton icon={AlignCenter} onClick={() => formatText('justifyCenter')} label="Center" />
        <ToolbarButton icon={AlignRight} onClick={() => formatText('justifyRight')} label="Right" />
        <ToolbarButton icon={AlignJustify} onClick={() => formatText('justifyFull')} label="Justify" />
      </div>
    </div>

    <ToolbarDivider />

    {/* Lists */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={List} onClick={() => formatText('insertUnorderedList')} label="Bullet" />
        <ToolbarButton icon={ListOrdered} onClick={() => formatText('insertOrderedList')} label="Number" />
      </div>
    </div>

    <ToolbarDivider />

    {/* Headings */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <div className="flex">
        <ToolbarButton icon={Heading1} onClick={() => formatText('formatBlock', '<h1>')} label="H1" />
        <ToolbarButton icon={Heading2} onClick={() => formatText('formatBlock', '<h2>')} label="H2" />
        <ToolbarButton icon={Heading3} onClick={() => formatText('formatBlock', '<h3>')} label="H3" />
        </div>
        <div className="flex">
        
        <ToolbarButton icon={Heading4} onClick={() => formatText('formatBlock', '<h4>')} label="H4" />

        <ToolbarButton icon={Heading5} onClick={() => formatText('formatBlock', '<h5>')} label="H5" />
        <ToolbarButton icon={Heading6} onClick={() => formatText('formatBlock', '<h6>')} label="H6" />
        </div>
      </div>
    </div>

    <ToolbarDivider />

    {/* Special Formats */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={Quote} onClick={() => formatText('formatBlock', '<blockquote>')} label="Quote" />
        <ToolbarButton icon={Code} onClick={() => formatText('formatBlock', '<pre>')} label="Code" />
      </div>
    </div>

    <ToolbarDivider />

    {/* Insert */}
    <div className="flex flex-col">
      <div className="flex gap-2">
        <ToolbarButton icon={Link} onClick={handleLink} label="Link" />
        <ToolbarButton icon={Image} onClick={handleImage} label="Image" />
      </div>
    </div>
  </div>

</div>

      </div>
    </div>
  );
};

export default EditorLayout;


// Define the props for ToolbarButton
interface ToolbarButtonProps {
  icon: React.ElementType; // Component for the icon
  onClick: () => void; // Click handler function
  label: string; // Accessibility label
  command?: string; // Optional command property
}

// ToolbarButton Component
const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon: Icon, onClick, label }) => (
  <button
    onClick={onClick}
    className="p-2 hover:bg-gray-100 transition-colors"
    aria-label={label}
  >
    <Icon size={20} />
  </button>
);

const Toolbar: React.FC = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Format text function with type-safe commands
  const formatText = (command: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontWeight = 'bold';
      range.surroundContents(span);
    }
  };

  // Handlers
  const handleLink = () => {
    const url = prompt('Enter the URL:');
    if (url) {
      formatText('createLink', url);
    }
  };

  const handleImage = () => {
    const imageUrl = prompt('Enter the image URL:');
    if (imageUrl) {
      formatText('insertImage', imageUrl);
    }
  };
  const insertUnorderedList = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const list = document.createElement('ul');
      const listItem = document.createElement('li');
      listItem.textContent = selection.toString();
      list.appendChild(listItem);
      range.deleteContents();
      range.insertNode(list);
    }
  };
  
  const insertOrderedList = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const list = document.createElement('ol');
      const listItem = document.createElement('li');
      listItem.textContent = selection.toString();
      list.appendChild(listItem);
      range.deleteContents();
      range.insertNode(list);
    }
  };
  
  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarCollapsed ? 'w-16' : 'w-fit'
      } border-l bg-white shadow-sm flex flex-col`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setSidebarCollapsed(!isSidebarCollapsed)}
        className="p-2 hover:bg-gray-100 border-b transition-colors"
      >
        {isSidebarCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      {/* Toolbar Groups */}
      <div className="flex flex-col gap-4 p-2 overflow-y-auto">
        {/* History */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Undo} onClick={() => formatText('undo')} label="Undo" />
            <ToolbarButton icon={Redo} onClick={() => formatText('redo')} label="Redo" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Text Formatting */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Bold} onClick={() => formatText('bold')} label="Bold" />
            <ToolbarButton icon={Italic} onClick={() => formatText('italic')} label="Italic" />
            <ToolbarButton icon={Underline} onClick={() => formatText('underline')} label="Underline" />
            <ToolbarButton icon={Superscript} onClick={() => formatText('superscript')} label="Sup" />
            <ToolbarButton icon={Subscript} onClick={() => formatText('subscript')} label="Sub" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Colors */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton
              icon={IconTextColor}
              onClick={() => formatText('foreColor', prompt('Enter text color (e.g., red, #ff0000):') || '')}
              label="Text Color"
            />
            <ToolbarButton
              icon={IconBackground}
              onClick={() => formatText('backColor', prompt('Enter background color (e.g., yellow, #ffff00):') || '')}
              label="Background Color"
            />
          </div>
        </div>

        <ToolbarDivider />

        {/* Alignment */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={AlignLeft} onClick={() => formatText('justifyLeft')} label="Left" />
            <ToolbarButton icon={AlignCenter} onClick={() => formatText('justifyCenter')} label="Center" />
            <ToolbarButton icon={AlignRight} onClick={() => formatText('justifyRight')} label="Right" />
            <ToolbarButton icon={AlignJustify} onClick={() => formatText('justifyFull')} label="Justify" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Lists */}
        <div className="flex flex-col">
          <div className="flex gap-2">
          <ToolbarButton
  Icon={<List />}
  onClick={() => formatText('insertUnorderedList')} // or use insertUnorderedList directly
  label="Bullet"
/>

<ToolbarButton
  Icon={<ListOrdered />}
  onClick={() => formatText('insertOrderedList')} // or use insertOrderedList directly
  label="Number"
/>

          </div>
        </div>

        <ToolbarDivider />

        {/* Headings */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Heading1} onClick={() => formatText('formatBlock', '<h1>')} label="H1" />
            <ToolbarButton icon={Heading2} onClick={() => formatText('formatBlock', '<h2>')} label="H2" />
            <ToolbarButton icon={Heading3} onClick={() => formatText('formatBlock', '<h3>')} label="H3" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Special Formats */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Quote} onClick={() => formatText('formatBlock', '<blockquote>')} label="Quote" />
            <ToolbarButton icon={Code} onClick={() => formatText('formatBlock', '<pre>')} label="Code" />
          </div>
        </div>

        <ToolbarDivider />

        {/* Insert */}
        <div className="flex flex-col">
          <div className="flex gap-2">
            <ToolbarButton icon={Link} onClick={handleLink} label="Link" />
            <ToolbarButton icon={Image} onClick={handleImage} label="Image" />
          </div>
        </div>
      </div>
    </div>
  );
};

// ToolbarDivider Component
const ToolbarDivider: React.FC = () => <hr className="border-t my-2" />;

