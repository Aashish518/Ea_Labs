const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className,
}) => {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}

        >
            {children}
        </button>
    );
};

export default Button;
