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

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/20 via-fuchsia-500/10 to-pink-500/20 blur-[100px] animate-pulse" />
          </div>

          <CardHeader className="text-center relative z-10 space-y-4">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              Start Your Writing Journey
            </CardTitle>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Create your first note and begin organizing your thoughts, ideas, and memories in one beautiful place.
            </p>
          </CardHeader>

          <CardContent className="relative z-10 p-6 flex flex-col items-center space-y-6">
            <div className="w-full max-w-sm mx-auto space-y-2">
              <Link href="/note/create">
                <Button 
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-lg transition-all duration-300 group"
                >
                  <PlusCircle className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Create Your First Note
                </Button>
              </Link>
              <p className="text-center text-sm text-muted-foreground">
                Your notes will appear here once you create them
              </p>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mt-8">
              <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                <h3 className="font-semibold mb-1">Rich Text Editor</h3>
                <p className="text-sm text-muted-foreground">
                  Format your notes with a powerful editor
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                <h3 className="font-semibold mb-1">Cloud Sync</h3>
                <p className="text-sm text-muted-foreground">
                  Access your notes from anywhere
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                <h3 className="font-semibold mb-1">Share & Collaborate</h3>
                <p className="text-sm text-muted-foreground">
                  Work together with others
                </p>
              </div>
              <div className="p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50">
                <h3 className="font-semibold mb-1">Dark Mode</h3>
                <p className="text-sm text-muted-foreground">
                  Easy on your eyes, day or night
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}