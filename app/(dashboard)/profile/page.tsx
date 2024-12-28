"use server";
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
  const { data } = await getAllNotes();
  console.log(data);

  console.log(data, "Dfdf");
  if (data?.length)
    return (
      <div>
        {/* @ts-ignore */}
        <ProfilePage notes={[...data]} user={user} />
      </div>
    );

  return  redirect("/login");
}