import { useEffect } from "react";

const NiceAlert = ({ message, onClose, type = "info" }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    info: "bg-blue-600",
    success: "bg-green-600",
    warning: "bg-yellow-500",
    error: "bg-red-600",
  };

  return (
    <div
      className={`fixed top-5 right-5 z-200 animate-slide-left shadow-xl rounded-lg text-white px-4 py-3 flex items-center gap-2 ${colors[type]}`}
    >
      <span className="text-sm">{message}</span>

      <button
        onClick={onClose}
        className="text-white font-bold ml-2 hover:text-gray-200 text-lg"
      >
        ×
      </button>
    </div>
  );
};

export default NiceAlert;
