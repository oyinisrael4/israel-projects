/**
 * FormField — Label + input/select/textarea wrapper family.
 *
 * Components exported:
 *   FormField     — generic wrapper (pass any children)
 *   FormInput     — label + <input> (text/email/tel/password/number etc.)
 *   FormSelect    — label + <select> (accepts options array of strings/objects or children)
 *   FormTextarea  — label + <textarea>
 */

/** Generic wrapper (kept for backward compatibility or custom inputs) */
export default function FormField({ label, htmlFor, required, children, className = "" }) {
    return (
        <div className={`form-field ${className}`.trim()}>
            {label && (
                <label htmlFor={htmlFor}>
                    {label}{required && " *"}
                </label>
            )}
            {children}
        </div>
    );
}

/**
 * FormInput — self-contained label + <input>.
 */
export function FormInput({
    label,
    id,
    required = false,
    type = "text",
    value = "",
    onChange,
    placeholder = "",
    className = "",
    ...rest
}) {
    return (
        <div className={`form-field ${className}`.trim()}>
            {label && (
                <label htmlFor={id}>
                    {label}{required && " *"}
                </label>
            )}
            <input
                type={type}
                id={id}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...rest}
            />
        </div>
    );
}

/**
 * FormSelect — self-contained label + <select>.
 */
export function FormSelect({
    label,
    id,
    required = false,
    value = "",
    onChange,
    options = [],
    placeholder = "",
    children,
    className = "",
    ...rest
}) {
    return (
        <div className={`form-field ${className}`.trim()}>
            {label && (
                <label htmlFor={id}>
                    {label}{required && " *"}
                </label>
            )}
            <select
                id={id}
                required={required}
                value={value}
                onChange={onChange}
                {...rest}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {children ? (
                    children
                ) : (
                    options.map((opt) => {
                        const val = typeof opt === "object" && opt !== null ? opt.value : opt;
                        const lbl = typeof opt === "object" && opt !== null ? opt.label : opt;
                        return (
                            <option key={val} value={val}>
                                {lbl}
                            </option>
                        );
                    })
                )}
            </select>
        </div>
    );
}

/**
 * FormTextarea — self-contained label + <textarea>.
 */
export function FormTextarea({
    label,
    id,
    required = false,
    value = "",
    onChange,
    placeholder = "",
    rows = 4,
    className = "",
    ...rest
}) {
    return (
        <div className={`form-field ${className}`.trim()}>
            {label && (
                <label htmlFor={id}>
                    {label}{required && " *"}
                </label>
            )}
            <textarea
                id={id}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                {...rest}
            />
        </div>
    );
}

