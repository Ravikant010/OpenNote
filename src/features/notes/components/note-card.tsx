import { Note } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface NoteCardProps {
  note: Note;
  onDelete: (id: number) => void;
}

export function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all">
      <Link href={`/${note.username}/note/${note.id}`}>
        <CardHeader>
          <CardTitle className="line-clamp-2">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="line-clamp-3 text-muted-foreground text-sm"
            dangerouslySetInnerHTML={{ __html: note.content }}
          />
          <div className="mt-4 text-xs text-muted-foreground">
            {formatDate(note.createdAt)}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
