const Input = ({
    placeholder,
    icon: Icon,
    className = '',
    type = 'text',
    value,
    onChange,
    name,
    id,
    disabled = false,
    readOnly = false,
    autoComplete = 'off',
    required=true,
}) => (
    <div className="relative w-full">
        {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            name={name}
            id={id}
            disabled={disabled}
            readOnly={readOnly}
            autoComplete={autoComplete}
            required={required}
            className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
        />
    </div>
);

export default Input;