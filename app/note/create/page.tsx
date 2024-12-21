"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import RichTextMenu from "./_components/rich-text";
import "quill/dist/quill.snow.css";
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
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Quill from "quill";

// Dynamic import for Quill
// const Quill = dynamic(
//   async () => {
//     const { default: QuillModule } = await import('quill');
//     return QuillModule;
//   },
//   { 
//     ssr: false,
//     loading: () => <div>Loading editor...</div>
//   }
// );

export default function CreateNotePage() {
  const quillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [ShowRichTextOptions, setRichTextOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  function handleMenu() {
    setRichTextOptions(!ShowRichTextOptions);
  }

  const handleSave = async () => {
    setIsValidating(true);
    try {
      const content = quillRef?.current?.root.innerHTML || "";
      const note = {
        title,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        isPublic: true,
      };
      const validatedNote = z.object({
        title: z.string().min(1),
        content: z.string().min(1),
        createdAt: z.date(),
        updatedAt: z.date(),
        isPublic: z.boolean(),
      }).parse(note);
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

  const handleCancel = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmCancel = () => {
    setShowConfirmDialog(false);
    router.push('/');
  };

  useEffect(() => {
    const initQuill = async () => {
      if (mounted && editorRef.current && !quillRef.current) {
        try {
          const quill =  new Quill(editorRef.current, {
            placeholder: "Write something...",
          });
          // const QuillConstructor = await import('quill');
          // const quill = new QuillConstructor(editorRef.current, {
           
          //   placeholder: 'Write something...',
          // });
          quillRef.current = quill;
        } catch (error) {
          console.error('Failed to initialize Quill:', error);
        }
      }
    };

    if (mounted) {
      initQuill();
    }
  }, [mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="relative h-dvh flex flex-col">
      <div className="flex w-full items-center p-2">
        <Button variant={"ghost"} onClick={handleCancel}>Cancel</Button>
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
        ref={editorRef}
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isValidating}>
              {isValidating ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Cancel</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel? Any unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              No
            </Button>
            <Button onClick={handleConfirmCancel}>
              Yes, Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster />
    </div>
  );
}