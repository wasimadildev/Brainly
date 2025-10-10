import { SidebarItem } from "./SidebarItem";
import { FileText, Twitter, Video, Link2, Hash, X, Menu, Sun, Moon } from "lucide-react";
import { Logo } from "./Logo";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface SidebarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar = ({
  activeFilter,
  setActiveFilter,
  sidebarOpen,
  setSidebarOpen,
}: SidebarProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/50 z-20 transition-opacity lg:hidden ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        p-6 flex flex-col z-30 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Logo />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto">
          <SidebarItem
            icon={FileText}
            label="All Notes"
            active={activeFilter === "all"}
            onClick={() => setActiveFilter("all")}
          />
          <SidebarItem
            icon={Twitter}
            label="Tweets"
            active={activeFilter === "tweet"}
            onClick={() => setActiveFilter("tweet")}
          />
          <SidebarItem
            icon={Video}
            label="Videos"
            active={activeFilter === "video"}
            onClick={() => setActiveFilter("video")}
          />
          <SidebarItem
            icon={FileText}
            label="Documents"
            active={activeFilter === "document"}
            onClick={() => setActiveFilter("document")}
          />
          <SidebarItem
            icon={Link2}
            label="Links"
            active={activeFilter === "link"}
            onClick={() => setActiveFilter("link")}
          />
          <SidebarItem
            icon={Hash}
            label="Tags"
            active={activeFilter === "tags"}
            onClick={() => setActiveFilter("tags")}
          />
        </nav>

        {/* Theme Toggle */}
        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 w-full p-2 rounded-lg 
            hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
            <span className="text-gray-700 dark:text-gray-300">
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
