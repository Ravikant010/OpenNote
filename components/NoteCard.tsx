import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Clock, Trash } from 'lucide-react';

interface NoteListProps {
  notes: Note[];
  onDelete: (id: number) => void;
  username: string;
}

export interface Note {
  id: number;
  title: string;
  content: string;
  tags: string[] | null;
  isPublic: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

export default function NoteList({ notes, onDelete, username }: NoteListProps) {
  const [expandedNotes, setExpandedNotes] = useState<Set<number>>(new Set());
  const router = useRouter();

  const toggleExpand = (id: number) => {
    setExpandedNotes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCardClick = (userId: number, noteId: number) => {
    router.push(`/${username}/note/${noteId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {notes.map(note => (
        <Card key={note.id} className="flex flex-col cursor-pointer" onClick={() => handleCardClick(note.userId, note.id)}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="truncate">{note.title}</span>
              <div className="flex items-center space-x-2">
                {note.isPublic ? (
                  <Eye className="h-5 w-5 text-green-500" />
                ) : (
                  <EyeOff className="h-5 w-5 text-red-500" />
                )}
                <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>
                  <Trash className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div 
              className={`prose max-w-none ${expandedNotes.has(note.id) ? '' : 'line-clamp-3'}`}
              dangerouslySetInnerHTML={{ __html: note.content }}
            />
            {note.content.length > 100 && (
              <Button 
                variant="link" 
                onClick={(e) => { e.stopPropagation(); toggleExpand(note.id); }}
                className="mt-2 p-0"
              >
                {expandedNotes.has(note.id) ? 'Show less' : 'Show more'}
              </Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-start space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>{formatDate(note.createdAt)}</span>
            </div>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
