"use client";
import hljs from "highlight.js"; // Import highlight.js library
import "highlight.js/styles/github.css"; // Import a syntax highlighting style (can choose another one)
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import RichTextMenu from "./_components/rich-text";
import Quill from "quill";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/db/db"; // Import the database instance
import { notes } from "@/db/schema"; // Import the notes schema
import { saveNote } from "@/services/actions/saveNote";
import { Note, noteSchema } from "@/lib/schema/note";
import { getSession } from "@/lib/session";
import { useRouter } from "next/navigation";
export default function Page() {
  const quillRef = useRef<Quill | null>(null);
  const { toast } = useToast();
  const [ShowRichTextOptions, setRichTextOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const router = useRouter();
  function handleMenu() {
    setRichTextOptions(!ShowRichTextOptions);
  }
  const handleSave = async () => {
    setIsValidating(true);
    try {
      //@ts-ignore
      const content = quillRef?.current?.root.innerHTML || "";
      const note: Note = {
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: true,
        // Add the isPublic property
      };
      const validatedNote = noteSchema.parse(note);
      // Save the note to the database
      const response = await fetch("/api/save-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedNote),
      });
      const data = await response.json();
      if (data.success) return router.push(`/${data?.data.username}/notes`);
      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save note");
      }
      toast({
        title: "Success",
        description: "Note saved successfully!",
        duration: 3000,
      });
      setShowSaveDialog(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.errors.map((e) => e.message).join(", ");
        toast({
          title: "Validation Error",
          description: errors,
          variant: "destructive",
          duration: 3000,
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to save note",
          variant: "destructive",
          duration: 3000,
        });
      }
    } finally {
      setIsValidating(false);
    }
  };
  useEffect(() => {
    if (!quillRef.current && document.getElementById("editor")) {
      const quill = new Quill("#editor", {
        theme: "bubble",
        modules: {
          toolbar: [],
        },
      });
      quill.editor.delta;
      quillRef.current = quill;
    }
  }, []);
  return (
    <div className="relative h-dvh flex flex-col">
      <div className="flex w-full items-center p-2">
        <Button variant={"ghost"}>Cancel</Button>
        <div className="flex-1 text-center">Notes</div>
        <Button variant={"ghost"} onClick={() => setShowSaveDialog(true)}>
          Save
        </Button>
      </div>
      <Separator />
      <div className="text-sm text-gray-500 flex justify-between p-2">
        <div>{new Date().toLocaleDateString()}</div>
        <div>{new Date().toLocaleTimeString()}</div>
      </div>
      <Card className="mx-2 bg-transparent border-none shadow-none">
        <CardContent className="p-0">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title..."
            className="text-lg font-semibold border-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
          />
        </CardContent>
      </Card>
      <div
        className="flex-grow overflow-auto mx-2 min-h-[200px] bg-white dark:bg-transparent focus:border-none focus:outline-none font-mono tracking-normal"
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
        {ShowRichTextOptions && (
          <RichTextMenu quillRef={quillRef} handleMenu={handleMenu} />
        )}
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
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Note</DialogTitle>
            <DialogDescription>
              Review your note before saving
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {!title && (
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title"
                />
              </div>
            )}
            {/* <div className="grid gap-2">
              <Label>Content Preview</Label>
              <div 
                className="max-h-[200px] overflow-auto p-2 border rounded-md " id  = "editor"
              />
            </div> */}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isValidating}>
              {isValidating ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}
