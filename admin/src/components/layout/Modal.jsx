import { X } from "lucide-react";

// Modal Component
const Modal = ({ isOpen, onClose, title, children, size = "md" }) => {
    if (!isOpen) return null;

    const sizes = {
        sm: "max-w-md",
        md: "max-w-2xl",
        lg: "max-w-4xl",
        xl: "max-w-6xl",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 bg-fade-in"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-xl shadow-xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden animate-slide-down`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
