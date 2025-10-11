const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    name,
    id,
    className,
    style,
    disabled = false,
    required = false,
    readOnly = false,
    autoFocus = false,
    maxLength,
    minLength,
    min,
    max,
    step,
    pattern,
    autoComplete = "off",
}) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label
                    htmlFor={id || name}
                    className="text-sm font-medium text-gray-700 mb-1"
                >
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}

            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                name={name}
                id={id || name}
                className={className || `border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                style={style}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                autoFocus={autoFocus}
                maxLength={maxLength}
                minLength={minLength}
                min={min}
                max={max}
                step={step}
                pattern={pattern}
                autoComplete={autoComplete}
            />
        </div>
    );
};

export default Input;