"use client";
import hljs from "highlight.js"; // Import highlight.js library
// // Import a syntax highlighting style (can choose another one)
import React, { useEffect, useRef, useState } from "react";
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
import { useRouter } from "next/navigation";

export default function CreateNotePage() {
  const quillRef = useRef<Quill | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  const [ShowRichTextOptions, setRichTextOptions] = useState(false);
  const [title, setTitle] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
    if (!quillRef.current && editorRef.current) {
      const quill = new Quill(editorRef.current, {
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
          </div>
  );
}
