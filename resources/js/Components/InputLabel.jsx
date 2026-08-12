export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={`block text-[13px] font-medium text-ink-dim ` + className}
        >
            {value ? value : children}
        </label>
    );
}
