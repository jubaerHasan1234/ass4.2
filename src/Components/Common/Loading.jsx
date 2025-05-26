export default function Loading({ children }) {
  return (
    <div className="rounded-xl overflow-hidden bg-zinc-800/50 animate-pulse">
      <div className="w-full h-48 bg-zinc-700/50 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
