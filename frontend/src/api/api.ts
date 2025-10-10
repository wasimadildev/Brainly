import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // Ensures cookies (like JWT token) are automatically included
});


// 🧩 ---------- INTERFACES ----------

// Basic User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
}

// Note Interface
export interface Note {
  id: string;
  title: string;
  content: string;
  description?: string;
  tags?: string[];
  addedDate?: string;
  expiresAt?: string | null;
  userId?: string;
}

// Auth Response Interface
export interface AuthResponse {
  success: boolean;
  user: User;
  token?: string;
  message?: string;
}

// Generic API Response
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}


// 🧠 ---------- AUTH ENDPOINTS ----------

export const authAPI = {
  async signup(data: { name: string; email: string; password: string }) {
    const res = await api.post<AuthResponse>("/auth/signup", data);
    return res.data;
  },

  async signin(data: { email: string; password: string }) {
    const res = await api.post<AuthResponse>("/auth/signin", data);
    return res.data;
  },

  async profile() {
    const res = await api.get<ApiResponse<User>>("/auth/profile");
    return res.data.data;
  },

  async logout() {
    const res = await api.post<ApiResponse<null>>("/auth/logout");
    return res.data;
  },
};


// 🗒️ ---------- NOTES ENDPOINTS ----------

export const noteAPI = {
  async getAllNotes() {
    const res = await api.get<ApiResponse<Note[]>>("/notes");
    return res.data.data;
  },

  async getNoteById(id: string) {
    const res = await api.get<ApiResponse<Note>>(`/notes/${id}`);
    return res.data.data;
  },

  async createNote(data: Partial<Note>) {
    const res = await api.post<ApiResponse<Note>>("/notes", data);
    return res.data.data;
  },

  async updateNote(id: string, data: Partial<Note>) {
    const res = await api.put<ApiResponse<Note>>(`/notes/${id}`, data);
    return res.data.data;
  },

  async deleteNote(id: string) {
    const res = await api.delete<ApiResponse<{ deleted: boolean }>>(`/notes/${id}`);
    return res.data.data;
  },

  async generateShareLink(noteId: string) {
    const res = await api.post<ApiResponse<{ shareLink: string }>>(`/notes/${noteId}/share`);
    return res.data.data;
  },

  async viewSharedNote(shareId: string) {
    const res = await api.get<ApiResponse<Note>>(`/shared/${shareId}`);
    return res.data.data;
  },
};

export default api;
