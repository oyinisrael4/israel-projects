/**
 * FormField — Label + input or select wrapper.
 * Matches the existing `.form-field` CSS pattern.
 *
 * Props:
 *   label      {string}     Label text
 *   htmlFor    {string}     id of the associated input/select
 *   required   {boolean}    Whether this field is required
 *   children   {ReactNode}  The input or select element(s)
 */
export default function FormField({ label, htmlFor, required, children }) {
    return (
        <div className="form-field">
            <label htmlFor={htmlFor}>
                {label}{required && " *"}
            </label>
            {children}
        </div>
    );
}
