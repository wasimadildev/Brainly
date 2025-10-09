import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import SharedNotePage from "./pages/SharedNotePage";

export default function App() {
  return (
     
    
        <Routes>
           <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
z         <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
          <Route path="/share/:shareId" element={<SharedNotePage />} /> {/* 👈 public link */}

        </Routes>

  );
}
