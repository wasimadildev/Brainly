export const Logo = () => (
  <div className="flex items-center gap-2 text-xl font-bold">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-indigo-600">
      <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4zm0 2c5.5 0 10 4.5 10 10s-4.5 10-10 10S6 21.5 6 16 10.5 6 16 6z" fill="currentColor"/>
      <circle cx="12" cy="14" r="2" fill="currentColor"/>
      <circle cx="20" cy="14" r="2" fill="currentColor"/>
      <path d="M12 18c0 2.2 1.8 4 4 4s4-1.8 4-4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
    <span className="dark:text-white">Second Brain</span>
  </div>
);