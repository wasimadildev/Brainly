import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/api/api"; // ✅ Your axios instance (same baseURL you use in Dashboard)

interface NoteFormProps {
  note?: any; // if null → create mode
  onSuccess: (note: any) => void; // callback after save
  onCancel: () => void;
}

const NoteForm = ({ note, onSuccess, onCancel }: NoteFormProps) => {
  const [formData, setFormData] = useState({
    title: note?.title || "",
    content: note?.content || "",
    type: note?.type || "document",
    tags: note?.tags?.join(", ") || "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      let res;
      if (note) {
        // ✅ Update existing note
        res = await api.put(`/notes/${note.id}`, payload);
        console.log("📝 Note updated:", res.data);
      } else {
        // ✅ Create new note
        res = await api.post("/notes", payload);
        console.log("✅ Note created:", res.data);
      }

      onSuccess(res.data.note || res.data); // pass updated or created note
      onCancel(); // close modal
    } catch (err) {
      console.error("Error saving note:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({ ...formData, title: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Type
        </label>
        <select
          value={formData.type}
          onChange={(e) =>
            setFormData({ ...formData, type: e.target.value })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        >
          <option value="document">Document</option>
          <option value="tweet">Tweet</option>
          <option value="video">Video</option>
          <option value="link">Link</option>
        </select>
      </div>

      {/* Content */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          rows={6}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
          required
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value })
          }
          placeholder="productivity, ideas, learning"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                     focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          {loading
            ? "Saving..."
            : note
            ? "Update Note"
            : "Create Note"}
        </Button>

        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default NoteForm;
