export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p {...props} className={'text-[13px] text-alert ' + className}>
            {message}
        </p>
    ) : null;
}
