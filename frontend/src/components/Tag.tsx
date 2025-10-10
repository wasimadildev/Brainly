 

interface TagProps{
    tag: string,
} 
export const Tag = ({ tag } : TagProps) => (
  <span className="inline-block px-3 py-1 text-sm text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
    #{tag}
  </span>
);