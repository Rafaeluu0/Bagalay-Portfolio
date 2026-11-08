/**
 * Label + input + error message in one reusable piece.
 * `as` lets it render <input> (default), <textarea> or <select>.
 */
export default function FormField({ id, label, error, hint, as: Tag = 'input', children, ...props }) {
    return (
        <div>
            <label htmlFor={id} className="text-sm text-mute">{label}</label>
            <Tag
                id={id}
                name={id}
                aria-invalid={Boolean(error)}
                aria-describedby={`${id}-error`}
                className="field mt-1"
                {...props}
            >
                {children}
            </Tag>
            {hint && !error && <p className="mt-1 text-xs text-mute">{hint}</p>}
            <p id={`${id}-error`} role={error ? 'alert' : undefined} className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>
        </div>
    );
}
