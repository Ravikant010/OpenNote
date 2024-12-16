"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp, Parentheses, X } from "lucide-react";
import { 
    Bold, 
    Italic, 
    Underline, 
    Strikethrough, 
    Superscript,
    Palette,
    Type,
 StrikethroughIcon,
    AlignLeft,
    RotateCcw,
    Heading1,
    Quote,
    Indent,
    List,
    Code,
    FileCode,

    Link,
    Image,
    Video
  } from 'lucide-react';

type Props = {};
export default function Page({}: Props) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);
  useEffect(() => {
    if (!quillRef.current && document.getElementById("editor-container")) {
      const container = document.getElementById("editor-container");
      const quill = new Quill(container as HTMLElement);
      quillRef.current = quill;
      console.log(quillRef);
    }
  }, []);
  const [ShowRichTextOptions, setRichTextOptions] = useState(false);
  function handleMenu() {
    setRichTextOptions(!ShowRichTextOptions);
  }
  const menu_options = [
    {
        section: "Text Formatting",
        options: [
            { name: "bold", description: "Toggle bold text" },
            { name: "italic", description: "Toggle italic text" },
            { name: "underline", description: "Toggle underline" },
            { name: "strike", description: "Toggle strikethrough" },
            { name: "script", description: "Sub/superscript" }
        ]
    },
    {
        section: "Text Styling",
        options: [
            { name: "color", description: "Change text color" },
            { name: "background", description: "Change background color" },
            { name: "font", description: "Change font family" },
            { name: "size", description: "Change font size" }
        ]
    },
    {
        section: "Text Alignment & Direction",
        options: [
            { name: "align", description: "Text alignment" },
            { name: "direction", description: "Text direction" }
        ]
    },
    {
        section: "Structural Elements",
        options: [
            { name: "header", description: "Add heading" },
            { name: "blockquote", description: "Toggle blockquote" },
            { name: "indent", description: "Adjust indentation" },
            { name: "list", description: "Toggle list (ordered/bullet)" }
        ]
    },
    {
        section: "Code & Special Formats",
        options: [
            { name: "code", description: "Toggle code format" },
            { name: "code-block", description: "Toggle code block" },
            { name: "formula", description: "Insert formula" }
        ]
    },
    {
        section: "Media",
        options: [
            { name: "link", description: "Insert/edit link" },
            { name: "image", description: "Insert image" },
            { name: "video", description: "Insert video" }
        ]
    }
];

