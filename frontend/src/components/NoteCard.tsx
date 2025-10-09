import {
  FileText,
  Video,
  Twitter,
  Link as LinkIcon,
  Share2,
  Trash2,
  HelpCircle,
  Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface Note {
  id: string;
  type: "document" | "video" | "tweet" | "link";
  title: string;
  description?: string;
  content?: string; // ✅ content is string now
  tags: string[];
  addedDate: string;
  thumbnail?: string;
}

interface NoteCardProps {
  note: Note;
  onShare?: (id: string) => void;
  onDelete?: (id: string) => void;
  onEdit?: (note: Note) => void; // ✅ to open edit dialog
}

const typeIcons = {
  document: FileText,
  video: Video,
  tweet: Twitter,
  link: LinkIcon,
  text: FileText,
  article: FileText,
  default: HelpCircle,
};

export function NoteCard({ note, onShare, onDelete, onEdit }: NoteCardProps) {
  const Icon = typeIcons[note.type] || typeIcons.default;

  return (
    <div className="group relative glass-card rounded-xl p-5 shadow-sm hover-lift transition-all">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5 text-muted-foreground" />}
          <h3 className="font-semibold text-card-foreground">{note.title}</h3>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <Button variant="ghost" size="icon" onClick={() => onEdit?.(note)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onShare?.(note.id)}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={() => onDelete?.(note.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Video Thumbnail */}
      {note.type === "video" && note.thumbnail && (
        <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-muted">
          <div className="flex h-full w-full items-center justify-center">
            <Video className="h-12 w-12 text-muted-foreground" />
          </div>
        </div>
      )}

      {/* Description */}
      {note.description && (
        <p className="mb-3 text-sm text-muted-foreground">{note.description}</p>
      )}

      {/* Content (split into bullet points) */}
      {note.content &&
        note.content.split("\n").map((line, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span>{line}</span>
          </li>
        ))}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full bg-[hsl(var(--tag-bg))] text-[hsl(var(--tag-text))] hover:bg-[hsl(var(--tag-bg))]"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-muted-foreground">Added on {note.addedDate}</p>
    </div>
  );
}
