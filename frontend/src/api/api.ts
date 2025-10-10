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


export default api;
