const Button = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    className,
    style,
    arialabel,
}) => {

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={className}
            style={style}
            aria-label={arialabel}
        >
            {children}
        </button>
    );
};

export default Button;
