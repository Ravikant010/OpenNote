"use server"
import { get_user } from "@/services/actions/user-action";
import { getAllNotes } from "@/services/actions/notes";
import ProfilePage from "./_note/_note";
import Link from "next/link";
import { PlusCircle, BookOpen, FileText } from "lucide-react";
import { Note, User } from "@/db/schema";

export default async function Profile() {
  const user = await get_user() as User;
  const { data, success } = await getAllNotes();

  if(success && data?.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ProfilePage 
          notes={data.map(note => ({ 
            ...note, 
            // Parse tags if they're stored as a string, otherwise keep as is
            tags: typeof note.tags === 'string' ? JSON.parse(note.tags) : note.tags,
            createdAt: note.createdAt.toISOString(),
            updatedAt: note.updatedAt.toISOString()
          }))} 
          user={user} 
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col items-center justify-center min-h-[80vh] max-w-md mx-auto">
        {/* Empty State Icon */}
        <div className="mb-8">
          <FileText className="h-24 w-24 text-gray-300" />
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Your Notes Journey Begins
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Create your first note and start organizing your thoughts in one place.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link 
              href="/note/create"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              <PlusCircle className="mr-2 h-5 w-5" />
              Create Note
            </Link>
            
            <Link 
              href="/help"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
            >
              <BookOpen className="mr-2 h-5 w-5" />
              View Guide
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}