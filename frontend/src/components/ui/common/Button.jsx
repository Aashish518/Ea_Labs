const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    color = "main",
    className,
}) => {
    const baseStyles =
        "px-4 py-2 rounded-lg font-medium transition duration-200";

    const colorStyles = {
        main: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
        red: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
        green: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-300",
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className || `${baseStyles} ${colorStyles[color]} ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}

        >
            {children}
        </button>
    );
};

export default Button;
