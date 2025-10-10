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
  id: string | number;
  type: "document" | "video" | "tweet" | "link";
  title: string;
  description?: string;
  content?: string | any[]; // can be stringified array or plain string
  tags: string[];
  addedDate: string;
  thumbnail?: string;
}

interface NoteCardProps {
  note: Note;
  onShare?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  onEdit?: (note: Note) => void;
}

const typeIcons = {
  document: FileText,
  video: Video,
  tweet: Twitter,
  link: LinkIcon,
  default: HelpCircle,
};

export function NoteCard({ note, onShare, onDelete, onEdit }: NoteCardProps) {
  const Icon = typeIcons[note.type] || typeIcons.default;

  // ✅ Parse content if it’s a JSON string
  let parsedContent: any[] | string = note.content ?? "";
  try {
    if (typeof note.content === "string" && note.content.startsWith("[")) {
      parsedContent = JSON.parse(note.content);
    }
  } catch (err) {
    console.error("Error parsing content:", err);
  }

  // ✅ Render smartly based on parsed content
  const renderContent = () => {
    if (Array.isArray(parsedContent)) {
      return (
        <div className="grid grid-cols-1 gap-3 mt-2">
          {parsedContent.map((item, i) => (
            <div
              key={i}
              className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/40 hover:shadow-md transition-all"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300">{item}</p>
            </div>
          ))}
        </div>
      );
    }

    if (typeof parsedContent === "string") {
      return (
        <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 whitespace-pre-line">
          {parsedContent}
        </p>
      );
    }

    return null;
  };

  return (
    <div className="group relative rounded-xl bg-white/70 dark:bg-gray-900/50 backdrop-blur p-5 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {note.title}
          </h3>
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

      {/* Description */}
      {note.description && (
        <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {note.description}
        </p>
      )}

      {/* ✅ Smart Content Renderer */}
      {renderContent()}

      {/* Tags */}
      {note.tags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Date */}
      <p className="text-xs text-muted-foreground">
        Added on {new Date(note.addedDate).toLocaleDateString()}
      </p>
    </div>
  );
}