function Rich_text_formating() {
  return (
    <>
    <div className="p-2 rounded-full dark:bg-[#232426] w-fit mx-auto my-2" onClick={handleMenu}>
     <X width={26} height={26}  className=""/> 
     </div> 
      <div className="flex flex-col overflow-y-auto max-h-96 ">
       
    <div className="w-full rounded-lg dark:bg-[#151617] h-fit p-3 bg-[#FDFEFD] ">
     
    
        {menu_options.map((section, sectionIndex) => (
          <div key={sectionIndex} className="flex flex-col gap-2 items-start dark:text-[#DADCDE] font-semibold">
            <h3 className="text-xs text-gray-500 whitespace-nowrap">{section.section}</h3>
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 w-full pb-2">
              {section.options.map((option, optionIndex) => (
                <Button
                  key={`${sectionIndex}-${optionIndex}`}
                  className="px-3 py-2 rounded-full cursor-pointer transition-colors flex-shrink-0 dark:bg-[#232426] dark:text-[#DFE1E2]"
                  variant={"outline"}
                  onClick={() => {
                    if (!quillRef.current) return;
                    
                    switch(option.name) {
                      case 'bold':
                        formats.bold(quillRef.current);
                        break;
                      case 'italic':
                        formats.italic(quillRef.current);
                        break;
                      case 'underline':
                        formats.underline(quillRef.current);
                        break;
                      case 'strike':
                        formats.strike(quillRef.current);
                        break;
                      case 'script':
                        formats.script(quillRef.current);
                        break;
                      case 'color':
                        formats.color(quillRef.current);
                        break;
                      case 'background':
                        formats.background(quillRef.current);
                        break;
                      case 'font':
                        formats.font(quillRef.current);
                        break;
                      case 'size':
                        formats.size(quillRef.current);
                        break;
                      case 'align':
                        formats.align(quillRef.current);
                        break;
                      case 'direction':
                        formats.direction(quillRef.current);
                        break;
                      case 'header':
                        formats.header(quillRef.current);
                        break;
                      case 'blockquote':
                        formats.blockquote(quillRef.current);
                        break;
                      case 'indent':
                        formats.indent(quillRef.current);
                        break;
                      case 'list':
                        formats.list(quillRef.current);
                        break;
                      case 'code':
                        formats.code(quillRef.current);
                        break;
                      case 'code-block':
                        formats.codeBlock(quillRef.current);
                        break;
                      case 'formula':
                        formats.formula(quillRef.current);
                        break;
                      case 'link':
                        formats.link(quillRef.current);
                        break;
                      case 'image':
                        formats.image(quillRef.current);
                        break;
                      case 'video':
                        formats.video(quillRef.current);
                        break;
                    }
                  }}
                >
                  {getIcon(option.name)}
                  <span className="ml-2 text-xs whitespace-nowrap">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
function getIcon(name: string) {
    switch(name) {
      case 'bold':
        return <Bold size={16} />;
      case 'italic':
        return <Italic size={16} />;
      case 'underline':
        return <Underline size={16} />;
      case 'strike':
        return <StrikethroughIcon size={16} />;
      case 'script':
        return <Superscript size={16} />;
      case 'color':
        return <Palette size={16} />;
      case 'background':
        return <Palette size={16} />;
      case 'font':
        return <Type size={16} />;
      case 'size':
        // return <FontSize size={16} />;
      case 'align':
        return <AlignLeft size={16} />;
      case 'direction':
        return <RotateCcw size={16} />;
      case 'header':
        return <Heading1 size={16} />;
      case 'blockquote':
        return <Quote size={16} />;
      case 'indent':
        return <Indent size={16} />;
      case 'list':
        return <List size={16} />;
      case 'code':
        return <Code size={16} />;
      case 'code-block':
        return <FileCode size={16} />;
      case 'formula':
        return <Parentheses size={16} />;
      case 'link':
        return <Link size={16} />;
      case 'image':
        return <Image size={16} />;
      case 'video':
        return <Video size={16} />;
      default:
        return null;
    }
  }
  return (
    <div className="container mx-auto ">
      <div className="flex w-full items-center">
        <Button variant={"ghost"}>Cacnel</Button>
        <div className="flex-1 text-center">Notes</div>
        <Button variant={"ghost"}>Save</Button>
      </div>
      <Separator />
      <div className="text-sm text-gray-500 flex justify-between">
        <div>{new Date().toLocaleDateString()}</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
      {/* <Button onClick={()=>{
               const selection = quillRef.current?.getSelection();
               if (selection) {
                   quillRef.current?.deleteText(selection.index, selection.length);
               }
            console.log(quillRef.current?.getText())
        }}>Bold</Button> */}
      <div className="editor-container min-h-[300px] " id="editor-container">
        {/* <div ref={editorRef} className="min-h-[300px] bg-red-100">sdff</div> */}
      </div>
      {ShowRichTextOptions ? (
        <div className="bottom-0 absolute  w-full max-w-2xl animate-in slide-in-from-bottom-full p-3">
          <Rich_text_formating />
        </div>
      ) : (
        <div className="p-2 rounded-full dark:bg-[#232426] w-fit mx-auto my-2 absolute bottom-5 left-1/2 -translate-x-1/2">
          <CircleChevronUp
            width={26}
            height={26}
            className={`cursor-pointer hover:scale-110 transition-all duration-300 ${
              ShowRichTextOptions ? "rotate-180" : "rotate-0"
            }`}
            onClick={handleMenu}
          />
        </div>
      )}
    </div>
  );
}
// Quill Format Handlers
const formats = {
  // Inline formats
  background: (quill: any, value: string) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("background", value);
    }
  },
  bold: (quill: Quill) => {
    const range = quill.getSelection();
    console.log(range);
    if (range) {
      const format = quill.getFormat(range);
      quill.format("bold", !format.bold);
    }
  },
  color: (quill: any, value: string) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("color", value);
    }
  },
  font: (quill: any, value: string) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("font", value);
    }
  },
  code: (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("code", !format.code);
    }
  },
  italic: (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("italic", !format.italic);
    }
  },
  link: (quill: any, url: string) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("link", url);
    }
  },
  size: (quill: any, value: string) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("size", value);
    }
  },
  strike: (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("strike", !format.strike);
    }
  },
  script: (quill: any, value: "sub" | "super" | false) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("script", value);
    }
  },
  underline: (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("underline", !format.underline);
    }
  },
  // Block formats
  blockquote: (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("blockquote", !format.blockquote);
    }
  },
  header: (quill: any, value: number | false) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("header", value);
    }
  },
  indent: (quill: any, value: "+1" | "-1") => {
    const range = quill.getSelection();
    if (range) {
      quill.format("indent", value);
    }
  },
  list: (quill: any, value: "ordered" | "bullet" | false) => {
    const range = quill.getSelection();
    if (range) {
      quill.format("list", value);
    }
  },
  align: (quill: any, value: "left" | "center" | "right" | "justify") => {
    const range = quill.getSelection();
    if (range) {
      quill.format("align", value);
    }
  },
  direction: (quill: any, value: "rtl") => {
    const range = quill.getSelection();
    if (range) {
      quill.format("direction", value);
    }
  },
  "code-block": (quill: any) => {
    const range = quill.getSelection();
    if (range) {
      const format = quill.getFormat(range);
      quill.format("code-block", !format["code-block"]);
    }
  },
  // Embeds
  formula: (quill: any, formula: string) => {
    const range = quill.getSelection(true);
    if (range) {
      quill.insertEmbed(range.index, "formula", formula, "user");
    }
  },
  image: (quill: any, imageUrl: string) => {
    const range = quill.getSelection(true);
    if (range) {
      quill.insertEmbed(range.index, "image", imageUrl, "user");
    }
  },
  video: (quill: any, videoUrl: string) => {
    const range = quill.getSelection(true);
    if (range) {
      quill.insertEmbed(range.index, "video", videoUrl, "user");
    }
  },
};
