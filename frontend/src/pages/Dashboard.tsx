import { useState, useEffect } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ThemeContext } from "@/context/ThemeContext";
import AddContentDialog from "@/components/AddContentDialog";
import { Button } from "@/components/ui/button";
import { Menu, Plus, Share2, Sun, Moon, Trash2, Pencil } from "lucide-react";
import { NoteCard } from "@/components/NoteCard";
import ShareBrainDialog from "@/components/ShareBrainDialog";
import axios from "axios";
import EditContentDialog from "@/components/EditContentDialog";

// ✅ API Base
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

interface Note {
  id: number;
  title: string;
  type: string;
  description?: string;
  content?: string | null;
  thumbnail?: string | null;
  tags?: string[];
  addedDate?: string;
  userId?: number;
}

const Dashboard = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const notesPerPage = 6;

  // ✅ Fetch all notes
  const fetchNotes = async () => {
    try {
      const res = await api.get("/notes");
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // ✅ Update note
  const handleUpdateNote = async (id: number, updatedData: Partial<Note>) => {
    try {
      const res = await api.put(`/notes/${id}`, updatedData);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...res.data.note } : n))
      );
      console.log("✅ Note updated successfully");

    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  // ✅ Delete note
  const handleDeleteNote = async (id: number) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      console.log("🗑️ Note deleted successfully");
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const handleAddNote = async (newNoteData: {
    title: string;
    content: string;
    type: string;
    tags?: string[];
  }) => {
    try {
      const res = await api.post("/notes", newNoteData);


      const createdNote = res.data.note;

      setNotes((prev) => [createdNote, ...prev]);
      console.log("✅ Note added successfully:", createdNote);
    } catch (err: any) {
      console.error("❌ Error adding note:", err.response?.data || err.message);
    }
  };


  // ✅ Pagination logic
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const startIndex = (currentPage - 1) * notesPerPage;
  const filteredNotes =
    activeFilter === "all"
      ? notes
      : notes.filter((note) => note.type === activeFilter);

  const currentNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

  // ✅ Theme toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        {/* Sidebar */}
        <Sidebar
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* ====== Main Section ====== */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
            <div className="flex items-center gap-3">
              {/* Hamburger Menu */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 focus:outline-none"
              >
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                Second Brain
              </h1>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:scale-105 transition"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>

              {/* Share Button */}
              <Button
                variant="outline"
                onClick={() => setShareDialogOpen(true)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-700"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share Brain</span>
              </Button>

              {/* Add Content Button */}
              <Button
                onClick={() => setAddDialogOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Content</span>
              </Button>
            </div>
          </header>

          {/* ====== Main Content ====== */}
          <main className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              All Notes
            </h2>

            {/* Loading / Empty states */}
            {loading ? (
              <p className="text-gray-500 text-center">Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-500 text-center">No notes found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentNotes.map((note) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={() => {
                      setEditingNote(note);
                      setEditDialogOpen(true);
                    }}
                    onDelete={() => handleDeleteNote(note.id)}
                    onShare={() => console.log("Share:", note.id)}
                  />

                ))}



              </div>
            )}
          </main>

          {/* ===== Pagination ===== */}
         {notes.length > notesPerPage && (
  <div className="mt-8 flex justify-center items-center gap-4 pb-6">
    <Button
      variant="outline"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage((prev) => prev - 1)}
    >
      Previous
    </Button>

    <span className="text-sm text-muted-foreground">
      Page {currentPage} of {totalPages}
    </span>

    <Button
      variant="outline"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage((prev) => prev + 1)}
    >
      Next
    </Button>
  </div>
)}
        </div>

        {/* ===== Dialogs ===== */}
        <ShareBrainDialog
          open={shareDialogOpen}
          onOpenChange={setShareDialogOpen}
          itemCount={notes.length}
        />

        <AddContentDialog
          open={addDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAdd={handleAddNote}
        />
        <EditContentDialog
          open={editDialogOpen}
          note={editingNote}
          onOpenChange={setEditDialogOpen}
          onUpdate={handleUpdateNote}
        />
      </div>
    </ThemeContext.Provider>
  );
};

export default Dashboard;
