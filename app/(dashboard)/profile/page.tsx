"use server"
import { getSession } from "@/lib/session";
import { db } from "@/db/db";
import { notes, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import NoteCard, { Note } from "@/components/note-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getAllNotes, getNotes } from "@/services/actions/notes";
import ProfilePage from "./_note/_note";
import { get_user } from "@/services/actions/user-action";
import Link from "next/link";
import { PlusCircle, BookOpen } from "lucide-react";

export default async function Profile() {
  const user = await get_user();
  const { data } = await getAllNotes()

if(data?.length){
    return (
      <div>
        {/* @ts-ignore */}
        <ProfilePage notes={[...data]} user={user} />
      </div>
    );
  }
  return <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
  {/* Icon or Illustration */}
  <div className="mb-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-20 w-20 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  </div>

  {/* Heading */}
  <h2 className="text-2xl font-bold text-gray-800 mb-2">
    No Notes Created Yet
  </h2>

  {/* Description */}
  <p className="text-gray-600 mb-6">
    Start organizing your thoughts and ideas by creating your first note!
  </p>

  {/* Call-to-Action Button */}
  <button
    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
    onClick={() => {
      // Add logic to create a new note
    }}
  >
    Create Your First Note
  </button>
</div>
  // return  redirect("/login");
}