import { useEffect } from "react";

export default function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-amber-900 text-white px-6 py-3 rounded-xl shadow-lg z-[100] font-semibold text-sm animate-bounce">
      {message}
    </div>
  );
}