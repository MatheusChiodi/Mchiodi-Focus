export function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-white/10 border border-white/20 backdrop-blur-md px-4 py-2 rounded-md text-white text-sm shadow-lg animate-fade-in-out">
      {message}
    </div>
  );
}
