"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import RichTextMenu from "./_components/rich-text";
// import {QuillEditor} from "@/components/QuillEditor";
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
import QuillEditor from "./_components/QuillEditor";

export default function CreateNotePage() {
  const quillRef = useRef<any>(null);
  const { toast } = useToast();
  const [ShowRichTextOptions, setRichTextOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const router = useRouter();

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
        <div>{currentDate}</div>
        <div>{currentTime}</div>
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
      <QuillEditor quillRef={quillRef} />
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