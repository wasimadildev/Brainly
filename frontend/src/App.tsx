import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SharedNotePage from "./pages/SharedNotePage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (

    <div>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/share/:shareId" element={<SharedNotePage />} /> {/* 👈 public link */}

      </Routes>

    </div>
  );
}
