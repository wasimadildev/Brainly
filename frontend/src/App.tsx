import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import SharedNotePage from "./pages/SharedNote";

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
           <Route path="/shared/:shareId" element={<SharedNotePage />} />


      </Routes>

    </div>
  );
}
