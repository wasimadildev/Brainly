
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-sm bg-white/70 backdrop-blur-md">
        <h2 className="text-2xl font-bold text-blue-700">Brainly</h2>
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between flex-grow px-8 md:px-16 lg:px-32 py-10">
        {/* Text Section */}
        <div className="text-center md:text-left md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
            Welcome to <span className="text-blue-600">Brainly</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-md">
            Organize your ideas, take smart notes, and let AI help you think and learn faster.
          </p>

          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              Create Account
            </Link>
          </div>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
       
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Brainly — All rights reserved.
      </footer>
    </div>
  );
}

export default Home;
