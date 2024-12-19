import { db } from "@/db/db"; // Adjust the import paths as necessary
import { comments } from "@/db/schema";
import { Comment, commentSchema } from "@/models/index"; // \Adjust the import paths as necessary

export const addComment = async (comment: Comment & { userId: number }) => {
  const validatedComment = { ...commentSchema.parse(comment), userId: comment.userId };
  await db.insert(comments).values(validatedComment).execute();
};