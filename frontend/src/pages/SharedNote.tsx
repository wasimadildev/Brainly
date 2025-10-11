import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FileText,
  Video,
  Twitter,
  Link as LinkIcon,
  HelpCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import api from "../api/api"; // adjust your import path

interface SharedNote {
  title: string;
  content: string | string[];
  description?: string;
  tags: string[];
  addedDate: string;
  expiresAt?: string;
  type?: "document" | "video" | "tweet" | "link";
}

const typeIcons = {
  document: FileText,
  video: Video,
  tweet: Twitter,
  link: LinkIcon,
  default: HelpCircle,
};

export default function SharedNote() {
  const { shareId } = useParams();
  const [note, setNote] = useState<SharedNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/shared/${shareId}`);
        setNote(res.data);
      } catch (err) {
        console.error("❌ Error fetching shared note:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [shareId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg">
          Loading shared note...
        </p>
      </div>
    );
  }

  if (notFound || !note) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-center bg-gradient-to-br from-red-50 to-white dark:from-gray-900 dark:to-gray-950">
        <HelpCircle className="w-10 h-10 text-red-500 mb-2" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Note not found
        </h2>
        <p className="text-gray-500 mt-1">
          This link may have expired or been deleted.
        </p>
      </div>
    );
  }

  const Icon = typeIcons[note.type ?? "default"];

  // Parse content if it's JSON
  let parsedContent: any[] | string = note.content ?? "";
  try {
    if (typeof note.content === "string" && note.content.startsWith("[")) {
      parsedContent = JSON.parse(note.content);
    }
  } catch (err) {
    console.error("Error parsing content:", err);
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 p-4">
      <Card className="max-w-2xl w-full bg-white/70 dark:bg-gray-900/50 backdrop-blur rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all">
        <CardContent>
          {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {note.title}
            </h1>
          </div>

          {/* Description */}
          {note.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {note.description}
            </p>
          )}

          {/* Content */}
          {Array.isArray(parsedContent) ? (
            <div className="space-y-3">
              {parsedContent.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-800/40 hover:shadow-sm transition"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
              {parsedContent}
            </p>
          )}

          {/* Tags */}
          {note.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-5">
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

          {/* Footer */}
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">
            Added on {new Date(note.addedDate).toLocaleDateString()}
            {note.expiresAt && (
              <> • Expires at {new Date(note.expiresAt).toLocaleDateString()}</>
            )}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
