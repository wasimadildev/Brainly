import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Note } from "@/components/NoteCard";

interface EditContentDialogProps {
  open: boolean;
  note: Note | null;
  onOpenChange: (open: boolean) => void;
  onUpdate: (id: number, updatedNote: Partial<Note>) => Promise<void> | void;
}

function EditContentDialog({ open, note, onOpenChange, onUpdate }: EditContentDialogProps) {
  const [type, setType] = useState<Note["type"]>("document");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Pre-fill form when note changes
  useEffect(() => {
    if (note) {
      setType(note.type || "document");
      setTitle(note.title || "");
      setDescription(note.description || "");
      setContent(note.content || "");
      setTags(note.tags?.join(", ") || "");
    }
  }, [note]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note) return;
    setLoading(true);

    try {
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));

      const updatedNote: Partial<Note> = {
        type,
        title,
        description,
        content,
        tags: tagArray,
      };

      await onUpdate(note.id, updatedNote); // 👈 API call
      onOpenChange(false);
    } catch (error) {
      console.error("❌ Failed to update note:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Edit Note
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Update the content and tags of your saved note.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type" className="text-gray-700 dark:text-gray-300">
              Content Type
            </Label>
            <Select value={type} onValueChange={(value: Note["type"]) => setType(value)}>
              <SelectTrigger id="type" className="dark:bg-gray-800 dark:text-gray-200">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tweet">Tweet</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="link">Link</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Edit title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Edit short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">
              Content (Optional)
            </Label>
            <Textarea
              id="content"
              placeholder="Edit text, link, or notes..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              className="dark:bg-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-gray-700 dark:text-gray-300">
              Tags
            </Label>
            <Input
              id="tags"
              placeholder="productivity, learning, ideas"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="dark:bg-gray-800 dark:text-gray-200"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Separate tags with commas. # will be added automatically.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
              className="flex-1 border-gray-300 dark:border-gray-700 dark:text-gray-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-all"
            >
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditContentDialog;
