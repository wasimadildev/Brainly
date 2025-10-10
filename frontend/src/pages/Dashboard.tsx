import React, { useState, useEffect, createContext, useContext } from 'react';
import { Share2, Plus, Trash2, Edit2, X, Moon, Sun, FileText, Twitter, Video, Link2, Hash, Menu } from 'lucide-react';
import  type{noteAPI} from "../api/api"
import type { Note } from '../api/api'; 












const Dashboard = () => {
  const [theme, setTheme] = useState('light');
  const [notes, setNotes] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [shareUrl, setShareUrl] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    try {
      const data = await noteAPI.getAllNotes();
      setNotes(data.notes || mockNotes);
    } catch (error) {
      setNotes(mockNotes);
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleCreateNote = async (noteData) => {
    try {
      await api.createNote(noteData);
      await loadNotes();
      setIsFormOpen(false);
    } catch (error) {
      const newNote = {
        ...noteData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      setNotes([newNote, ...notes]);
      setIsFormOpen(false);
    }
  };

  const handleUpdateNote = async (noteData) => {
    if (!editingNote) return;
    try {
      await api.updateNote(editingNote.id, noteData);
      await loadNotes();
      setIsFormOpen(false);
      setEditingNote(null);
    } catch (error) {
      setNotes(notes.map(n => n.id === editingNote.id ? { ...n, ...noteData } : n));
      setIsFormOpen(false);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      await api.deleteNote(id);
      await loadNotes();
    } catch (error) {
      setNotes(notes.filter(n => n.id !== id));
    }
  };

  const handleShareNote = async (noteId) => {
    try {
      const response = await api.generateShareLink(noteId);
      setShareUrl(response.shareUrl || `${window.location.origin}/shared/${response.shareId}`);
      setIsShareOpen(true);
    } catch (error) {
      setShareUrl(`${window.location.origin}/shared/demo-${noteId}`);
      setIsShareOpen(true);
    }
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsFormOpen(true);
  };

  const filteredNotes = notes.filter(note => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'tags') return note.tags.length > 0;
    return note.type === activeFilter;
  });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className="flex-1 overflow-y-auto">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                  <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activeFilter === 'all' ? 'All Notes' : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
                </h1>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <button
                  onClick={() => handleShareNote('all')}
                  className="flex items-center gap-2 px-4 py-2 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share Brain</span>
                </button>
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setIsFormOpen(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden sm:inline">Add Content</span>
                </button>
              </div>
            </div>
          </header>

          <div className="p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 dark:text-gray-400">Loading notes...</div>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">No notes yet</p>
                <p className="text-gray-500 dark:text-gray-500 mt-2">Create your first note to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={handleEdit}
                    onDelete={handleDeleteNote}
                    onShare={handleShareNote}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <Modal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingNote(null);
          }}
          title={editingNote ? 'Edit Note' : 'Add New Content'}
        >
          <NoteForm
            note={editingNote}
            onSave={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={() => {
              setIsFormOpen(false);
              setEditingNote(null);
            }}
          />
        </Modal>

        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          shareUrl={shareUrl}
        />
      </div>
    </ThemeContext.Provider>
  );
};

const mockNotes = [
  {
    id: '1',
    title: 'Project Ideas',
    content: 'Build a personal knowledge base\nCreate a habit tracker\nDesign a minimalist todo app',
    type: 'document',
    tags: ['productivity', 'ideas'],
    createdAt: '2024-10-03T00:00:00Z'
  },
  {
    id: '2',
    title: 'How to Build a Second Brain',
    content: 'Learn how to build your own second brain system for better productivity and learning.',
    type: 'video',
    tags: ['productivity', 'learning'],
    createdAt: '2024-09-03T00:00:00Z'
  },
  {
    id: '3',
    title: 'Productivity Tip',
    content: 'The best way to learn is to build in public. Share your progress, get feedback, and help others along the way.',
    type: 'tweet',
    tags: ['productivity', 'learning'],
    createdAt: '2024-08-03T00:00:00Z'
  }
];

export default Dashboard;