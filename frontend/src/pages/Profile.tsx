import { useEffect, useState } from "react";
import { Sheet, SheetContent } from "../components/ui/sheet";
import { Sidebar } from "../components/Sidebar";
import { Plus, Share2, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NoteCard, type Note } from "@/components/NoteCard";
import { toast } from "sonner";
import { AddContentDialog } from "@/components/AddContentDialog";
import { ShareBrainDialog } from "@/components/ShareBrainDialog";
import api from "../api/api"; // 👈 Your Axios instance
import { Toaster } from "sonner";


function Profile() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [addContentOpen, setAddContentOpen] = useState(false);
  const [editNote, setEditNote] = useState<Note | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // ✅ Fetch all notes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        setNotes(res.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        toast.error("Failed to load notes");
      }
    };
    fetchNotes();
  }, []);

  // ✅ Add Note
  const handleAddContent = async (newNote: Omit<Note, "id" | "addedDate">) => {
    try {
      const res = await api.post("/notes", newNote);
      setNotes([res.data.note, ...notes]);
      toast.success("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      toast.error("Failed to add note");
    }
  };

  // ✅ Delete Note
  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note.id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note");
    }
  };

  // ✅ Update Note
  const handleUpdate = async (updatedNote: Note) => {
    try {
      const res = await api.put(`/notes/${updatedNote.id}`, updatedNote);
      setNotes((prev) =>
        prev.map((note) =>
          note.id === updatedNote.id ? res.data.note : note
        )
      );
      toast.success("Note updated successfully!");
      setEditNote(null);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to update note");
    }
  };



const handleShare = async (id: string) => {
  try {
    const res = await api.post(`/notes/share`, { noteId: id });
    const { shareLink } = res.data;

    // ✅ Copy to clipboard
    await navigator.clipboard.writeText(shareLink);

    // ✅ Show success toast with "Open" button
    toast.success("Link copied to clipboard!", {
      description: shareLink, // shows the link below message
      action: {
        label: "Open",
        onClick: () => window.open(shareLink, "_blank"),
      },
      duration: 5000, // auto-dismiss after 5s
    });
  } catch (err: any) {
    console.error(err);
    toast.error("Failed to generate share link!");
  }
};


  const filteredNotes = notes.filter((note) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "tags") return note.tags.length > 0;
    return note.type === activeFilter;
  });

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setMobileMenuOpen(false);
  };

  const getPageTitle = () => {
    if (activeFilter === "all") return "All Notes";
    if (activeFilter === "tags") return "Tagged Notes";
    return `${activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}s`;
  };

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar */}
      <aside className="hidden lg:block lg:w-64">
        <Sidebar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      </aside>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <Sidebar activeFilter={activeFilter} onFilterChange={handleFilterChange} />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto max-w-7xl p-4 sm:p-6 md:p-8">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">{getPageTitle()}</h1>
            </div>

            <div className="flex gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => setShareDialogOpen(true)}
              >
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share Brain</span>
              </Button>
              <Button
                className="gradient-primary gap-2"
                onClick={() => setAddContentOpen(true)}
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Add Content</span>
              </Button>
            </div>
          </div>

          {/* Notes */}
          {filteredNotes.length === 0 ? (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center">
              <p className="mb-2 text-lg font-medium text-muted-foreground">
                No notes found
              </p>
              <Button
                className="gradient-primary gap-2"
                onClick={() => setAddContentOpen(true)}
              >
                <Plus className="h-4 w-4" />
                Add Content
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onShare={handleShare}
                  onDelete={() => handleDelete(note.id)}
                  onEdit={() => setEditNote(note)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Dialogs */}
      <ShareBrainDialog
        open={shareDialogOpen}
        onOpenChange={setShareDialogOpen}
        itemCount={notes.length}
      />
      <AddContentDialog
        open={addContentOpen}
        onOpenChange={setAddContentOpen}
        onAdd={handleAddContent}
      />
      {editNote && (
        <AddContentDialog
          open={!!editNote}
          onOpenChange={() => setEditNote(null)}
          onAdd={handleUpdate}
          existingNote={editNote}
          defaultValues={editNote || undefined}
        />
      )}

         <Toaster richColors position="top-right" />
    </div>
  );
}

export default Profile;
