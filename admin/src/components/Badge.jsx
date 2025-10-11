// Reusable Badge Component
const Badge = ({ children, variant = 'default' }) => {
    const variants = {
        default: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
        inProgress: 'bg-blue-100 text-blue-800',
        urgent: 'bg-red-100 text-red-800'
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
            {children}
        </span>
    );
};

export default Badge;