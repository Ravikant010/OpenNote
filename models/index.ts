import { z } from "zod";

export const noteSchema = z.object({
  id: z.number().optional(),
  title: z.string(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isPublic: z.boolean().optional(),
});

export type Note = z.infer<typeof noteSchema>;

export const commentSchema = z.object({
  id: z.number().optional(),
  noteId: z.number(),
  content: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Comment = z.infer<typeof commentSchema>;

export const likeSchema = z.object({
  id: z.number().optional(),
  noteId: z.number(),
  userId: z.number(),
  createdAt: z.date(),
});
export const usernameSchema = z.object({
    email: z
      .string().email()
      .min(3, { message: 'Username must be at least 3 characters' })
      .max(50, { message: 'Username must be less than 50 characters' })
  })
  
  export const passwordSchema = z.object({
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' })
      .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
      .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  })
  
  export type UsernameFormData = z.infer<typeof usernameSchema>
  export type PasswordFormData = z.infer<typeof passwordSchema>
  
  
export type Like = z.infer<typeof likeSchema>;