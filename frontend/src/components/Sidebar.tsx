import { Brain, Twitter, Video, FileText, Link, Hash, LayoutGrid } from "lucide-react";
import { cn } from "../lib/utils";

const navigation = [
  { name: "All Notes", icon: LayoutGrid, filter: "all" },
  { name: "Tweets", icon: Twitter, filter: "tweet" },
  { name: "Videos", icon: Video, filter: "video" },
  { name: "Documents", icon: FileText, filter: "document" },
  { name: "Links", icon: Link, filter: "link" },
  { name: "Tags", icon: Hash, filter: "tags" },
];

interface SidebarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  className?: string;
}

export function Sidebar({ activeFilter, onFilterChange, className }: SidebarProps) {
  return (
    <div className={cn("flex h-full flex-col border-r border-sidebar-border bg-sidebar px-4 py-6", className)}>
      <div className="mb-8 flex items-center gap-3 px-2">
        <Brain className="h-8 w-8 text-sidebar-primary" />
        <span className="text-xl font-semibold text-sidebar-foreground">Second Brain</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navigation.map((item) => (
          <button
            key={item.filter}
            onClick={() => onFilterChange(item.filter)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              activeFilter === item.filter
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
