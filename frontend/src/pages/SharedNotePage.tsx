import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import { Loader2, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import api from "../api/api"; // 👈 your axios instance

interface Note {
  title: string;
  content?: string;
  description?: string;
  tags: string[];
  addedDate: string;
  expiresAt?: string;
}

export default function SharedNotePage() {
  const { shareId } = useParams(); 
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/shared/${shareId}`);
        setNote(res.data);
      } catch (err: any) {
        console.error(err);
        setError(err.response?.data?.message || "Unable to load shared note.");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [shareId]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Loading note...</span>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
        <AlertTriangle className="h-10 w-10 text-destructive mb-3" />
        <h2 className="text-xl font-semibold mb-1">Oops!</h2>
        <p className="text-muted-foreground">{error || "Note not found or expired."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex justify-center items-center p-6">
      <div className="max-w-2xl w-full rounded-2xl shadow-lg p-8 bg-card border border-border">
        <h1 className="text-3xl font-bold mb-3">{note.title}</h1>

        {note.description && (
          <p className="text-muted-foreground mb-4">{note.description}</p>
        )}

        {note.content && (
          <div className="space-y-2 mb-4">
            {note.content.split("\n").map((line, idx) => (
              <p key={idx} className="leading-relaxed text-card-foreground">
                {line}
              </p>
            ))}
          </div>
        )}

        {note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-6">
          Added on: {new Date(note.addedDate).toLocaleDateString()}
        </p>

        {note.expiresAt && (
          <p className="text-xs text-muted-foreground">
            Expires at: {new Date(note.expiresAt).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
