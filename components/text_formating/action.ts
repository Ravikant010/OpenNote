import { formats } from "@/app/note/create/_components/rich-text/config";
import Quill from "quill";
import { RefObject } from "react";


export default function TextFormatting(option:string,value:string, quillRef: RefObject<Quill>){
    console.log(value, option)
    switch (option) {
          case "color":
            const colorFormatFunction: any =
              formats[option as keyof typeof formats];
            if (colorFormatFunction) {
              colorFormatFunction(quillRef.current, value || "");
            }
            break;
          case "script":
            const scriptFormatFunction: any =
              formats[option as keyof typeof formats];
            if (scriptFormatFunction) {
              scriptFormatFunction(quillRef.current, value || "");
            }
            break;
          case "font":
            const fontFormatFunction: any = formats[option as keyof typeof formats];
            console.log(fontFormatFunction, "Dfdf");
            if (fontFormatFunction) {
              fontFormatFunction(quillRef.current, value || "");
            }
            break;
          case "size":
            const sizeFormatFunction: any = formats[option as keyof typeof formats];
            if (sizeFormatFunction) {
              sizeFormatFunction(quillRef.current, value || "");
            }
            break;
          case "align":
            const alignFormatFunction: any =
              formats[option as keyof typeof formats];
            if (alignFormatFunction) {
              alignFormatFunction(quillRef.current, value || "");
            }
            break;
          case "background":
            const backgroundFormatFunction: any =
              formats[option as keyof typeof formats];
            if (backgroundFormatFunction) {
              backgroundFormatFunction(quillRef.current, value || "");
            }
            break;
          case "header":
            const headerFormatFunction: any =
              formats[option as keyof typeof formats];
            if (headerFormatFunction) {
              headerFormatFunction(quillRef.current, Number(value) || 1);
            }
            break;
          case "link":
            const linkFormatFunction: any = formats[option as keyof typeof formats];
            if (linkFormatFunction) {
              linkFormatFunction(quillRef.current, value || "");
            }
            break;
          case "formula":
            const formulaFormatFunction: any =
              formats[option as keyof typeof formats];
            if (formulaFormatFunction) {
              formulaFormatFunction(quillRef.current, value || "");
            }
            break;
          case "list":
            const listFormatFunction: any = formats[option as keyof typeof formats];
            if (listFormatFunction) {
              listFormatFunction(quillRef.current, value || "");
            }
            break;
          case "direction":
            const directionFormatFunction: any =
              formats[option as keyof typeof formats];
            const alignFormat: any = formats["align"];
            if (directionFormatFunction && quillRef.current) {
              const quill = quillRef.current;
              //@ts-ignore
              const selection = quill.getSelection();
              if (selection) {
                 //@ts-ignore
                const currentFormat = quill.getFormat(selection);
                const newDirection = currentFormat.direction === value ? "" : value;
                directionFormatFunction(quill, newDirection);
                if (alignFormat) {
                  if (newDirection === "rtl") {
                    alignFormat(quill, "right");
                  } else if (newDirection === "ltr") {
                    alignFormat(quill, "left");
                  } else {
                    alignFormat(quill, "");
                  }
                }
              }
            }
            break;
          case "blockquote":
            const blockquoteFormatFunction: any =
              formats[option as keyof typeof formats];
            if (blockquoteFormatFunction) {
              blockquoteFormatFunction(quillRef.current);
            }
            break;
          case "indent_plus":
            const indentPlusFormatFunction: any =
              formats[option as keyof typeof formats];
            if (indentPlusFormatFunction) {
              indentPlusFormatFunction(quillRef.current);
            }
            break;
          case "indent_minus":
            const indentMinusFormatFunction: any =
              formats[option as keyof typeof formats];
            if (indentMinusFormatFunction) {
              indentMinusFormatFunction(quillRef.current);
            }
            break;
          default:
            {
              const fontFormatFunction: any =
                formats[option as keyof typeof formats];
              if (fontFormatFunction) {
                fontFormatFunction(quillRef.current);
              }
            }
            console.log("No format function found for this option type.");
            break;
        }
}