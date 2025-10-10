import { SidebarItem } from "./SidebarItem";
import { FileText, Twitter, Video, Link2, Hash, X } from "lucide-react";
import { Logo } from "./Logo";

interface SidebarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}


export const Sidebar = ({ activeFilter, setActiveFilter, sidebarOpen, setSidebarOpen } : SidebarProps) => (
  <>
    <div
      className={`fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity ${
        sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={() => setSidebarOpen(false)}
    />
    <aside
      className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col z-30 transition-transform lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <Logo />
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      <nav className="flex-1 space-y-2">
        <SidebarItem icon={FileText} label="All Notes" active={activeFilter === 'all'} onClick={() => setActiveFilter('all')} />
        <SidebarItem icon={Twitter} label="Tweets" active={activeFilter === 'tweet'} onClick={() => setActiveFilter('tweet')} />
        <SidebarItem icon={Video} label="Videos" active={activeFilter === 'video'} onClick={() => setActiveFilter('video')} />
        <SidebarItem icon={FileText} label="Documents" active={activeFilter === 'document'} onClick={() => setActiveFilter('document')} />
        <SidebarItem icon={Link2} label="Links" active={activeFilter === 'link'} onClick={() => setActiveFilter('link')} />
        <SidebarItem icon={Hash} label="Tags" active={activeFilter === 'tags'} onClick={() => setActiveFilter('tags')} />
      </nav>
    </aside>
  </>
);
