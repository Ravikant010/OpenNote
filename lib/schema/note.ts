import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Content is required"),
  isPublic: z.boolean().default(true),
  tags: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Note = z.infer<typeof noteSchema>;