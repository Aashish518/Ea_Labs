// Reusable Icon component
const Icon = ({ path, className = "w-6 h-6", stroke = "currentColor", strokeWidth = 2, fill = "none" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={className}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
    >
        <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default Icon;
