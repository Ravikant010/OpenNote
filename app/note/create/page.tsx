"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import QuillEditor from "./_components/QuillEditor";
import {
  AlignJustify,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Dot,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { menu_options } from "./_types/menu";
import { MenuSectionComponent } from "./_components/rich-text/menu-section";
import RichTextMenu from "./_components/rich-text";
import Quill from "quill";
import { formats } from "./_components/rich-text/config";
import { MenuOption } from "./_components/_types/menu";
import { TextFormatting } from "./_components/rich-text/text-editor-formatting";
import {
  Bold,
  Italic,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Note } from "@/models";
export default function NotePage() {
  const quillRef = useRef<RefObject<Quill> | null>(null);
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [component, setComponent] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const handleOptionClick = (option: string, value: string | "") => {
    console.log(option, value, "Dfdf");
    if (!quillRef.current) return;
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
    setComponent(option);
  };
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/userallnote");
        if (!response.ok) {
          throw new Error("Failed to fetch notes");
        }
        const data = await response.json();
        if (data.success) {
          setNotes(data.data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        //@ts-ignore
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  // Render loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error state
  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-[#030618]">
      <header className="h-14 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center px-4 text-white shadow-md border-b-2 border-gray-200 dark:border-gray-800 text-center font-sans text-xl font-semibold ">
        Write Your Note
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div
          className={`
          w-64 flex-shrink-0 bg-gray-50 dark:bg-[#0f1011] border-r
          transition-all duration-300 ease-in-out
          ${isLeftSidebarOpen ? "" : "-ml-64"}
        `}
        >
          <div className="p-4 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              {/* <h2 className="font-medium">Notes List</h2>
              <button
                onClick={() => setIsLeftSidebarOpen(false)}
                className="lg:hidden"
              >
                <X className="w-5 h-5" />
              </button> */}
            </div>
            <div className="space-y-2">
              {notes &&notes.map((e,index) => (
                <Button  variant={"outline"}
                  key={index}
                  className="p-2   shadow text-sm font-medium  transition-colors duration-200 w-full text-start  self-start flex justify-start rounded-2xl px-4"
                >
                 {e.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 flex min-w-0">
          <div
            className={`transition-transform duration-300 ${
              isLeftSidebarOpen ? "translate-x-0" : "-translate-x-2"
            }`}
          >
            {isLeftSidebarOpen ? (
              <Button
                onClick={() => setIsLeftSidebarOpen(false)}
                className="lg:flex py-1 m-2 h-fit rounded-3xl px-4 mt-8"
                variant="outline"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={() => setIsLeftSidebarOpen(true)}
                className="flex py-1 m-2 h-fit rounded-3xl px-4 mt-8"
                variant="outline"
              >
                notes
              </Button>
            )}
          </div>
          <div className="flex-1 p-4 lg:p-6 bg-white dark:bg-[#030618] overflow-auto font-sans">
            <div className="w-full h-full">
              <Input placeholder="Title" className="w-full h-14 mb-10" ref={titleRef} />
              <QuillEditor quillRef={quillRef} />
            </div>
          </div>
          <Button
            className="py-1 m-2 h-fit rounded-3xl px-4 mt-8"
            variant="outline"
            onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
          >
            {isRightSidebarOpen ? <ArrowRight /> : "styles"}
          </Button>
          <div
            className={`
            w-64 flex-shrink-0 bg-gray-50 dark:bg-[#0f1011] border-l
            transition-all duration-300 ease-in-out
            ${isRightSidebarOpen ? "" : "mr-[-256px]"}
          `}
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg mb-4 pb-2 border-b-2 border-gray-200 dark:border-gray-700">
                  Style
                </h2>
                <button
                  onClick={() => setIsRightSidebarOpen(false)}
                  className="lg:hidden"
                >
                  {/* <X className="w-5 h-5" /> */}
                </button>
              </div>
              {menu_options.map((item, index) => (
                <MenuSection
                  key={index}
                  section={item.section}
                  options={item.options}
                  handleOptionClick={handleOptionClick}
                  component={component}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Button
        className="h-14 bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center px-4 text-white shadow-md border-t-2 border-gray-200 dark:border-gray-800 text-center font-sans text-xl font-semibold"
        onClick={async () => {
          if(titleRef.current) {
if(!titleRef.current.value)
           return  toast({
              title: "Error",
              description: "Title is required",
              duration: 3000,
              
            });
          }
          try {
            const note = {
              title: titleRef.current?.value || "",
              //@ts-ignore
              content: quillRef?.current?.root.innerHTML || "",
              createdAt: new Date(),
              updatedAt: new Date(),
              isPublic: true,
            };
            console.log(note);
            const validatedNote = z
              .object({
                title: z.string().min(1),
                content: z.string().min(1),
                createdAt: z.date(),
                updatedAt: z.date(),
                isPublic: z.boolean(),
              })
              .parse(note);
            const response = await fetch("/api/save-note", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(note),
            });
            const data = await response.json();
            console.log(data)
            if (data.success) {
              toast({
                title: "Success",
                description: "Note saved successfully!",
                duration: 3000,
              });

          return   setTimeout(()=>router.push(`/${data?.data.username}/notes`), 1000);
            }

            if (!data.success) {
            
              throw new Error("Failed to save note");
            }
          
            throw new Error(data.message || "Failed to save note");
          } catch (error) {
            toast({
              title: "Error",
              //@ts-ignore
              description: error.message || "An unexpected error occurred.",
              duration: 3000,
            });
          }
        }}
      >
        Save
      </Button>
    </div>
  );
}
const componentsToCheck = [
  "color",
  "align",
  "list",
  "font",
  "size",
  "direction",
  "header",
  "indent",
  "script",
  "background",
];
const MenuSection = ({
  section,
  options,
  handleOptionClick,
  component,
}: {
  section: string;
  options: { name: string; description: string }[];
  handleOptionClick: (options: string, value: string | "") => void;
  component: string;
}) => {
  const matchedComponent = componentsToCheck.find((e) => e === component);
  return (
    <div className="mb-4">
      <h3 className="py-1 mb-4 h-fit w-full border-b border-gray-200 dark:border-gray-700 font-medium text-sm uppercase tracking-wide">
        {section}
      </h3>
      <div className="flex flex-wrap gap-2 ml-2">
        {options.map((option, index) => (
          <div key={index}>
            <Button
              variant={"outline"}
              key={index}
              onClick={() => handleOptionClick(option.name, "")}
              className={`
               ${
                 matchedComponent && matchedComponent === option.name
                   ? "hidden"
                   : "inline-block"
               } 
                py-1 px-3 rounded-full shadow text-sm cursor-pointer w-fit h-fit font-medium transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
              `}
            >
              {option.name}
            </Button>
            <div
              className={`${
                matchedComponent && matchedComponent === option.name
                  ? "flex"
                  : "hidden"
              }`}
            >
              {matchedComponent && (
                <NestedStyling
                  component={matchedComponent}
                  handleOptionClick={handleOptionClick}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
function NestedStyling({
  component,
  handleOptionClick,
}: {
  component: string;
  handleOptionClick: (option: string, value: string | "") => void; 
}): JSX.Element {
  const COLORS = [
    { value: "#87CEEB", name: "Sky Blue" },
    { value: "#F08080", name: "Light Coral" },
    { value: "#98FB98", name: "Pale Green" },
    { value: "#FFD700", name: "Golden Yellow" },
    { value: "#E6E6FA", name: "Lavender" },
    { value: "#FA8072", name: "Salmon" },
    { value: "#BA55D3", name: "Medium Orchid" },
    { value: "#20B2AA", name: "Light Sea Green" },
    { value: "#708090", name: "Slate Gray" },
    { value: "#F4A460", name: "Sandy Brown" },
  ];
  const FONTS = [
    { value: "serif", name: "Serif" },
    { value: "", name: "Sans-Serif" },
    { value: "monospace", name: "Monospace" },
  ];
  const SIZES = [
    { value: "small", name: "Small" },
    { value: "", name: "Normal" },
    { value: "large", name: "Large" },
    { value: "huge", name: "Huge" },
  ];
  console.log(component);
  switch (component) {
    case "color":
      return (
        <div className="flex flex-1 flex-wrap gap-2">
          {COLORS.map(({ value, name }) => (
            <Button
              key={value}
              style={{ backgroundColor: value }}
              className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
              onClick={() => handleOptionClick("color", value)} 
              title={name}
            ></Button>
          ))}
        </div>
      );
    case "background":
      return (
        <div className="flex flex-1 flex-wrap gap-2">
          {COLORS.map(({ value, name }) => (
            <Button
              key={value}
              style={{ backgroundColor: value }}
              className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
              onClick={() => handleOptionClick("background", value)} 
              title={name}
            ></Button>
          ))}
        </div>
      );
    case "indent":
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="w-10 h-10 mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-full self-center"
            onClick={() => handleOptionClick("indent_minus", "decrease")}
            title="Decrease Indent"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-10 h-10 mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-full self-center"
            onClick={() => handleOptionClick("indent_plus", "increase")}
            title="Increase Indent"
          >
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      );
    case "font":
      return (
        <div className="flex flex-1 flex-wrap gap-2">
          {" "}
          {FONTS.map(({ value, name }) => (
            <Button
              key={value}
              style={{ fontFamily: value }}
              className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
              onClick={() => handleOptionClick("font", value)} 
              title={name}
              variant={"ghost"}
            >
              {name}
            </Button>
          ))}
        </div>
      );
    case "align":
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => handleOptionClick("align", "")}
            title="Align Left"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
          >
            <AlignLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleOptionClick("align", "center")}
            title="Align Center"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
          >
            <AlignCenter className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleOptionClick("align", "right")}
            title="Align Right"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
          >
            <AlignRight className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleOptionClick("align", "justify")}
            title="Align Right"
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
          >
            <AlignJustify className="w-5 h-5" />
          </Button>
        </div>
      );
    case "list":
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("list", "ordered")}
            title="Ordered List"
          >
            <List className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("list", "bullet")}
            title="Bullet List"
          >
            <Dot size={10} />
          </Button>
        </div>
      );
    case "direction":
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("direction", "rtl")}
            title="Right to Left"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("direction", "ltr")}
            title="Left to Right"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
      );
    case "size":
      return (
        <div className="flex flex-wrap gap-2">
          {SIZES.map(({ value, name }) => (
            <Button
              key={value}
              variant="ghost"
              className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
              onClick={() => handleOptionClick("size", value)}
              title={name}
            >
              {name}
            </Button>
          ))}
        </div>
      );
    case "script":
      return (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("script", "sub")}
            title="Subscript"
          >
            X <sub>2</sub>
          </Button>
          <Button
            variant="ghost"
            className="w-8 h-8 rounded-full mx-1 flex items-center justify-center text-white font-semibold p-0 my-0 transition-transform duration-200 hover:scale-110"
            onClick={() => handleOptionClick("script", "super")}
            title="Superscript"
          >
            X <sup>2</sup>
          </Button>
        </div>
      );
    case "header":
      const headers = Array.from({ length: 6 }, (_, i) => ({
        level: i + 1,
        fontSize: `${32 - (i + 1) * 4}px`,
      }));
      return (
        <div className="flex gap-2 flex-wrap my-2">
          {headers.map(({ level, fontSize }) => (
            <Button
              key={level}
              variant="ghost"
              className="w-fit h-fit mx-1 flex items-center justify-center text-white font-normal p-0 my-0 text-sm px-2 rounded-3xl transition-transform duration-200 hover:scale-110"
              onClick={() => handleOptionClick("header", level.toString())}
            >
              {level}
            </Button>
          ))}
        </div>
      );
    default:
      return <div>No valid component selected</div>;
  }
}
