import { getSession } from "@/lib/session";
import { db } from "@/db/db";
import { notes, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import NoteCard, { Note } from "@/components/note-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { getAllNotes, getNotes } from "@/services/actions/notes";
import ProfilePage from "./_note";
import { get_user } from "@/services/actions/user-action";
import Link from "next/link";


export default async function Profile() {
    const user  = await get_user();
  if(!user)
    redirect('/login');
  const {data} = await getAllNotes();
  console.log(data)


  console.log(data, "Dfdf")
if(data?.length)
  return (
    <div>
        {/* @ts-ignore */}
        <ProfilePage notes={[...data]} user={user} />
    </div>
  );

return (
    <div>
        <Card className="dark:bg-transparent border-none">
            <CardHeader>
                <CardTitle>No Notes Available</CardTitle>
            </CardHeader>
            <CardContent>
                <p>You have no notes at the moment. Create a new note to get started!</p>
                <Link href="/note/create" className="text-blue-500 hover:underline">
                    Create Note
                </Link>
            </CardContent>
        </Card>
    </div>
);
}