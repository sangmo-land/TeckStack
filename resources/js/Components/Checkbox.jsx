export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'h-4 w-4 rounded border-hairline-strong bg-void-200 text-flux focus:ring-2 focus:ring-flux/40 focus:ring-offset-0 ' +
                className
            }
        />
    );
}
