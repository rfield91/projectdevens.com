export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-neutral-800 rounded-lg px-6 py-8 ring shadow-xl ring-neutral-900/5 text-neutral-500 dark:text-neutral-400">
      {children}
    </div>
  );
};
