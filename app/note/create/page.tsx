"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronUp, ChevronLeft, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import RichTextMenu from "./_components/rich-text";
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
import { ModeToggle } from "@/components/theme-toggle";

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
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-b border-border/50 z-50">
        <div className="flex items-center justify-between px-4 h-16">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleCancel}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-sm font-medium">Back</div>
          </div>
          <div className="flex items-center gap-2">
            {/* <ModeToggle /> */}
            <Button
              onClick={() => setShowSaveDialog(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Note
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 px-4 max-w-4xl mx-auto">
        <div className="space-y-4">
          {/* Date and Time */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>{currentDate}</div>
            <div>{currentTime}</div>
          </div>

          {/* Title Input */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title..."
                className="text-2xl font-semibold border-none focus-visible:ring-0 bg-transparent placeholder:text-muted-foreground"
              />
            </CardContent>
          </Card>

          {/* Editor */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
              <QuillEditor quillRef={quillRef} />
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Rich Text Menu */}
      <div
        className={`
          fixed 
          bottom-0 
          left-0 
          right-0 
          transition-transform 
          duration-300 
          bg-background/80
          backdrop-blur-lg
          border-t
          border-border/50
          ${ShowRichTextOptions ? "translate-y-0" : "translate-y-full"}
        `}
      >
        {ShowRichTextOptions && (
          <RichTextMenu quillRef={quillRef} handleMenu={handleMenu} />
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="outline"
        size="icon"
        className={`
          fixed 
          bottom-6 
          right-6
          h-12
          w-12
          rounded-full
          shadow-lg
          transition-all 
          duration-300 
          ${ShowRichTextOptions ? "opacity-0" : "opacity-100"}
        `}
        onClick={handleMenu}
      >
        <CircleChevronUp className="h-6 w-6" />
      </Button>

      {/* Dialogs */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent className="sm:max-w-[425px]">
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
                  className="bg-background/50"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={isValidating}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white"
            >
              {isValidating ? "Saving..." : "Save Note"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Cancel</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel? Any unsaved changes will be lost.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              No, Keep Editing
            </Button>
            <Button 
              onClick={handleConfirmCancel}
              variant="destructive"
            >
              Yes, Discard Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Toaster />
    </div>
  );
}
